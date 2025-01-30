"use client"; // OVO DODAJ NA VRH
import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      const extractedName =
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      console.log(extractedName);
      setUsername(extractedName);
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-violet-500 text-white py-4 px-6 shadow-md z-50">
      <div className="flex justify-between items-center">
        <div className="username w-1/5">
        <p className="text-xl font-bold text-center">
          {username ? `Welcome ${username}` : "Home"}
        </p>
        </div>
        <div className="w-3/5 flex justify-evenly items-center">
        <Link href="/home" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
        </div>
        <div className="link-logout w-1/5 text-center">
          <Link href="/login" className="hover:underline">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
