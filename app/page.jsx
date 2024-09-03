"use client";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { register, setValue } = useForm();
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [showLocation, setShowLocation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    try {
      let response = await fetch(
        `http://localhost:3000/api/customer/locations`
      );
      response = await response?.json();
      response?.success ? setLocations(response?.result) : null;
    } catch (error) {
      console.error("Error loading locations:", error);
    }
  };

  const loadRestaurants = async (params) => {
    try {
      let url = `http://localhost:3000/api/customer`;
      url += params?.location
        ? `?location=${params?.location}`
        : params?.restaurant
        ? `?restaurant=${params?.restaurant}`
        : "";

      let response = await fetch(url);
      response = await response?.json();
      response?.success ? setRestaurants(response?.result) : null;
    } catch (error) {
      console.error("Error loading restaurants:", error);
    }
  };

  const handleListItem = (item) => {
    setValue("place", item);
    setShowLocation(false);
    loadRestaurants({ location: item });
  };

  return (
    <>
      <CustomerHeader />
      <div
        className="h-[230px] p-[30px] bg-black bg-opacity-70 bg-blend-multiply text-white"
        style={{
          backgroundImage:
            "url('https://a.storyblok.com/f/88809/1150x450/30a9c4f9a6/igevia_header_fastfood01_450.jpg')",
        }}
      >
        <h1 className="font-bold text-center text-4xl m-4">
          Food Delivery App
        </h1>
        <div className="bg-white p-1 border rounded m-auto w-3/5 text-black relative">
          <input
            type="text"
            placeholder="Select Place"
            className="h-[40px] w-1/4 border-none pl-4 outline-none"
            {...register("place")}
            onClick={() => setShowLocation(true)}
          />
          {showLocation && (
            <ul className="text-black text-left absolute bg-white border w-1/4 mt-2 z-10 max-h-48 overflow-y-auto">
              {locations?.map((item, index) => (
                <li
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  key={index}
                  onClick={() => handleListItem(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
          <input
            type="text"
            className="h-[40px] w-3/4 border border-l-2 pl-4 outline-none"
            placeholder="Enter food or restaurant name"
            {...register("food")}
            onChange={(e) => loadRestaurants({ restaurant: e.target.value })}
          />
        </div>

        <div className="justify-center flex flex-row flex-wrap mt-10 mb-12">
          {restaurants?.map((item, index) => (
            <div
              className="w-5/12 bg-orange-400 m-2 p-2 border rounded cursor-pointer text-black font-medium"
              key={index}
              onClick={() =>
                router.push("explore/" + item?.name + "?id=" + item?._id)
              }
            >
              <div className="pl-4 flex text-lg font-bold space-x-4">
                <h3>{item?.name}</h3>
                <h5>Contact: {item?.contact}</h5>
              </div>
              <div className="pl-4 mt-2">
                <div>{item?.city},</div>
                <div>
                  {item?.address}, Email: {item?.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <RestaurantFooter />
    </>
  );
}
