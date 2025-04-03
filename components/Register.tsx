"use client";
import React, { useState } from "react";
import "../styles/Register.css";
// import api from "../utils/axiosSetup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); // Resetovanje greške pre novog pokušaja
    try {
      const response = await axios.post(
        "https://localhost:7273/api/Auth/Register",
        formData
      );
      document.cookie = `token=${response.data.jwtToken}; path=/`;
      // document.cookie = `refreshToken=${response.data.refreshToken}; path=/`;
      router.push("/home");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        // Flatten i prikazivanje svih grešaka
        setError("Error:\n" + Object.values(errors).flat().join("\n"));
      } else {
        setError(error.response?.data || "An unexpected error occurred.");
      }
    }
  };

  // Ažuriranje formData stanja na promenu u inputima
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h2 className="text-center mb-4 font-bold text-xl">Register</h2>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="fistname-container">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="lastname-container">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="email-container">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
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
        <div className="register-button-container">
          <button
            className="bg-blue-500 w-full hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            type="submit"
          >
            Register
          </button>
        </div>
        <div className="go-to-login">
          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account? Please{" "}
            <Link
              href="/login"
              className="text-blue-500 font-medium hover:underline text-sm"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Register;
