"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import axios from "axios";

const MyProfile = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const getMyOrders = async () => {
      if (!isClient) return;

      const userStorage =
        typeof localStorage !== "undefined" &&
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user"));

      if (!userStorage?._id) {
        return;
      }

      try {
        let response = await axios.get(
          `http://localhost:3000/api/order?id=${userStorage._id}`
        );
        response = response?.data;
        response?.success ? setMyOrders(response?.result) : null;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getMyOrders();
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <CustomerHeader />
      {myOrders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        myOrders.map((item, index) => (
          <div
            key={index}
            className="w-5/12 bg-orange-400 m-2 p-2 border rounded cursor-pointer text-black font-medium ml-auto mr-auto"
          >
            <h4>Name: {item?.data?.name}</h4>
            <div>Amount: {item?.amount}</div>
            <div>Address: {item?.data?.address}</div>
            <div>Status: {item?.status}</div>
          </div>
        ))
      )}
      <RestaurantFooter />
    </>
  );
};

export default MyProfile;
