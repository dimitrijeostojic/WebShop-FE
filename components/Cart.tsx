"use client";

import { useEffect, useState } from "react";
import { Trash2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const Cart = () => {
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customer, setCustomer] = useState({ name: "", address: "", payment: "" });


  const fetchCart1 = async () => {
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
      const response = await axios.get("https://localhost:7273/api/Cart/myCart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setCartItem(response.data.CartItems);
    } catch (error) {
      console.error("Failed to fetch cart from backend", error);
    }
  };

const fetchCart = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
            setCartItem(parsedCart);
        }
      } catch (err) {
        console.error("Greška prilikom parsiranja localStorage cart:", err);
      }
    }
  };

  useEffect(() => {
    fetchCart();
    fetchCart1();
  }, []);

  const updateQuantity = async (productId: string, newQuantity: number) => {
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
      await axios.put(
        `https://localhost:7273/api/Cart/carrtItemQuantity/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    //   const updatedCart = cart.map((item) =>
    //     item.productId === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
    //   );
    //   setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update cart item quantity", error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
      await axios.delete(`https://localhost:7273/api/Cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedCart = cartItem.filter((item) => item.productId !== productId);
      setCartItem(updatedCart);
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Porudžbina uspešno poslata! 🎉");
    setCartItem([]);
    setShowCheckout(false);
    setCustomer({ name: "", address: "", payment: "" });
  };

//   const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-violet-700 mb-10 text-center">🛒 Tvoja korpa</h1>

      {cartItem.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Korpa je prazna. <Link href="/shop" className="text-violet-600 underline">Idi u prodavnicu</Link>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
          {cartItem.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col md:flex-row items-center justify-between border-b pb-6 gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-contain rounded shadow"
                />
                <div>
                  <h2 className="text-xl font-semibold text-violet-700">{item.name}</h2>
                  <p className="text-gray-500 text-sm">{item.price.toFixed(2)} RSD x {item.quantity} kom</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-1 w-20 text-center"
                />
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-6">
            <span className="text-xl font-semibold text-gray-700">Ukupno:</span>
            {/* <span className="text-2xl font-bold text-green-600">{totalPrice.toFixed(2)} RSD</span> */}
          </div>

          {!showCheckout ? (
            <button
              onClick={() => setShowCheckout(true)}
              className="mt-6 w-full bg-green-600 hover:bg-green-500 text-white text-lg py-3 rounded-md font-semibold transition flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} /> Potvrdi porudžbinu
            </button>
          ) : (
            <form onSubmit={handleCheckoutSubmit} className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Podaci za dostavu</h2>

              <input
                type="text"
                placeholder="Ime i prezime"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                required
                className="w-full border rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Adresa"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                required
                className="w-full border rounded px-4 py-2"
              />
              <select
                value={customer.payment}
                onChange={(e) => setCustomer({ ...customer, payment: e.target.value })}
                required
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Izaberite način plaćanja</option>
                <option value="pouzećem">Pouzećem</option>
                <option value="kartica">Platna kartica</option>
              </select>

              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-md font-semibold transition"
              >
                Završi porudžbinu
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
