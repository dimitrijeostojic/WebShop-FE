"use client";
import React, { use, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import ProductCard from "./ProductCard";



interface Order {
  orderDate: Date;
  orderId: string;
  orderItems: OrderItem[];
  userId: string;
}

interface OrderItem {
  orderId: string;
  orderItemId: string;
  price: number;
  product: Product;
  quantity: number;
}

interface Product {
  categoryId: string;
  categoryName: string;
  createdBy: string;
  description: string;
  imageUrl: string;
  name: string;
  price: number;
  productId: string;
  stock: number;
}

const Profile = () => {
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();


  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
    if (token) {
      const decoded: any = jwtDecode(token);
      const name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
      const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      setName(name);
      setRole(role);
      setEmail(email);
      setId(id);
      if (role === "RegularUser") fetchMyOrders();
      if (role === "Admin") fetchAllOrders();
      if (role === "Manager") fetchManagerProducts();
      console.log(name)
      console.log(role)
      console.log(email)
    }
  }, []);

  const fetchMyOrders = async () => {
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
      const res = await axios.get("https://localhost:7273/api/Order/GetMyOrders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Greška prilikom preuzimanja mojih porudžbina", err);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
      const res = await axios.get("https://localhost:7273/api/Order", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Greška prilikom preuzimanja svih porudžbina", err);
    }
  };

  const fetchManagerProducts = async () => {
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
      const res = await axios.get("https://localhost:7273/api/Product/myproducts", {
        headers: { Authorization: `Bearer ${token}` },
      });


      setProducts(res.data);

    } catch (err) {
      console.error("Greška prilikom preuzimanja proizvoda menadžera", err);
    }
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };


  if (!name || !role || !email) {
    return <div className="text-center mt-10">Učitavanje profila...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto pt-24 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
        {/* Profil Info */}
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

        {/* ADMIN & USER: Prikaz porudžbina */}
        {(role === "Admin" || role === "RegularUser") && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {role === "Admin" ? "Sve porudžbine" : "Moje porudžbine"}
            </h3>
            {orders.length === 0 ? (
              <p className="text-gray-500 text-sm">Nema porudžbina za prikaz.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.orderId} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Datum: {new Date(order.orderDate).toLocaleDateString()}</span>
                      <p>User: {}</p>
                    </div>
                    {order.orderItems.map((item) => (
                      <div key={item.orderItemId} className="flex justify-between py-1 border-t text-sm">
                        <div>
                          <p className="font-medium text-violet-700">{item.product.name}</p>
                          <p className="text-gray-500">{item.quantity} x {item.product.price.toFixed(2)} RSD</p>
                        </div>
                        <p className="font-semibold text-green-600">
                          {(item.quantity * item.product.price).toFixed(2)} RSD
                        </p>
                      </div>
                    ))}
                    <p className="text-right text-sm font-semibold text-gray-700 mt-2">
                      Ukupno: {order.orderItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0).toFixed(2)} RSD
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MANAGER: Prikaz proizvoda */}
        {role === "Manager" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Moji proizvodi</h3>
            {products.length === 0 ? (
              <p className="text-gray-500 text-sm">Još uvek niste dodali nijedan proizvod.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((prod, index) => (
                  <ProductCard
                    key={index}
                    productId={prod.productId}
                    description={prod.description}
                    name={prod.name}
                    imageUrl={prod.imageUrl}
                    price={prod.price}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Logout dugme */}
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

export default Profile;
