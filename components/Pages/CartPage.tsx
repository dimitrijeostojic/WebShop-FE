"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios";
import CartItemCard from "../UI/CartItemCard";
import CheckoutForm from "../Forms/CheckoutForm";

interface Cart {
  cartId: string;
  userId: string;
  total: number;
  cartItems: CartItem[];
}

interface CartItem {
  cartId: string;
  cartItemId: string;
  product: Product;
  productId: string;
  quantity: number;
}

interface Product {
  description: string;
  imageUrl: string;
  name: string;
  price: number;
  stock: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<Cart>();
  const [showCheckout, setShowCheckout] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customer, setCustomer] = useState({ name: "", address: "", payment: "" });

  const fetchCart = async () => {
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
      const response = await axios.get("https://localhost:7273/api/Cart/myCart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Failed to fetch cart from backend", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (cart && cart.cartItems.length > 0) {
      const total = cart.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }

    if (cart && Array.isArray(cart.cartItems)) {
      localStorage.setItem("cart", JSON.stringify(cart.cartItems));
    } else {
      localStorage.removeItem("cart");
    }
    window.dispatchEvent(new Event("cart-updated"));
  }, [cart]);

  const updateQuantity = async (productId: string, newQuantity: number) => {
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
      await axios.put(
        `https://localhost:7273/api/Cart/cartItemQuantity/${productId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedCartItems = cart?.cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      );
      if (cart && updatedCartItems) setCart({ ...cart, cartItems: updatedCartItems });
      toast.success("Količina ažurirana!");
    } catch (error) {
      console.error("Failed to update cart item quantity", error);
      toast.error("Nešto nije u redu prilikom ažuriranja količine.");
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
      const response = await axios.delete(`https://localhost:7273/api/Cart/items/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedCartItems = cart?.cartItems.filter((item) => item.productId !== productId);
      if (cart && updatedCartItems) setCart({ ...cart, cartItems: updatedCartItems });
      toast.success(`${response.data.message}`);
    } catch (error) {
      console.error("Failed to remove item from cart", error);
      toast.error("Nešto nije u redu prilikom uklanjanja proizvoda.");
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
    await axios.post("https://localhost:7273/api/Order/PlaceOrder", {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Porudžbina uspešno poslata! 🎉");
    setCart(undefined);
    setShowCheckout(false);
    setCustomer({ name: "", address: "", payment: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-violet-700 mb-10 text-center">🛒 Tvoja korpa</h1>

      {!cart || cart?.cartItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Korpa je prazna. <Link href="/shop" className="text-violet-600 underline">Idi u prodavnicu</Link>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
          {cart?.cartItems.map((item) => (
            <CartItemCard
              key={item.productId}
              item={item}
              onQuantityChange={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}

          <div className="flex justify-between items-center pt-6">
            <span className="text-xl font-semibold text-gray-700">Ukupno:</span>
            <span className="text-2xl font-bold text-green-600">{totalPrice.toFixed(2)} RSD</span>
          </div>

          {!showCheckout ? (
            <button
              onClick={() => setShowCheckout(true)}
              className="mt-6 w-full bg-green-600 hover:bg-green-500 text-white text-lg py-3 rounded-md font-semibold transition flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} /> Potvrdi porudžbinu
            </button>
          ) : (
            <CheckoutForm
              customer={customer}
              onChange={setCustomer}
              onSubmit={handleCheckoutSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;