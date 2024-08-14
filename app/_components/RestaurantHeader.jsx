"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const RestaurantHeader = () => {
  const [details, setDetails] = useState();
  const router = useRouter();

  useEffect(() => {
    let data = localStorage.getItem("restaurantUser");
    if (!data) {
      router.push("/restaurant");
    } else {
      setDetails(JSON.parse(data));
    }
  }, []);

  return (
    <div className="flex justify-between">
      <Image src="/Logo.jpeg" alt="Restaurant Logo" width={50} height={50} />
      <ul className="flex space-x-5 space-y-5 pr-[5px]">
        <li />
        <li>
          <Link href="/">Home</Link>
        </li>
        {details && details.name ? (
          <li>
            <Link href="/">Profile</Link>
          </li>
        ) : (
          <li>
            <Link href="/">Login/SignUp</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantHeader;
