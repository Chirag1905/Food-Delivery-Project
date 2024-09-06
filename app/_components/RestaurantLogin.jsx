"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const RestaurantLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let response = await axios.post("http://localhost:3000/api/restaurant", {
      email: data?.email,
      password: data?.password,
      login: true,
    });
    response = await response?.data;
    response?.success
      ? (() => {
          toast.success("Login Successfully");
          const { result } = response;
          delete result?.password;
          localStorage?.setItem("restaurantUser", JSON.stringify(result));
          router.push("/restaurant/dashboard");
        })()
      : toast.error("Login Failed");
  };

  return (
    <>
      <h1 className="mt-5 mb-5 text-4xl font-extrabold text-gray-900">
        <span className="text-5xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Dine In
        </span>{" "}
        Login
      </h1>
      <form
        className="m-auto flex flex-col w-1/4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          for="input-group-1"
          className="block mb-2 text-sm font-medium text-gray-900 text-left"
        >
          Your Email
        </label>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="name@hungryhub.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <label
          for="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 text-left"
        >
          Password
        </label>
        <div className="flex mb-4">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>
          <input
            type="password"
            className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 "
            placeholder="•••••••••"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default RestaurantLogin;
