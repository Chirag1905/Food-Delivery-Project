"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";

const MyProfile = () => {
  const [myOrders, setMyOrders] = useState([]);
  const getMyOrders = async () => {
    const userStorage =
      localStorage?.getItem("user") &&
      JSON.parse(localStorage?.getItem("user"));
    let response = await fetch(
      `http://localhost:3000/api/order?id=${userStorage?._id}`
    );
    response = await response.json();
    response.success ? setMyOrders(response?.result) : null;
  };

  useEffect(() => {
    getMyOrders();
  }, []);
  return (
    <>
      <CustomerHeader />
      {myOrders?.map((item, index) => (
        <>
          <div
            key={index}
            className="w-5/12 bg-orange-400 m-2 p-2 border rounded cursor-pointer text-black font-medium ml-auto mr-auto"
          >
            <h4>Name: {item?.data?.name}</h4>
            <div>Amount: {item?.amount}</div>
            <div>Address: {item?.data?.address}</div>
            <div>Status: {item?.status}</div>
          </div>
        </>
      ))}
      <RestaurantFooter />
    </>
  );
};

export default MyProfile;
