"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const CustomerHeader = (props) => {
  const cartStorage = JSON.parse(localStorage.getItem("cart"));
  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItem, setCartItem] = useState(cartStorage);

  useEffect(() => {
    console.log("props", props);
    if (props.cartData) {
      console.log(props);
      if (cartNumber) {
        let localCartItem=cartItem;
        localCartItem.push(props.cartData)
      } else {
        setCartNumber(1);
        setCartItem([props.cartData]);
      }
      localStorage.setItem("cart", JSON.stringify([props.cartData]));
    }
  }, [props.cartData]);
  return (
    <div className="flex justify-between space-y-3 font-medium text-blue-600">
      <Image src="/Logo.jpeg" alt="Restaurant Logo" width={50} height={50} />
      <ul className="flex space-x-5 pr-[5px]">
        <li className="no-underline space-x-5">
          <Link href="/">Home</Link>
          <Link href="/">Login</Link>
          <Link href="/">SignUp</Link>
          <Link href="/">Cart({cartNumber})</Link>
          <Link href="/">Add Restaurant</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
