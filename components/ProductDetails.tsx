"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import EditProductModal from "./EditProductModal";

interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdBy: string;
  stock: number;
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  const fetchProduct = async () => {
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
      const response = await axios.get(
        `https://localhost:7273/api/Product/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProduct(response.data);
    } catch (err) {
      console.error("Failed to fetch product", err);
    }
  };

  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
    if (token) {
      const decoded: any = jwtDecode(token);
      setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
      setRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
      await axios.post(
        "https://localhost:7273/api/Cart/addItemToCart",
        {
          productId: product.productId,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = cartItems.find((item: any) => item.productId === product.productId);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cartItems.push({ ...product, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
      alert("✅ Proizvod dodat u korpu!");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      alert("❌ Nije moguće dodati u korpu.");
    }
  };

  const deleteProduct = async () => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
    axios.delete(`https://localhost:7273/api/Product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log("proizvod obrisan");
    router.push("/shop");
  }

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  }

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  }

  const showAdminButtons = role === "Admin";
  const showManagerButtons = role === "Manager" && product?.createdBy === userId;

  if (!product) return <div className="p-8">Učitavanje...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 bg-white rounded-xl shadow-lg p-6 md:p-12">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="rounded-lg shadow-md object-contain max-h-[450px] mx-auto"
        />

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-violet-700">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>
            <p className="text-gray-600 text-lg mb-6">Stock: {product.stock}</p>
            <div className="text-2xl font-semibold text-green-600 mb-4">
              {product.price.toFixed(2)} RSD
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-1">Količina:</label>
              <input
                type="number"
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded px-4 py-2 w-24"
              />
            </div>

            {role === "RegularUser" && (
              <button
                onClick={handleAddToCart}
                className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 transition"
              >
                <ShoppingCart size={20} /> Dodaj u korpu
              </button>
            )}

            {(showAdminButtons || showManagerButtons) && (
              <div className="flex gap-4 mt-6">
                <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={handleEditModalOpen}>
                  Izmeni
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => {
                  const confirmed = window.confirm("Da li ste sigurni da želite da obrišete ovaj proizvod?");
                  if (confirmed) {
                    deleteProduct();
                  }
                }}>
                  Obriši
                </button>
              </div>
            )}
          </div>

          <div className="mt-10 text-sm text-gray-500">
            <h3 className="font-semibold mb-1">Zašto kupiti kod nas?</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>✔️ Besplatna dostava za porudžbine preko 2.000 RSD</li>
              <li>📦 Povrat u roku od 14 dana</li>
              <li>💬 Podrška dostupna 24/7</li>
              <li>🐾 Proizvodi testirani i preporučeni od strane veterinara</li>
            </ul>
          </div>
        </div>
      </div>
      {isEditModalOpen && <EditProductModal isOpen = {isEditModalOpen} onClose={handleEditModalClose} product = {product}/>}
    </div>
  );
}
