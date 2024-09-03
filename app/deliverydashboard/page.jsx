"use client";
import React, { useEffect, useState } from "react";
import DeliveryHeader from "../_components/DeliveryHeader";
import { useRouter } from "next/navigation";

const DeliveryDashboard = () => {
  const router = useRouter();
  const [ordersList, setOrdersList] = useState([]);
  const getMyOrders = async () => {
    const deliveryData =
      localStorage?.getItem("delivery") &&
      JSON.parse(localStorage?.getItem("delivery"));
    let response = await fetch(
      `http://localhost:3000/api/deliverypartner/orders/${deliveryData?._id}`
    );
    response = await response?.json();
    console.log("🚀 ~ getMyOrders ~ response:", response)
    response.success ? setOrdersList(response?.result) : null;
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  useEffect(() => {
    const delivery = JSON.parse(localStorage?.getItem("delivery"));
    delivery ? router.push("/deliverydashboard") : null;
  }, []);
  return (
    <>
      <DeliveryHeader />
      <h1>My Order List</h1>
      {ordersList?.map((item, index) => (
        <>
          <div
            key={index}
            className="w-5/12 bg-orange-400 m-2 p-2 border rounded cursor-pointer text-black font-medium ml-auto mr-auto"
          >
            <h4>Name: {item?.data?.name}</h4>
            <div>Amount: {item?.amount}</div>
            <div>Address: {item?.data?.address}</div>
            <div>Status: {item?.status}</div>
            <div>
              Update Status:
              <select>
                <option>Confirm</option>
                <option>On the way</option>
                <option>Delivered</option>
                <option>Failed to delivery</option>
              </select>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default DeliveryDashboard;
