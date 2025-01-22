import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext"; // Обърнете внимание на пътя
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext); // Прочитаме стойностите от контекста
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success && Array.isArray(response.data.orders)) {
        setOrderData(response.data.orders.reverse()); // Задаваме поръчките в състоянието
      } else {
        console.error("No orders found or response format is incorrect");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b py-3 px-4 text-left">НОМЕР НА ПОРЪЧКАТА</th>
              <th className="border-b py-3 px-4 text-left">ПРОДУКТИ</th>
              <th className="border-b py-3 px-4 text-left">ЦЕНА</th>
              <th className="border-b py-3 px-4 text-left">ДАТА</th>
              <th className="border-b py-3 px-4 text-left">ПЛАЩАНЕ</th>
              <th className="border-b py-3 px-4 text-left">ДОСТАВЧИК</th>
              <th className="border-b py-3 px-4 text-left">СТАТУС</th>
              <th className="border-b py-3 px-4 text-left">ДЕЙСТВИЯ</th>
            </tr>
          </thead>
          <tbody>
            {orderData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-10 text-gray-500">
                  ВСЕ ОЩЕ НЯМАТЕ ПОРЪЧКИ.
                </td>
              </tr>
            ) : (
              orderData.map((order, orderIndex) => (
                <tr key={orderIndex} className="border-t border-b text-gray-700">
                  <td className="py-4 px-4">{order._id}</td>
                  <td className="py-4 px-4">
                    {order.items.length > 0 ? (
                      order.items.map((item, itemIndex) => {
                        // Разделяме елемента на продукта и количеството
                        const itemParts = item.split(' x ');
                        const productName = itemParts[0];
                        const quantity = itemParts[1] ? itemParts[1] : 'N/A'; // Ако няма количество, показваме "N/A"
                        const price = itemParts[2];

                        return (
                          <p key={itemIndex}>
                            {productName} x {quantity} x {price}
                          </p>
                        );
                      })
                    ) : (
                      <p>НЯМА ПРОДУКТИ</p>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    {currency} {order.amount}
                  </td>
                  <td className="py-4 px-4">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    {order.payment ? "Completed" : "Pending"}
                  </td>
                  <td className="py-4 px-4">{order.delivery_company}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`min-w-2 h-2 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-500"
                          : order.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></span>
                    {order.status}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => loadOrderData()}
                      className="border px-4 py-2 text-sm font-medium rounded-sm"
                    >
                      ПРОСЛЕДИ ПОРЪЧКАТА СИ
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
