"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  
  useEffect(() => {
    document.cookie=`token=`;
  }, []);
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7273/api/Auth/Login",
        { username, password }
      );
      setError("");
      router.push("/home"); // Preusmeri na stranicu dobrodošlice
      document.cookie=`token=${response.data.jwtToken}`;
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        console.error("Validation errors:", errors);

        // Example: Flatten and display all validation errors
        setError("Error:\n" + Object.values(errors).flat().join("\n"));
      } else {
        console.error("Error register:", error);
        setError("This user does not exist.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-center mb-4 font-bold text-xl">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="username-container">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="password-container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          type="submit"
        >
          Login
        </button>
        <div className="go-to-registration">
          <p className="text-sm text-gray-600 text-center mt-4">
            You don't have an account? Please{" "}
            <Link
              href="/register"
              className="text-blue-500 font-medium hover:underline"
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
