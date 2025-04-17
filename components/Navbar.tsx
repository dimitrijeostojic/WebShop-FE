"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [firstName, setFirstName] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [role, setRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const updateCartCount = () => {
    const cartData = localStorage.getItem("cart");
    let count = 0;

    try {
      const cart = JSON.parse(cartData || "[]");
      if (Array.isArray(cart)) {
        count = cart.reduce(
          (total: number, item: any) => total + item.quantity,
          0
        );
      }
    } catch (e) {
      console.error("Neispravan format korpe u localStorage", e);
    }

    setCartCount(count);
  };

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    if (token) {
      const decoded: any = jwtDecode(token);
      const extractedName =
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      setFirstName(extractedName);
      setRole(role);
    }

    updateCartCount();
    window.addEventListener("cart-updated", updateCartCount);
    return () => window.removeEventListener("cart-updated", updateCartCount);
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-violet-700 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/home" className="text-2xl font-bold tracking-tight">
          {firstName ? `👋 Zdravo, ${firstName}` : "🐾 PetShop"}
        </Link>

        {/* Hamburger dugme za mobilni */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Linkovi – desktop verzija */}
        <div className="hidden md:flex space-x-6 text-md font-medium items-center">
          <Link href="/home" className="hover:text-violet-300 transition">Home</Link>
          <Link href="/about" className="hover:text-violet-300 transition">About</Link>
          <Link href="/shop" className="hover:text-violet-300 transition">Shop</Link>
          <Link href="/profile" className="hover:text-violet-300 transition">Profile</Link>

          {role === "RegularUser" && (
            <Link href="/cart" className="relative group">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            </Link>
          )}

          <Link
            href="/login"
            onClick={handleLogout}
            className="ml-4 bg-white text-violet-700 px-4 py-1.5 rounded-md font-semibold hover:bg-violet-100 transition"
          >
            Logout
          </Link>
        </div>
      </div>

      {/* Mobile meni */}
      {menuOpen && (
        <div className="md:hidden bg-violet-600 px-6 pb-4 space-y-3 text-md font-medium flex flex-col">
          <Link href="/home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
          {role === "RegularUser" && (
            <Link href="/cart" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart ({cartCount})</span>
            </Link>
          )}
          <Link
            href="/login"
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="bg-white text-violet-700 px-4 py-1.5 rounded-md font-semibold hover:bg-violet-100 transition w-fit"
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
