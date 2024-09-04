"use client";
import { useState, useEffect } from "react";
import AddFoodItem from "@/app/_components/AddFoodItem";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import FoodItemList from "@/app/_components/FoodItemList";

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <RestaurantHeader />
      <div className="m-2">
        <button onClick={() => setAddItem(true)} className="m-2">
          Add Food
        </button>
        <button onClick={() => setAddItem(false)} className="m-2">
          Dashboard
        </button>
      </div>
      {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
    </>
  );
};

export default Dashboard;
