"use client";
import React, { useEffect, useState } from "react";
// import api from "../utils/axiosSetup";
import ProductCard from "@/components/ProductCard";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface DecodedToken {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterOn, setFilterOn] = useState("Name");
  const [filterQuery, setFilterQuery] = useState("");
  const [sortBy, setSortBy] = useState("Name");
  const [isAscending, setIsAscending] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [userRole, setUserRole] = useState("");
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
      const response = await axios.get("https://localhost:7273/api/Product", {
        params: {
          filterOn,
          filterQuery: filterQuery !== "all" ? filterQuery : "",
          sortBy,
          isAscending,
          pageNumber,
          pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Greška prilikom dohvaćanja proizvoda:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filterOn, filterQuery, sortBy, isAscending, pageNumber, pageSize]);

  const handleSort = (field: string) => {
    setSortBy(field.includes("Name") ? "Name" : "Price");
    setIsAscending(field.includes("asc"));
  };

  const handleFilterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOn("Category");
    setFilterQuery(e.target.value);
    setPageNumber(1);
  };

  const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOn("Name");
    setFilterQuery(e.target.value);
    setPageNumber(1);
  };

  const changePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPageNumber(1);
  };

  const nextPage = () => setPageNumber((prev) => prev + 1);
  const prevPage = () => setPageNumber((prev) => prev - 1);

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-violet-600 text-center">
        🛍️ Prodavnica za Vaše Ljubimce
      </h1>

      <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-between items-center mb-10 p-4 bg-violet-50 rounded-lg shadow">
        <select
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
          onChange={handleFilterSelect}
        >
          <option value="all">Sve kategorije</option>
          <option value="igracke">Igračke</option>
          <option value="hrana">Hrana</option>
          <option value="oprema">Oprema</option>
          <option value="nega">Nega</option>
        </select>

        <input
          type="text"
          placeholder="🔍 Pretraži proizvode..."
          onChange={handleFilterInput}
          className="border rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

        <select
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="Name_asc">Naziv (A-Z)</option>
          <option value="Name_desc">Naziv (Z-A)</option>
          <option value="Price_asc">Cena ↑</option>
          <option value="Price_desc">Cena ↓</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.productId}
              productId={product.productId}
              name={product.name}
              description={product.description}
              imageUrl={product.imageUrl}
              price={product.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Nema proizvoda za prikaz.
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 my-12">
        <button
          onClick={prevPage}
          disabled={pageNumber === 1}
          className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Prethodna
        </button>

        <span className="text-gray-700 font-medium">Stranica {pageNumber}</span>

        <button
          onClick={nextPage}
          disabled={products.length < pageSize}
          className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sledeća →
        </button>

        <select
          value={pageSize}
          onChange={changePageSize}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="4">4 po strani</option>
          <option value="8">8 po strani</option>
          <option value="12">12 po strani</option>
        </select>
      </div>
    </div>
  );
};

export default Shop;
