"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const CustomerHeader = (props) => {
  const router = useRouter();
  const routes = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/myprofile" },
    { name: "Login", path: "/user-auth" },
    { name: "Signup", path: "/services/[id]", params: { id: "1" } },
    { name: "Add Restaurant", path: "/restaurant" },
    { name: "Delivery Partner", path: "/deliverypartner" },
  ];
  const userStorage =
    localStorage?.getItem("user") && JSON.parse(localStorage?.getItem("user"));
  const cartStorage =
    localStorage?.getItem("cart") && JSON.parse(localStorage?.getItem("cart"));
  const [user, setUser] = useState(userStorage ? userStorage : undefined);
  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItem, setCartItem] = useState(cartStorage);

  useEffect(() => {
    if (props?.cartData) {
      if (cartNumber) {
        if (cartItem[0]?.resto_id != props?.cartData?.resto_id) {
          localStorage.removeItem("cart");
          setCartNumber(1);
          setCartItem([props?.cartData]);
          localStorage?.setItem("cart", JSON.stringify([props?.cartData]));
        } else {
          let localCartItem = cartItem;
          localCartItem?.push(JSON.parse(JSON.stringify(props?.cartData)));
          setCartItem(localCartItem);
          setCartNumber(cartNumber + 1);
          localStorage?.setItem("cart", JSON.stringify(localCartItem));
        }
      } else {
        setCartNumber(1);
        setCartItem([props?.cartData]);
        localStorage?.setItem("cart", JSON.stringify([props?.cartData]));
      }
    }
  }, [props?.cartData]);

  useEffect(() => {
    if (props?.removeCartData) {
      let localCartItem = cartItem?.filter((item) => {
        return item?._id != props?.removeCartData;
      });
      setCartItem(localCartItem);
      setCartNumber(cartNumber - 1);
      localStorage?.setItem("cart", JSON.stringify(localCartItem));
      if (localCartItem?.length == 0) {
        localStorage?.removeItem("cart");
      }
    }
  }, [props?.removeCartData]);

  useEffect(() => {
    if (props?.removeCartData) {
      setCartItem([]);
      setCartNumber(0);
      localStorage?.removeItem("cart");
    }
  }, [props?.removeCartData]);

  const logout = () => {
    localStorage?.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const navigateTo = (route) => {
    if (route.params) {
      const path = route.path.replace(
        /\[(.*?)\]/g,
        (_, key) => route.params[key]
      );
      router.push(path);
    } else {
      router.push(route.path);
    }
  };

  return (
    <>
      <div className="flex justify-between space-y-3 font-medium text-blue-600">
        <Image src="/Logo.jpeg" alt="Restaurant Logo" width={50} height={50} />
        <ul className="flex space-x-5 pr-[5px]">
          <li className="no-underline space-x-5">
            <Link href="/">Home</Link>
            {user ? (
              <>
                <Link href="/myprofile">{user?.name}</Link>
                <button
                  className="no-underline bg-transparent border-none bg-blue-500  cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : ( 
              <>
                <Link href="/user-auth">Login</Link>
                <Link href="/user-auth">SignUp</Link>
              </>
            )}
            <Link href={cartNumber ? "/cart" : "#"}>
              Cart({cartNumber ? cartNumber : 0})
            </Link>
            <Link href="/restaurant">Add Restaurant</Link>
            <Link href="/deliverypartner">Delivery Partner</Link>
          </li>
        </ul>
      </div>

      <nav className="bg-white border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/Logo.jpeg"
              className="w-10 h-10 rounded-full"
              alt="Hungry Hub Logo"
              width={50}
              height={50}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Hungry Hub
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
              {routes.map((route, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigateTo(route)}
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 "
                  >
                    {route.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default CustomerHeader;
