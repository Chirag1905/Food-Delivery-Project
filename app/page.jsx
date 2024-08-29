"use client";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import { useForm } from "react-hook-form";
import react, { useEffect, useState } from "react";

export default function Home() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,  
    formState: { errors },
  } = useForm();

  const [locations, setLocations] = useState([]);
  const [showLocations, setShowLocations] = useState(false);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    let response = await fetch(`http://localhost:3000/api/customer/locations`);
    response = await response.json();
    response.success ? setLocations(response.result) : null;
  };

  const handleListItem=(item)=>{
    setValue("place", item);  
    setShowLocations(false)
  }
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <CustomerHeader />
      <div
        className="h-[230px] p-[30px] bg-black bg-opacity-70 bg-blend-multiply text-white"
        style={{
          backgroundImage:
            "url('https://a.storyblok.com/f/88809/1150x450/30a9c4f9a6/igevia_header_fastfood01_450.jpg')",
        }}
      >
        <h1 className="text-center">Food Delivery App</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white p-[#5px] border rounded m-auto w-3/5 text-black">
            <input
              type="text"
              placeholder="Select Place"
              className="w-1/1 h-[40px] w-1/4 border-none pl-4 outline-none"
              {...register("place", { required: "Place is required" })}
              onClick={() => setShowLocations(true)}
            />
            {errors.place && <p>{errors.place.message}</p>}
            <ul className="text-black text-left absolute bg-white ">
              {showLocations && locations.map((item, index) => (
                <li className="cursor-pointer w-[#180px] p-1" key={index} onClick={()=>handleListItem(item)}>
                  {item}
                </li>
              ))}
            </ul>
            <input
              type="text"
              className="w-1/1 h-[40px] w-1/4 border border-l-2 pl-4 outline-none"
              placeholder="Enter food or restaurant name"
              {...register("food", { required: "Food name is required" })}
            />
            {errors.food && <p>{errors.food.message}</p>}
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
      <RestaurantFooter />
    </>
  );
}
