"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = (props) => {
  const name = props?.params?.name;
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [foodItemsDetails, setFootItemsDetails] = useState([]);
  const [cartData, setCartData] = useState();
  const [cartStorage] = useState(
    localStorage?.getItem("cart") && JSON.parse(localStorage?.getItem("cart"))
  );
  const [cartIds, setCartIDs] = useState(
    cartStorage
      ? () =>
          cartStorage?.map((item) => {
            return item?._id;
          })
      : []
  );
  const [removeCartData, setRemoveCartData] = useState();

  useEffect(() => {
    loadRestaurantsDetails();
  }, []);

  const loadRestaurantsDetails = async () => {
    try {
      const id = props?.searchParams?.id;
      let response = await axios.get(
        `http://localhost:3000/api/customer/${id}`
      );
      response = await response?.data;
      response?.success
        ? (() => {
            setRestaurantDetails(response?.details);
            setFootItemsDetails(response?.foodItems);
          })()
        : "";
    } catch (error) { 
      console.log("error:", error);
    }
  };

  const addToCart = (item) => {
    let localCartIds = cartIds;
    localCartIds?.push(item?._id);
    setCartIDs(localCartIds);
    setCartData(item);
    setRemoveCartData();
  };

  const removeFromCart = (id) => {
    setRemoveCartData(id);
    let localIds = cartIds.filter((item) => item != id);
    setCartData();
    setCartIDs(localIds);
  };
  return (
    <>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div
        className="h-[230px] p-[30px] bg-black bg-opacity-70 bg-blend-multiply text-white"
        style={{
          backgroundImage:
            "url('https://a.storyblok.com/f/88809/1150x450/30a9c4f9a6/igevia_header_fastfood01_450.jpg')",
        }}
      >
        <div>
          {" "}
          <h1 className="font-bold text-center text-6xl m-4">
            {decodeURI(name)}
          </h1>
        </div>
      </div>
      <div className="detail-wrapper flex bg-orange-400 p-4 font-semibold ">
        <h4 className="w-1/4"></h4>
        <h4 className="w-2/4">Contact: {restaurantDetails?.contact}</h4>
        <h4 className="w-2/4">Email: {restaurantDetails?.email}</h4>
        <h4 className="w-2/4">City: {restaurantDetails?.city}</h4>
        <h4 className="w-2/4">Address: {restaurantDetails?.address}</h4>
      </div>
      <div className="food-item-wrapper mt-12 mb-12 text-orange-400 font-semibold">
        {foodItemsDetails.length > 0 ? (
          foodItemsDetails?.map((item, index) => (
            <div
              key={index}
              className="flex border border-b-0 border-orange-400 p-5 text-transform: capitalize items-center"
            >
              <div className="pr-5">
                {" "}
                <Image
                  className="rounded-xl"
                  src={item?.img_path}
                  alt={item?.name}
                  width={150}
                  height={100}
                />
              </div>
              <div>
                <div>{item?.name}</div>
                <div>{item?.price}</div>
                <div className="description font-light">
                  {item?.description}
                </div>
                {cartIds.includes(item?._id) ? (
                  <button
                    className="text-white border-none bg-orange-400 p-1 rounded cursor-pointer"
                    onClick={() => removeFromCart(item?._id)}
                  >
                    Remove From Cart
                  </button>
                ) : (
                  <button
                    className="text-white border-none bg-orange-400 p-1 rounded cursor-pointer"
                    onClick={() => addToCart(item)}
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>No food item added for now </h1>
        )}
      </div>
      <RestaurantFooter />
    </>
  );
};

export default Page;
