"use client";
import React, { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import UserSignUp from "../_components/UserSignUp";
import UserLogin from "../_components/UserLogin";

const Userauth = (props) => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="text-center">
        <CustomerHeader />
        {login ? (
          <UserLogin redirect={props?.serachParams} />
        ) : (
          <UserSignUp redirect={props?.serachParams} />
        )}
        <div>
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login
              ? "Do not have account? SignUp"
              : "Already have account? SignIn"}
          </button>
        </div>
      </div>
      <RestaurantFooter />
    </>
  );
};

export default Userauth;
