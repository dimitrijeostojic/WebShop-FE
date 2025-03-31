import React from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import Footer from "./Footer";

const Home = () => {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Dobrodošli u PetShop 🐾</h1>
        <p className="text-lg mb-6 text-gray-700">
          Sve za vaše ljubimce na jednom mestu
        </p>
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
      <section className="mb-16 px-6">
        <h2 className="text-2xl font-semibold mb-4">Kategorije</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Hrana", icon: "🍖" },
            { name: "Oprema", icon: "🎒" },
            { name: "Igračke", icon: "🧸" },
            { name: "Nega", icon: "🛁" },
          ].map((category) => (
            <Link
              key={category.name}
              href={`/shop?category=${category.name.toLowerCase()}`}
              className="border rounded-xl p-6 text-center hover:shadow-md bg-white"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <div className="text-lg font-medium">{category.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16 px-6">
        <h2 className="text-2xl font-semibold mb-4">Istaknuti proizvodi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard />
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
