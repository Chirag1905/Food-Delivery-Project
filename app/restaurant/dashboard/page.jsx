"use client";
import { useState, useEffect } from "react";
import AddFoodItem from "@/app/_components/AddFoodItem";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import React from "react";
import { connectionStr } from "@/app/lib/db";
import FoodItemList from "@/app/_components/FoodItemList";

const Dashboard = () => {
  // console.log("🚀 ~ connectToDatabase ~ connectionStr:", connectionStr);
  const [addItem, setAddItem] = useState(false);
  return (
    <>
      <RestaurantHeader />
      <button onClick={() => setAddItem(true)} className="m-2">
        Add Food
      </button>
      <button onClick={() => setAddItem(false)} className="m-2">
        Dashboard
      </button>
      {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
    </>
  );
};

export default Dashboard;
