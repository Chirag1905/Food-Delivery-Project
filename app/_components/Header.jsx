"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Header = (props) => {
  const router = useRouter();
  const userStorage =
    localStorage?.getItem("user") && JSON.parse(localStorage?.getItem("user"));
  const cartStorage =
    localStorage?.getItem("cart") && JSON.parse(localStorage?.getItem("cart"));
  const [user, setUser] = useState(userStorage ? userStorage : undefined);
  const [cartNumber, setCartNumber] = useState(cartStorage?.length);
  const [cartItem, setCartItem] = useState(cartStorage);
  const [details, setDetails] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const data = localStorage?.getItem("restaurantUser");

    !data && pathname === "/restaurant/dashboard"
      ? router.push("/restaurant")
      : data && pathname === "/restaurant"
      ? router.push("/restaurant/dashboard")
      : setDetails(JSON.parse(data));
  }, [pathname, router]);

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
    if (route.action) {
      route.action();
    } else if (route.params) {
      const path = route.path.replace(
        /\[(.*?)\]/g,
        (_, key) => route.params[key]
      );
      router.push(path);
    } else {
      router.push(route.path);
    }
  };

  const routes = [
    { name: "Home", path: "/" },
    ...(pathname !== "/restaurant" &&
    pathname !== "/restaurant/dashboard" &&
    pathname !== "/deliverypartner"
      ? user
        ? [
            { name: user.name, path: "/myprofile" },
            { name: "Logout", path: "/", action: logout },
            {
              name: `Cart(${cartNumber ? cartNumber : 0})`,
              path: `${cartNumber ? "/cart" : "#"}`,
            },
          ]
        : [
            { name: "Login", path: "/user-auth" },
            { name: "Signup", path: "/user-auth" },
            {
              name: `Cart(${cartNumber ? cartNumber : 0})`,
              path: `${cartNumber ? "/cart" : "#"}`,
            },
          ]
      : []),
  ];

  const moreOptions = [
    { name: "Dine In Login", path: "/restaurant" },
    { name: "Dine In Register", path: "/restaurant" },
    { name: "Delivery Partner", path: "/deliverypartner" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="bg-gray-100 border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/Logo.jpeg"
              className="w-10 h-10 rounded-full"
              alt="Hungry Hub Logo"
              width={80}
              height={50}
            />

            <h1 className="flex items-center text-4xl font-extrabold">
              Hungry
              <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
                Hub
              </span>
            </h1>
          </Link>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              {routes.map((route, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigateTo(route)}
                    className="block py-2 px-3 text-white bg-blue-700 hover:text-blue-700 rounded md:bg-transparent md:text-gray-700 md:p-0 "
                  >
                    {route.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  id="dropdownNavbarLink"
                  onClick={toggleDropdown}
                  className="flex items-center justify-between w-full py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto "
                >
                  More Options
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  className={`${
                    isDropdownOpen ? "block" : "hidden"
                  } absolute z-10 font-normal bg-orange-50 divide-y divide-gray-100 rounded-lg shadow w-44 `}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 "
                    aria-labelledby="dropdownNavbarLink"
                  >
                    {moreOptions.map((option, index) => (
                      <li key={index}>
                        <button
                          onClick={() => navigateTo(option)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {option.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
