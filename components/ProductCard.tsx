import React from "react";

const ProductCard = () => {
  return (
    <div className="border rounded-xl p-4 bg-white hover:shadow-md">
      <img
        src="https://via.placeholder.com/150"
        alt="Proizvod"
        className="w-full h-40 object-cover mb-4 rounded"
      />
      <h3 className="text-lg font-semibold">Naziv proizvoda</h3>
      <p className="text-gray-600">Opis proizvoda...</p>
      <p className="text-violet-600 font-bold mt-2">19.99 EUR</p>
    </div>
  );
};

export default ProductCard;
