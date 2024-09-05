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
      <div className="flex bg-orange-400 p-4 font-semibold ">
        <h4 className="w-1/4"></h4>
        <h4 className="w-2/4">Contact: {restaurantDetails?.contact}</h4>
        <h4 className="w-2/4">Email: {restaurantDetails?.email}</h4>
        <h4 className="w-2/4">City: {restaurantDetails?.city}</h4>
        <h4 className="w-2/4">Address: {restaurantDetails?.address}</h4>
      </div>
      <div className="justify-center flex flex-wrap mt-12 mb-12 text-orange-400 font-semibold">
        {foodItemsDetails.length > 0 ? (
          foodItemsDetails?.map((item, index) => (
            <>
              {/* <div
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
              </div> */}

              <div
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow m-4 space-y-10"
                key={index}
              >
                {" "}
                <Image
                  className="rounded-t-lg"
                  src={item?.img_path}
                  alt={item?.name}
                  width={390}
                  height={100}
                />
                <div className="mt-2 px-5 pb-5">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                    {item?.name}
                  </h5>
                  <h6 className="m-1 text-sm h-5 font-medium tracking-tight text-gray-900 items-center overflow-hidden text-ellipsis line-clamp-2">
                    {item?.description}
                  </h6>

                  {/* <br />
                  <br /> */}
                  <div className="flex  items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                      5.0
                    </span>
                  </div>
                  <div className="flex items-center justify-between bottom-0">
                    <span className="text-3xl font-bold text-gray-900 ">
                      ₹{item?.price}
                    </span>
                    {cartIds.includes(item?._id) ? (
                      <button
                        className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={() => removeFromCart(item?._id)}
                      >
                        Remove From Cart
                      </button>
                    ) : (
                      <button
                        href="#"
                        className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={() => addToCart(item)}
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
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
