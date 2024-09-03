"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import Image from "next/image";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Order = () => {
  const router = useRouter();
  const [removeCartData, setRemoveCartData] = useState(false);
  const [userStorage, setUserStorage] = useState(
    localStorage?.getItem("user") && JSON.parse(localStorage?.getItem("user"))
  );
  const [cartStorage, setCartStorage] = useState(
    localStorage?.getItem("cart") && JSON.parse(localStorage?.getItem("cart"))
  );
  const [total] = useState(() =>
    cartStorage?.length == 1
      ? cartStorage[0]?.price
      : cartStorage?.reduce((a, b) => {
          return a.price + b.price;
        })
  );

  const orderNow = async () => {
    let user_id =
      localStorage?.getItem("user") &&
      JSON.parse(localStorage?.getItem("user"))._id;
    let city =
      localStorage?.getItem("user") &&
      JSON.parse(localStorage?.getItem("user")).city;
    let cart =
      localStorage?.getItem("cart") &&
      JSON.parse(localStorage?.getItem("cart"));
    let foodItemIds = cart?.map((item) => item?._id).toString();
    let deliveryBoyResponse = await fetch(
      `http://localhost:3000/api/deliverypartner/${city}`
    );
    deliveryBoyResponse = await deliveryBoyResponse?.json();
    let deliveryBoyIds = deliveryBoyResponse?.result?.map((item) => item?._id);
    let deliveryBoy_id =
      deliveryBoyIds[Math?.floor(Math?.random() * deliveryBoyIds?.length)];
    !deliveryBoy_id ? alert("Delivery Partner Not available") : false;
    // let deliveryBoy_id = "66cf1fad3add29dc036e6f2b";
    let resto_id = cart[0]?.resto_id;
    let collection = {
      user_id,
      resto_id,
      foodItemIds,
      deliveryBoy_id,
      status: "confirm",
      amount: total + DELIVERY_CHARGES + (total * TAX) / 100,
    };
    let response = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      body: JSON.stringify(collection),
    });
    response = await response?.json();
    response?.success
      ? (() => {
          alert("order confirmed");
          setRemoveCartData(true);
          router.push("/myprofile");
        })()
      : alert("order failed");
  };

  useEffect(() => {
    !total ? router.push("/") : null;
  }, [total]);
  return (
    <>
      <CustomerHeader removeCartData={removeCartData} />

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
            onClick={orderNow}
          >
            Place Your Order Now
          </button>
        </div>
      </div>

      <RestaurantFooter />
    </>
  );
};

export default Order;
