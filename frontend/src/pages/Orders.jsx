import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [userDetails, setUserDetails] = useState({ rank: "", moneyspent: 0 });
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success && Array.isArray(response.data.orders)) {
        setOrderData(response.data.orders.reverse());
      } else {
        console.error("No orders found or response format is incorrect");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const loadUserDetails = async () => {
    try {
      if (!token) return;

      const response = await axios.get(backendUrl + "/api/user/me", {
        headers: { token },
      });

      if (response.data) {
        setUserDetails(response.data);
      } else {
        console.error("User details not found or response format is incorrect");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([loadOrderData(), loadUserDetails()]);
      setLoading(false);
    };

    fetchData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      
      <div className="text-2xl">
        <Title text1={"АКТИВНОСТ НА"} text2={"ПРОФИЛ"} />
      </div>
      
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <p className="text-lg font-semibold">
          Вашият ранк: <span className="text-blue-600">Genious {userDetails.rank || "Няма"}</span>
        </p>
        <p className="text-sm text-gray-600">
          Общ оборот: {currency} {userDetails.moneyspent.toFixed(2)}
        </p>
      </div>
      
      <div className="text-2xl">
        <Title text1={"МОИТЕ"} text2={"ПОРЪЧКИ"} />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Зареждане...</p>
      ) : orderData.length === 0 ? (
        <p className="text-center text-gray-500 py-10">ВСЕ ОЩЕ НЯМАТЕ ПОРЪЧКИ.</p>
      ) : (
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
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <tr key={index} className="border-t border-b text-gray-700">
                  <td className="py-4 px-4">{order._id}</td>
                  <td className="py-4 px-4">
                    {order.items.length > 0 ? (
                      order.items.map((item, idx) => <p key={idx}>{item}</p>)
                    ) : (
                      <p>НЯМА ПРОДУКТИ</p>
                    )}
                  </td>
                  <td className="py-4 px-4">{currency} {order.amount}</td>
                  <td className="py-4 px-4">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-4 px-4">{order.payment ? "Completed" : "Pending"}</td>
                  <td className="py-4 px-4">{order.delivery_company}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-lg text-white ${order.status === "Delivered" ? "bg-green-500" : order.status === "Pending" ? "bg-yellow-500" : "bg-red-500"}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
