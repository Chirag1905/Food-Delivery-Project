import Image from "next/image";
import Link from "next/link";
import React from "react";

const RestaurantHeader = () => {
  return (
    <div className="flex justify-between">
      <Image src="/Logo.jpeg" alt="Restaurant Logo" width={50} height={50} />
      <ul className="flex space-x-5 space-y-5 pr-[5px]">
        <li/>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">Login/SignUp</Link>
        </li>
        <li>
          <Link href="/">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default RestaurantHeader;
