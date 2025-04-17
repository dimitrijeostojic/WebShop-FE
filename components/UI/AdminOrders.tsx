import React from "react";
import OrderList from "./OrderList";

interface Product {
  name: string;
  price: number;
}

interface OrderItem {
  orderItemId: string;
  product: Product;
  quantity: number;
}

interface Order {
  orderId: string;
  orderDate: string;
  orderItems: OrderItem[];
  userId: string;
}

interface AdminOrdersProps {
  orders: Order[];
  userMap: { [key: string]: string };
}

const AdminOrders: React.FC<AdminOrdersProps> = ({ orders, userMap }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Sve porudžbine
      </h3>
      <OrderList orders={orders} userMap={userMap} isAdmin />
    </div>
  );
};

export default AdminOrders;
