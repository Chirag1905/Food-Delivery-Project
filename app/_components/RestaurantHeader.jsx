"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const RestaurantHeader = () => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let data = localStorage.getItem("restaurantUser");
    if (!data && pathname == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathname == "/restaurant") {
      router.push("/restaurant/dashboard");
    } else {
      setDetails(JSON.parse(data));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
  };
  
  // console.log("🚀 ~ RestaurantHeader ~ details:", details)
  // console.log("🚀 ~ RestaurantHeader ~ details:", details.result.name)
  return (
    <div className="flex justify-between">
      <Image src="/Logo.jpeg" alt="Restaurant Logo" width={50} height={50} />
      <ul className="flex space-x-5 space-y-5 pr-[5px]">
        <li className="no-underline" />
        <li className="no-underline">
          <Link href="/">Home</Link>
        </li>
        <li className="no-underline">
          {details && details.name ? (
            <>
              <Link href="/">Profile</Link>
              <button
                className="no-underline bg-transparent border-none bg-blue-500 text-[18px] cursor-pointer"
                onClick={logout()}
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/">Login/SignUp</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default RestaurantHeader;
          // {details && details.result.name ? (
                      