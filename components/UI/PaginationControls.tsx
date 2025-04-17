"use client";

import React from "react";

interface PaginationControlsProps {
  pageNumber: number;
  pageSize: number;
  onNext: () => void;
  onPrevious: () => void;
  onPageSizeChange: (size: number) => void;
  disableNext: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  pageNumber,
  pageSize,
  onNext,
  onPrevious,
  onPageSizeChange,
  disableNext,
}) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 my-12">
      <button
        onClick={onPrevious}
        disabled={pageNumber === 1}
        className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Prethodna
      </button>

      <span className="text-gray-700 font-medium">Stranica {pageNumber}</span>

      <button
        onClick={onNext}
        disabled={disableNext}
        className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sledeća →
      </button>

      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <option value="4">4 po strani</option>
        <option value="8">8 po strani</option>
        <option value="12">12 po strani</option>
      </select>
    </div>
  );
};

export default PaginationControls;
