import Image from "next/image";
import React, { useState, useEffect } from "react";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState(undefined);
  
  useEffect(() => {
    loadFoodItems();
  }, []);

  let resto_id;
  const resturantData = JSON.parse(localStorage.getItem("restaurantUser"));
  resturantData ? (resto_id = resturantData.result._id) : "";

  const loadFoodItems = async () => {
    let response = await fetch(
        `http://localhost:3000/api/restaurant/foods/${resto_id}`
    );
    response = await response.json();
    if (response.success) {
      setFoodItems(response.result);
    } else {
      console.error("Error fetching food items");
    }
};
  return (
    <>
      <div>FoodItemList</div>
      <table className="border border-[#000] border-collapse p-2">
        <thead className="border border-[#000] border-collapse p-2">
          <tr>
            <td className="border border-[#000] border-collapse p-2">S.N</td>
            <td className="border border-[#000] border-collapse p-2">Name</td>
            <td className="border border-[#000] border-collapse p-2">Price</td>
            <td className="border border-[#000] border-collapse p-2">
              Description
            </td>
            <td className="border border-[#000] border-collapse p-2">Image</td>
            <td className="border border-[#000] border-collapse p-2">
              Operations
            </td>
          </tr>
        </thead>
        <tbody>
        {foodItems &&
            foodItems.map((item, key) => (
              <tr key={key}>
                <td className="border border-[#000] border-collapse p-2">
                  {key + 1}
                </td>
                <td className="border border-[#000] border-collapse p-2">
                  {item.name}
                </td>
                <td className="border border-[#000] border-collapse p-2">
                  {item.price}
                </td>
                <td className="border border-[#000] border-collapse p-2">
                  {item.description}
                </td>
                <td className="border border-[#000] border-collapse p-2">
                  <Image src={item.img_path} alt={item.name} width={50} height={50} />
                </td>
                <td>
                  <button className="border border-[#000] border-collapse p-2 m-2">
                    Edit
                  </button>
                  <button className="border border-[#000] border-collapse p-2 m-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default FoodItemList;
