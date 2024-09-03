"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DeliveryHeader = () => {
  return (
    <div className="flex justify-between space-y-3 font-medium text-blue-600">
      <Image src="/Logo.jpeg" alt="Restaurant Logo" width={50} height={50} />
      <ul className="flex space-x-5 pr-[5px]">
        <li className="no-underline space-x-5">
          <Link href="/">Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default DeliveryHeader;
