"use client";
import { useState, useEffect, useRef } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { register, setValue } = useForm();
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [showLocation, setShowLocation] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
      await loadLocations();
      await loadRestaurants();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowLocation(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const loadLocations = async () => {
    try {
      let response = await axios.get(
        "http://localhost:3000/api/customer/locations"
      );
      response = response?.data;
      response?.success ? setLocations(response?.result) : null;
    } catch (error) {
      console.error("Error loading locations:", error);
    }
  };

  const loadRestaurants = async (params = {}) => {
    try {
      let url = "http://localhost:3000/api/customer";
      if (params.location) {
        url += `?location=${params.location}`;
      } else if (params.restaurant) {
        url += `?restaurant=${params.restaurant}`;
      }

      let response = await axios.get(url);
      response = response.data;
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

  if (!isClient) {
    return null;
  }
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
        <h1 className="font-bold text-center text-4xl m-4">Hungry Hub</h1>

        <div className="bg-white p-1 border rounded-lg m-auto w-3/5 text-black relative flex shadow-lg">
          <div className="flex items-center w-1/4 relative">
            <Image
              src="/images/location-icon.svg"
              alt="Location Icon"
              width={15}
              height={20}
              className="ml-2"
            />
            <input
              type="text"
              placeholder="Select Place"
              className="h-[40px] w-full border-none pl-2 outline-none"
              {...register("place")}
              onClick={() => setShowLocation(true)}
              ref={inputRef}
            />
            <Image
              src="/images/caret-down-solid.svg"
              alt="Dropdown Icon"
              width={10}
              height={15}
              className="mr-2 cursor-pointer"
              onClick={() => setShowLocation(true)}
            />
            {showLocation && (
              <div
                ref={dropdownRef}
                className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-full mt-2 max-h-48 overflow-y-auto z-10"
                style={{ top: "100%", left: 0 }}
              >
                <ul className="py-2 text-sm text-gray-700">
                  {locations.map((item, index) => (
                    <li
                      className="cursor-pointer p-2 hover:bg-gray-200"
                      key={index}
                      onClick={() => handleListItem(item)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex items-center w-3/4 pl-4">
            <Image
              src="/images/search-icon.svg"
              alt="Search Icon"
              width={30}
              height={20}
              className="mr-2"
            />
            <input
              type="text"
              className="h-[40px] w-full border-none outline-none bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for restaurant, cuisine or a dish"
              {...register("food")}
              onChange={(e) => loadRestaurants({ restaurant: e.target.value })}
            />
          </div>
        </div>

        <div className="justify-center ml-10 p-5 grid grid-cols-2 gap-4">
          {restaurants.map((item, index) => (
            <Link
              key={index}
              href={`explore/${item?.name}?id=${item?._id}`}
              className="flex flex-col items-center mb-5 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 "
            >
              <Image
                className="p-2 h-auto w-48"
                src={item?.logo}
                alt=""
                width={400}
                height={100}
              />
              <div className="ml-5 flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {item?.name}
                </h5>
                <p className="mb-1 font-normal text-gray-700 ">
                  <b>Contact:</b> {item?.contact}
                </p>
                <p className="mb-1 font-normal text-gray-700 ">
                  <b>E-Mail:</b> {item?.email}
                </p>
                <p className="mb-1 font-normal text-gray-700 ">
                  <b>Address:</b> {item?.city}, {item?.address}
                </p>
                <p className="mb-3 font-normal text-gray-700 ">
                  <b>Description:</b> Here are the biggest enterprise technology
                  acquisitions of 2021 so far, in reverse chronological order.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <RestaurantFooter />
    </>
  );
}
