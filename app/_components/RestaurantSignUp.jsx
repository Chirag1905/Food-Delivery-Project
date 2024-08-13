import React from "react";

const RestaurantSignUp = () => {
  return (
    <>
      <h3>Signup</h3>
      <div className="input-wrapper">
        <input
          type="text"
          name=""
          placeholder="Enter email id"
          className="input-field"
        />
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          name=""
          placeholder="Enter password"
          className="input-field"
        />
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          name=""
          placeholder="Confirm password"
          className="input-field"
        />
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          name=""
          placeholder="Enter resaurant name"
          className="input-field"
        />
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          name=""
          placeholder="Enter city"
          className="input-field"
        />
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          name=""
          placeholder="Enter full address"
          className="input-field"
        />
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          name=""
          placeholder="Enter contact number"
          className="input-field"
        />
      </div>
      <div className="input-wrapper">
        <button className="button">SignUp</button>
      </div>
    </>
  );
};

export default RestaurantSignUp;
