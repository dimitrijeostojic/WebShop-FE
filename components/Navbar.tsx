"use client"; // OVO DODAJ NA VRH
import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    if (token) {
      const decoded: any = jwtDecode(token);
      const extractedName =
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      setFirstName(extractedName);
    }
  }, []);

  const handleLogout = () => {
    // Brišemo kolačić tako što postavljamo datum isteka u prošlost
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-violet-600 text-white shadow-md z-50">
      <div className="flex justify-around items-center py-5">
        <div className="firstName">
          <div className="text-lg font-semibold transition-all duration-300 hover:text-violet-200">
            {firstName ? `👋 Welcome, ${firstName}` : "🐾 PetShop"}
          </div>
        </div>
        <div className="w-2/5 flex justify-evenly items-center">
          <Link href="/home" className="hover:text-violet-200 transition-all">
            Home
          </Link>
          <Link href="/about" className="hover:text-violet-200 transition-all">
            About
          </Link>
          <Link href="/shop" className="hover:text-violet-200 transition-all">
            Shop
          </Link>
          <Link
            href="/profile"
            className="hover:text-violet-200 transition-all"
          >
            Profile
          </Link>
        </div>
        <div className="link-logout">
          <Link
            href="/login"
            onClick={handleLogout}
            className="bg-white text-violet-600 px-6 py-2 rounded-md font-medium hover:bg-violet-200 transition"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
