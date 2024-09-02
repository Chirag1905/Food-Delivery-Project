"use client";
import React, { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import Image from "next/image";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";

const Page = () => {
  const [userStorage, setUserStorage] = useState(
    JSON.parse(localStorage?.getItem("user"))
  );
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage?.getItem("cart"))
  );
  const [total] = useState(() =>
    cartStorage?.length == 1
      ? cartStorage[0]?.price
      : cartStorage?.reduce((a, b) => {
          return a.price + b.price;
        })
  );
  return (
    <>
      <CustomerHeader />

      <div className="total-wrapper border-b border-orange-400 py-5 text-orange-400 font-semibold">
        <h2 className="text-black">User Details</h2>
        <div className="flex justify-between px-8">
          <span>Name:</span>
          <span>{userStorage?.name}</span>
        </div>
        <div className="flex justify-between px-8">
          <span>Address:</span>
          <span>{userStorage?.address}</span>
        </div>
        <div className="flex justify-between px-8">
          <span>Mobile:</span>
          <span>{userStorage?.contact}</span>
        </div>
        <h2 className="text-black">Amount Details</h2>
        <div className="flex justify-between px-8">
          <span>Tax:</span>
          <span>{(total * TAX) / 100}</span>
        </div>
        <div className="flex justify-between px-8">
          <span>Delivery Charges:</span>
          <span>{DELIVERY_CHARGES}</span>
        </div>
        <div className="flex justify-between px-8 text-xl font-bold">
          <span>Total Amount:</span>
          <span>{total + DELIVERY_CHARGES + (total * TAX) / 100}</span>
        </div>
        <h2 className="text-black">Payment Method</h2>
        <div className="flex justify-between px-8">
          <span>Cash on Delivery:</span>
          <span>{DELIVERY_CHARGES}</span>
        </div>
        <div className="flex justify-end px-8 mt-4">
          <button
            className="bg-orange-400 text-white px-6 py-2 rounded cursor-pointer"
            // onClick={orderNow}
          >
            Place Your Order Now
          </button>
        </div>
      </div>

      <RestaurantFooter />
    </>
  );
};

export default Page;
