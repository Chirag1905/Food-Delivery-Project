"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const RestaurantHeader = () => {
  const [details, setDetails] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const data = localStorage?.getItem("restaurantUser");

    !data && pathname === "/restaurant/dashboard"
      ? router.push("/restaurant")
      : data && pathname === "/restaurant"
      ? router.push("/restaurant/dashboard")
      : setDetails(JSON.parse(data));
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem("restaurantUser");
    setDetails(null);
    router.push("/restaurant");
  };

  return (
    <div className="flex justify-between space-y-2 font-medium text-blue-600">
      <Image src="/Logo.jpeg" alt="Restaurant Logo" width={50} height={50} />
      <ul className="flex space-x-5 pr-[5px]">
        <li className="no-underline">
          <Link href="/">Home</Link>
        </li>
        <li className="no-underline space-x-5">
          {details ? (
            <>
              <Link href="/">Profile</Link>
              <button
                className="no-underline bg-transparent border-none bg-blue-500  cursor-pointer"
                onClick={logout}
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
