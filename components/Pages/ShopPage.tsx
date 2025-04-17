"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/UI/ProductCard";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import AddProductModal from "../Forms/AddProductModal";
import Spinner from "../UI/Spinner";
import ProductFilters from "../UI/ProductFilters";
import PaginationControls from "../UI/PaginationControls";

interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterOn, setFilterOn] = useState("Name");
  const [filterQuery, setFilterQuery] = useState("");
  const [sortBy, setSortBy] = useState("Name");
  const [isAscending, setIsAscending] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [role, setRole] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
    if (token) {
      const decoded: any = jwtDecode(token);
      setRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    }
    fetchProducts();
  }, [filterOn, filterQuery, sortBy, isAscending, pageNumber, pageSize]);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-violet-600 text-center">
        🏍️ Prodavnica za Vaše Ljubimce
      </h1>

      <ProductFilters
        role={role}
        onOpenModal={handleModalOpen}
        onFilterSelect={(value) => {
          setFilterOn("Category");
          setFilterQuery(value);
          setPageNumber(1);
        }}
        onFilterInput={(value) => {
          setFilterOn("Name");
          setFilterQuery(value);
          setPageNumber(1);
        }}
        onSort={(field) => {
          setSortBy(field.includes("Name") ? "Name" : "Price");
          setIsAscending(field.includes("asc"));
        }}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <>
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

          <PaginationControls
            pageNumber={pageNumber}
            pageSize={pageSize}
            onNext={() => setPageNumber((prev) => prev + 1)}
            onPrevious={() => setPageNumber((prev) => prev - 1)}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPageNumber(1);
            }}
            disableNext={products.length < pageSize}
          />
        </>
      )}

      <AddProductModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default ShopPage;
