"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditFoodItem = (props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    handleLoadFoodItem();
  }, []);

  const handleLoadFoodItem = async () => {
    let response = await axios.get(
      `http://localhost:3000/api/restaurant/foods/edit/${props?.params?.id}`
    );
    response = await response?.data;
    response?.success
      ? (setValue("food_name", response?.result?.name),
        setValue("price", response?.result?.price),
        setValue("path", response?.result?.img_path),
        setValue("description", response?.result?.description))
      : null;
  };

  const handleEditFoodItem = async (data) => {
    let response = await axios.put(
      `http://localhost:3000/api/restaurant/foods/edit/${props?.params?.id}`,
      {
        name: data?.food_name,
        price: data?.price,
        img_path: data?.path,
        description: data?.description,
      }
    );
    response = await response?.data;
    response?.success
      ? (router.push("/restaurant/dashboard"),
        toast.info("Data is updated successfully"))
      : toast.error("Data is not updated");
  };
  return (
    <>
      <div className="w-6/12  mt-5 p-4 m-auto border border-gray-300 rounded-3xl bg-gray-100">
        <form
          className="mt-10 m-auto flex flex-col w-4/5 space-y-8"
          onSubmit={handleSubmit(handleEditFoodItem)}
        >
          <h1 className="mb-5 text-4xl font-extrabold text-gray-900">
            <span className="text-5xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Update Food
            </span>{" "}
            Details
          </h1>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-gray-900 text-left"
              >
                Food Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Food Name"
                {...register("food_name", {
                  required: "Food Name is required",
                })}
              />
              {errors?.food_name && <p>{errors?.food_name?.message}</p>}
            </div>
            <div>
              <label
                htmlFor="website"
                className="block mb-2 text-sm font-medium text-gray-900 text-left"
              >
                Price
              </label>
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Price"
                {...register("price", { required: "Password is required" })}
              />
              {errors?.price && <p>{errors?.price?.message}</p>}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="website"
              className="block mb-2 text-sm font-medium text-gray-900 text-left"
            >
              Image URL
            </label>
            <input
              type="url"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter URL Path"
              {...register("path", {
                required: "Image Path is required",
              })}
            />
            {errors?.path && <p>{errors?.path?.message}</p>}
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 text-left"
            >
              Description
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Your Food Description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors?.description && <p>{errors?.description?.message}</p>}
          </div>
          <div className="flex flex-row justify-center items-center">
            <button
              type="submit"
              className="m-1 text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Update
            </button>
            <button
              type="submit"
              className="m-1 text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={() => router.push("/restaurant/dashboard")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditFoodItem;
