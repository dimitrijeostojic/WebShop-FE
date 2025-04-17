"use client";
import Link from "next/link";
import React, { useState } from "react";
import "../styles/Login.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Spinner from "./Spinner";

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7273/api/Auth/Login",
        formData
      );
      document.cookie = `token=${response.data.jwtToken}; path=/`;
      router.push("/home");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        setError("Error:\n" + Object.values(errors).flat().join("\n"));
      } else {
        setError("This user does not exist.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2 className="text-center mb-4 font-bold text-xl">Login</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="username-container">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="password-container">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="login-button">
          {loading ? (
            <Spinner/>
          ) : (
            <button
              className="bg-blue-500 w-full hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              type="submit"
            >
              Login
            </button>
          )}
        </div>

        <div className="go-to-registration">
          <p className="text-sm text-gray-600 text-center mt-4">
            You don't have an account? <br /> Please{" "}
            <Link
              href="/register"
              className="text-blue-500 font-medium hover:underline text-sm"
            >
              create new account.
            </Link>
          </p>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
