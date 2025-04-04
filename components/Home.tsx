"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import axios from "axios";
import Categories from "./Categories";
// import api from "../utils/axiosSetup";

interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Home = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
 

  const fetchProducts = async () => {
    try {
      const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("token="))
  ?.split("=")[1];
      const response = await axios.get("https://localhost:7273/api/Product", {
        headers: {
          Authorization: `Bearer ${token}`, // Dodaj token u zaglavlje
        },
      });
      const selected = response.data.slice(0, 8);
      setProducts(selected);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="hero-section-header">
          <h1 className="text-4xl font-bold mb-4">Dobrodošli u PetShop 🐾</h1>
        </div>
        <div className="hero-section-paragraph">
          <p className="text-lg mb-6 text-gray-700">
            Sve za vaše ljubimce na jednom mestu
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Link
            href="/shop"
            className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-500"
          >
            Shop Now
          </Link>
          <Link
            href="mailto:support@webshop.com"
            className="border border-violet-600 text-violet-600 px-6 py-2 rounded hover:bg-violet-100"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16 px-6 ">
        <Categories/>
      </section>

      {/* Featured Products */}
      <section className="mb-16 px-6">
        <h2 className="text-2xl font-semibold mb-4">Istaknuti proizvodi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      </section>

      {/* Newsletter Section */}
      <section className="bg-violet-100 py-10 px-6 rounded-xl text-center mb-16">
        <h2 className="text-2xl font-semibold mb-2">
          Prijavite se na naš newsletter
        </h2>
        <p className="mb-4 text-gray-700">
          Budite prvi koji će saznati o popustima, novim proizvodima i posebnim
          ponudama!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="email"
            placeholder="Unesite vaš email"
            className="px-4 py-2 rounded border border-gray-300 w-full sm:w-1/3"
          />
          <button className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-500">
            Prijavi se
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
