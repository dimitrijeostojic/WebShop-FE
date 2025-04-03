"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

interface DecodedToken {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

const Profile = () => {
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
  const decodedToken = jwtDecode(token as string) as DecodedToken;
  const router = useRouter();

  useEffect(() => {
    
    if (token) {
      const name = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
      setName(name);
      setRole(role);
      setEmail(email);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  if (!name || !role || !email)
    return <div className="text-center mt-10">Učitavanje profila...</div>;

  return (
    <div className="max-w-3xl mx-auto pt-24 px-6">
      <h1 className="text-3xl font-bold text-violet-600 mb-6 text-center">
        Moj Profil
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <FaUserCircle size={60} className="text-violet-500" />
          <div>
            <h2 className="text-xl font-semibold">
              {name}
            </h2>
            <p className="text-sm text-gray-600">
              {email}
            </p>
          </div>
        </div>

        <div className="border-t pt-4">
          <p>
            <span className="font-semibold">Uloga:</span>{" "}
            {role}
          </p>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
          {(() => {
      switch (role) {
        case "Manager":
          return "Moji proizvodi";
        case "Admin":
          return "Svi proizvodi";
        case "RegularUser":
          return "Moje porudžbine";
        default:
          return;
      }
    })()}
          </h3>
          <p className="text-sm text-gray-500">
          {(() => {
            if (role === "Manager") {
              return "Trenutno nema vaših proizvoda. Ova sekcija može prikazivati sve vaše proizvode.";
            }
            if (role === "regularUser") {
              return "Trenutno nemate prikazane porudžbine. Ova sekcija može prikazivati sve vaše narudžbine.";
            }
            return "Trenutno nema ni jednog proizvoda. Ova sekcija može prikazivati sve proizvode.";
          })()}
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
          >
            Odjavi se
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
