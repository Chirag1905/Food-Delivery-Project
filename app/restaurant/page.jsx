"use client";
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import Header from "../_components/Header";
import Footer from "../_components/Footer";

const Restaurant = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="text-center">
        <Header/>
        {login ? <RestaurantLogin /> : <RestaurantSignUp />}
        <div>
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login ? (
              <p className="ms-2 text-sm font-medium text-gray-900 text-left">
                Do not have an account?
                <span className="text-blue-600 hover:underline"> SignUp</span>
              </p>
            ) : (
              <p className="ms-2 text-sm font-medium text-gray-900 text-left">
                Already have an account?
                <span className="text-blue-600 hover:underline"> SignIn</span>
              </p>
            )}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Restaurant;
