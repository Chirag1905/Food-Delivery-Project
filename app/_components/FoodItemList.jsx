"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    loadFoodItems();
  }, []);

  let resto_id;
  const resturantData =
    localStorage?.getItem("restaurantUser") &&
    JSON.parse(localStorage?.getItem("restaurantUser"));
  resturantData ? (resto_id = resturantData?._id) : null;

  const loadFoodItems = async () => {
    let response = await axios.get(
      `http://localhost:3000/api/restaurant/foods/${resto_id}`
    );
    response = await response?.data;
    response?.success
      ? setFoodItems(response?.result)
      : toast.error("Error fetching food items");
  };

  const deleteFoodItem = async (id) => {
    let response = await axios.delete(
      `http://localhost:3000/api/restaurant/foods/${id}`
    );
    response = await response?.data;
    response?.success ? loadFoodItems() : toast.error("food item not deleted");
  };
  return (
    <>
      <h1 className="ml-4 mb-2 text-2xl font-extrabold text-gray-900">
        <span className="text-3xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          List of Food
        </span>{" "}
        Products
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.N
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {foodItems &&
              foodItems.map((item, index) => (
                <tr
                  className="bg-gray-50 border-b hover:bg-gray-100 "
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-7 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item?.name}
                  </th>
                  <td className="px-6 py-4">₹{item?.price}</td>
                  <td className="px-6 py-4">{item?.description}</td>
                  <td className="px-6 py-4">
                    <Image
                      className="rounded-lg"
                      src={item?.img_path}
                      alt={item?.name}
                      width={150}
                      height={100}
                    />{" "}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                      onClick={() => router.push(`dashboard/${item?._id}`)}
                    >
                      Edit
                    </a>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                      onClick={() => deleteFoodItem(item?._id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FoodItemList;
