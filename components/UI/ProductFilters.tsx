"use client";

import React from "react";

interface ProductFiltersProps {
  role: string;
  onOpenModal: () => void;
  onFilterSelect: (value: string) => void;
  onFilterInput: (value: string) => void;
  onSort: (value: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  role,
  onOpenModal,
  onFilterSelect,
  onFilterInput,
  onSort,
}) => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-between items-center mb-10 p-4 bg-violet-50 rounded-lg shadow">
      <select
        className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
        onChange={(e) => onFilterSelect(e.target.value)}
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
        onChange={(e) => onFilterInput(e.target.value)}
        className="border rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-violet-400"
      />

      {role === "Manager" && (
        <button
          className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
          onClick={onOpenModal}
        >
          Dodaj Proizvod
        </button>
      )}

      <select
        className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="Name_asc">Naziv (A-Z)</option>
        <option value="Name_desc">Naziv (Z-A)</option>
        <option value="Price_asc">Cena ↑</option>
        <option value="Price_desc">Cena ↓</option>
      </select>
    </div>
  );
};

export default ProductFilters;
