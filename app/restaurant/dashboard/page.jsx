"use client";
import { useState, useEffect } from "react";
import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";
import Header from "@/app/_components/Header";

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
      <Header/>
      <div className="m-2">
        <button
          type="button"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => setAddItem(true)}
        >
          Add Product
        </button>
        <button
          type="button"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => setAddItem(false)}
        >
          Dashboard
        </button>
      </div>
      {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
    </>
  );
};

export default Dashboard;
