
import React from "react";

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
}

interface UserOrdersProps {
  orders: Order[];
}

const UserOrders: React.FC<UserOrdersProps> = ({ orders }) => {
  if (orders.length === 0) {
    return <p className="text-gray-500 text-sm">Nema porudžbina za prikaz.</p>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.orderId}
          className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
        >
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Datum: {new Date(order.orderDate).toLocaleDateString()}</span>
            <p>ID porudžbine: {order.orderId}</p>
          </div>
          {order.orderItems.map((item) => (
            <div
              key={item.orderItemId}
              className="flex justify-between py-1 border-t text-sm"
            >
              <div>
                <p className="font-medium text-violet-700">{item.product.name}</p>
                <p className="text-gray-500">
                  {item.quantity} x {item.product.price.toFixed(2)} RSD
                </p>
              </div>
              <p className="font-semibold text-green-600">
                {(item.quantity * item.product.price).toFixed(2)} RSD
              </p>
            </div>
          ))}
          <p className="text-right text-sm font-semibold text-gray-700 mt-2">
            Ukupno:{" "}
            {order.orderItems
              .reduce(
                (sum, item) => sum + item.quantity * item.product.price,
                0
              )
              .toFixed(2)}{" "}
            RSD
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
