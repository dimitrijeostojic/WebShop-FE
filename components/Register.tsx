'use client'
import React, { useEffect, useState } from "react";
import "../styles/Register.css";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
    username: string;
    email: string;
    password: string;
    roles: string[]; // roles je niz stringova
  }

const Register = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    roles: [],
  });

  const router = useRouter();

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      roles: ["RegularUser"], // Default role
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://localhost:7273/api/Auth/Register', formData);
      setError('');
      router.push('/home') // Preusmeri na stranicu dobrodošlice
      localStorage.setItem('token', response.data.jwtToken);

    } catch (error: any) {
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          console.error("Validation errors:", errors);
  
          // Example: Flatten and display all validation errors
          alert(
            "Error:\n" +
              Object.values(errors)
                .flat()
                .join("\n")
          );
          setError("Registration failed. Please check the form and try again.");
        } else {
          console.error("Error register:", error);
          setError("Registration failed. Please try again later.");
        }
      }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="username-container">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="email-container">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="password-container">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className="submit" type="submit">
          Register
        </button>
        <div className="go-to-login">
          <p>
            You don't have an account? Please{" "}
            <Link href="/login" className="login-link">
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
