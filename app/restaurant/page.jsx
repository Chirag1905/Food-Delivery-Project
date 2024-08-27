"use client";
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantFooter from "../_components/RestaurantFooter";

const Restaurant = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="text-center">
        <RestaurantHeader />
        <h1 className="text-3xl font-bold">Restaurant</h1>
        {login ? <RestaurantLogin /> : <RestaurantSignUp />}
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

export default Restaurant;
