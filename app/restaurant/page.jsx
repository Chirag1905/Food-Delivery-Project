"use client";
import { useState } from "react";
import RestaurantLogin from "../_components/restaurantLogin";
import RestaurantSignUp from "../_components/restaurantSignUp";

const Restaurant = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="container">
        <h1>Restaurant Login/SignUp Page</h1>
        {login ? <RestaurantLogin /> : <RestaurantSignUp />}

        <div>
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login ? "Do Not have Account" : "Already have Account? SignUp"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Restaurant;
