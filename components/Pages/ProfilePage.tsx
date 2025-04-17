"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import ProfileTabs from "@/components/UI/ProfileTabs";
import AdminOrders from "@/components/UI/AdminOrders";
import AdminUsers from "@/components/UI/AdminUsers";
import ManagerProducts from "@/components/UI/ManagerProducts";
import UserOrders from "@/components/UI/UserOrders";

interface OrderItem {
  orderItemId: string;
  product: {
    name: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  orderId: string;
  orderDate: string;
  orderItems: OrderItem[];
  userId: string;
}

interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdBy: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userMap, setUserMap] = useState<{ [key: string]: string }>({});
  const [tab, setTab] = useState<"orders" | "users">("orders");
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      const decodedRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      setName(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
      setRole(decodedRole);
      setEmail(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);

      if (decodedRole === "Admin") {
        fetchAllOrders();
        fetchAllUsers();
      } else if (decodedRole === "Manager") {
        fetchManagerProducts();
      } else {
        fetchMyOrders();
      }
    }
  }, []);

  const fetchAllOrders = async () => {
    const token = getToken();
    const res = await axios.get("https://localhost:7273/api/Order", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(res.data);
  };

  const fetchAllUsers = async () => {
    const token = getToken();
    const res = await axios.get("https://localhost:7273/api/User", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const fetchedUsers = res.data;
    setUsers(fetchedUsers);
    const map: { [key: string]: string } = {};
    fetchedUsers.forEach((user: User) => {
      map[user.id] = `${user.firstName} ${user.lastName}`;
    });
    setUserMap(map);
  };

  const fetchMyOrders = async () => {
    const token = getToken();
    const res = await axios.get("https://localhost:7273/api/Order/GetMyOrders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(res.data);
  };

  const fetchManagerProducts = async () => {
    const token = getToken();
    const res = await axios.get("https://localhost:7273/api/Product/myproducts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data);
  };

  const getToken = () => document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  const handlePromoteToManager = async (userId: string) => {
    try {
      const confirm = window.confirm("Da li ste sigurni da želite da obrišete ovog korisnika?");
      if (!confirm) return;

      await axios.put(`https://localhost:7273/api/User/${userId}`,
        null,
        {
          headers: { Authorization: `Bearer ${getToken()}`},
        }
      );
      alert("Korisnik je uspešno promovisan u Managera.");
      await fetchAllUsers();
    } catch (error) {
      console.error("Greška prilikom promene uloge korisnika", error);
      alert("Greška prilikom promene uloge korisnika.");
    }
  };
  

  const handleDeleteUser = async (userId: string) => {
    try {
      const confirm = window.confirm("Da li ste sigurni da želite da obrišete ovog korisnika?");
      if (!confirm) return;

      await axios.delete(`https://localhost:7273/api/User/${userId}`, {
        headers: { Authorization: `Bearer ${getToken()}`},
      });
  
      alert("Korisnik uspešno obrisan.");
      await fetchAllUsers();
    } catch (error) {
      console.error("Greška prilikom brisanja korisnika", error);
      alert("Greška prilikom brisanja korisnika.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto pt-24 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <div className="flex items-center space-x-5 border-b pb-6">
          <FaUserCircle size={60} className="text-violet-500" />
          <div>
            <h2 className="text-2xl font-bold text-violet-700">{name}</h2>
            <p className="text-sm text-gray-600">{email}</p>
            <p className="text-sm mt-1 text-gray-500">
              Uloga: <span className="font-semibold capitalize">{role}</span>
            </p>
          </div>
        </div>

        {role === "Admin" && (
          <>
            <ProfileTabs tab={tab} onTabChange={setTab} />
            {tab === "orders" ? (
              <AdminOrders orders={orders} userMap={userMap} />
            ) : (
              <AdminUsers
                users={users}
                onDelete={(id) => {handleDeleteUser(id)}}
                onPromote={(id) => {handlePromoteToManager(id)}}
              />
            )}
          </>
        )}

        {role === "RegularUser" && <UserOrders orders={orders} />}
        {role === "Manager" && <ManagerProducts products={products} />}

        <div className="pt-6 border-t text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
          >
            Odjavi se
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;