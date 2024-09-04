"use client";
import React, { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import UserSignUp from "../_components/UserSignUp";
import UserLogin from "../_components/UserLogin";
import { useRouter } from "next/navigation";

const UserAuth = () => {
  const [login, setLogin] = useState(true);
  const [searchParams, setSearchParams] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    if (router.query) {
      setSearchParams(router.query);
    }
  }, [router.query]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="text-center">
        <CustomerHeader />
        {login ? (
          <UserLogin redirect={searchParams} />
        ) : (
          <UserSignUp redirect={searchParams} />
        )}
        <div>
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login
              ? "Do not have an account? SignUp"
              : "Already have an account? SignIn"}
          </button>
        </div>
      </div>
      <RestaurantFooter />
    </>
  );
};

export default UserAuth;
