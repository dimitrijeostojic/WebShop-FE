"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../UI/ProductCard";
import Categories from "../Layout/Categories";
import NewsletterSection from "../Layout/NewsletterSection";
import HeroSection from "../Layout/HeroSection";

interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
      const response = await axios.get("https://localhost:7273/api/Product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.slice(0, 8));
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
      <HeroSection/>

      {/* Categories */}
      <section className="mb-16 px-6">
        <Categories />
      </section>

      {/* Featured Products */}
      <section className="mb-16 px-6">
        <h2 className="text-2xl font-semibold mb-4">Istaknuti proizvodi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((prod) => (
            <ProductCard
              key={prod.productId}
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
      <NewsletterSection />
    </main>
  );
};

export default HomePage;
