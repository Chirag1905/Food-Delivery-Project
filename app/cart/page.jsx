"use client";
import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Image from "next/image";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const [cartStorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartData, setCartData] = useState();
  const [isClient, setIsClient] = useState(false);
  const [removeCartData, setRemoveCartData] = useState();

  useEffect(() => {
    setIsClient(true);
    const cart = localStorage.getItem("cart");

    if (cart) {
      const parsedCart = JSON.parse(cart);
      setCartStorage(parsedCart);

      const calculatedTotal = parsedCart.reduce(
        (acc, item) => acc + item.price,
        0
      );
      setTotal(calculatedTotal);
    }
  }, []);

  const removeFromCart = (id) => {
    const updatedCartStorage = cartStorage.filter((item) => item._id !== id);
    setCartStorage(updatedCartStorage);
    setCartData();
    localStorage.setItem("cart", JSON.stringify(updatedCartStorage));
    const updatedTotal = updatedCartStorage.reduce(
      (acc, item) => acc + item.price,
      0
    );
    setTotal(updatedTotal);
  };

  const orderNow = () => {
    if (!isClient) return;
    localStorage?.getItem("user") && JSON.parse(localStorage?.getItem("user"))
      ? router.push("/order")
      : router.push("/user-auth?order=true");
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Header cartData={cartData} removeCartData={removeCartData} />
      <div className="mt-12 mb-12 text-orange-400 font-semibold">
        {cartStorage.length > 0 ? (
          cartStorage.map((item) => (
            <div
              key={item._id}
              className="flex border-b border-orange-400 p-5 text-base items-center capitalize"
            >
              <div className="pr-5">
                <Image
                  className="w-60 rounded-xl"
                  src={item.img_path}
                  alt={item.name}
                  width={200}
                  height={100}
                />
              </div>
              <div className="w-1/2 flex flex-col">
                <div className="text-lg font-semibold">{item.name}</div>
                <div className="font-normal">{item.description}</div>
                <button
                  className="w-1/4 mt-2 bg-orange-400 text-white p-2 rounded cursor-pointer"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove From Cart
                </button>
              </div>
              <div className="mt-2">Price: {item.price}</div>
            </div>
          ))
        ) : (
          <h1 className="text-center text-xl">
            No Food Items for this Restaurant
          </h1>
        )}
      </div>
      <div className="total-wrapper border-b border-orange-400 py-5 text-orange-400 font-semibold">
        <div className="flex justify-between px-8">
          <span>Food Charges:</span>
          <span>{total}</span>
        </div>
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
        <div className="flex justify-end px-8 mt-4">
          <button
            className="bg-orange-400 text-white px-6 py-2 rounded cursor-pointer"
            onClick={orderNow}
          >
            Order Now
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
