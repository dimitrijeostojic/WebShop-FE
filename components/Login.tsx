'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import '../styles/Login.css';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle login logic here
      console.log("Username:", username);
      console.log("Password:", password);
    };
  
    return (
      <div className="login-container">
        <h2>Login</h2>
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
         
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
          Login
</button>
          <div className="go-to-registration">
            <p className="text-sm text-gray-600 text-center mt-4">
              You don't have an account? Please{" "}
              <Link href="/register" className="text-blue-500 font-medium hover:underline">
                create new account.
              </Link>
            </p>
            
          </div>
        </form>
      </div>
    );
  };
  
  export default Login;