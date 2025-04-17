"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface Product {
  productId: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

const ProductCard = (prop: Product) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${prop.productId}`);
  };

  return (
    <div
      className="border rounded-xl p-4 bg-white hover:shadow-md cursor-pointer flex flex-col items-center transition-all duration-300 hover:bg-violet-50"
      onClick={handleClick}
    >
      <img src={prop.imageUrl} alt={prop.name} className="object-cover rounded w-30 h-60 mb-4" />
      <div className="w-full">
        <div>
          <h3 className="text-lg font-semibold">{prop.name}</h3>
        </div>
        <div>
          <p className="text-gray-600">{prop.description}</p>
        </div>
        <div>
          <p className="text-violet-600 font-bold mt-2">{prop.price} RSD</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
