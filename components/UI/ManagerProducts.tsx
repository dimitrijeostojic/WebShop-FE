import React from "react";
import ProductCard from "@/components/UI/ProductCard";

interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ManagerProductsProps {
  products: Product[];
}

const ManagerProducts: React.FC<ManagerProductsProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        Još uvek niste dodali nijedan proizvod.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          productId={product.productId}
          name={product.name}
          description={product.description}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  );
};

export default ManagerProducts;
