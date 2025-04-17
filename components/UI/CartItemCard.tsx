import React from "react";
import { Trash2 } from "lucide-react";

interface CartItemCardProps {
  item: any;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItemCard = ({ item, onQuantityChange, onRemove }: CartItemCardProps) => (
  <div className="flex flex-col md:flex-row items-center justify-between border-b pb-6 gap-4">
    <div className="flex items-center gap-4">
      <img
        src={item.product.imageUrl}
        alt={item.product.name}
        className="w-24 h-24 object-contain rounded shadow"
      />
      <div>
        <h2 className="text-xl font-semibold text-violet-700">{item.product.name}</h2>
        <p className="text-gray-500 text-sm">
          {item.product.price} RSD x {item.quantity} kom
        </p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <input
        type="number"
        min={1}
        value={item.quantity}
        onChange={(e) => onQuantityChange(item.productId, Number(e.target.value))}
        className="border border-gray-300 rounded px-3 py-1 w-20 text-center"
      />
      <button onClick={() => onRemove(item.productId)} className="text-red-500 hover:text-red-700">
        <Trash2 size={20} />
      </button>
    </div>
  </div>
);

export default CartItemCard;