"use client";
import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {
  const router = useRouter();
  const [removeCartData, setRemoveCartData] = useState(false);
  const [userStorage, setUserStorage] = useState(null);
  const [cartStorage, setCartStorage] = useState(null);
  const [total, setTotal] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const user = localStorage.getItem("user");
    const cart = localStorage.getItem("cart");

    if (user) {
      setUserStorage(JSON.parse(user));
    }
    if (cart) {
      const parsedCart = JSON.parse(cart);
      setCartStorage(parsedCart);
      const calculatedTotal =
        parsedCart.length === 1
          ? parsedCart[0]?.price
          : parsedCart.reduce((a, b) => a + b.price, 0);
      setTotal(calculatedTotal);
    }
  }, []);
  const orderNow = async () => {
    if (!isClient) return;

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

    try {
      let deliveryBoyResponse = await axios.get(
        `http://localhost:3000/api/deliverypartner/${city}`
      );
      let deliveryBoyIds = deliveryBoyResponse?.data?.result?.map(
        (item) => item?._id
      );

      // Debugging logs
      console.log("Delivery Boy IDs:", deliveryBoyIds);

      // Safeguard to check if deliveryBoyIds is valid
      if (!deliveryBoyIds || deliveryBoyIds.length === 0) {
        toast("Delivery Partner Not available");
        return;
      }

      let deliveryBoy_id =
        deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];

      let resto_id = cart[0]?.resto_id;
      let collection = {
        user_id,
        resto_id,
        foodItemIds,
        deliveryBoy_id,
        status: "confirm",
        amount: total + DELIVERY_CHARGES + (total * TAX) / 100,
      };
      let response = await axios.post(
        "http://localhost:3000/api/order",
        collection
      );
      response = await response?.data;
      response?.success
        ? (() => {
            toast.success("Order Placed!");
            setRemoveCartData(true);
            router.push("/myprofile");
          })()
        : toast.error("Order failed");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred while placing the order.");
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Header removeCartData={removeCartData} />

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

      <Footer />
    </>
  );
};

export default Order;
