"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "../_components/Header";
import { toast } from "react-toastify";

const DeliveryPartner = () => {
  const router = useRouter();
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    setError: setLoginError,
    clearErrors: clearLoginErrors,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    setError: setSignupError,
    clearErrors: clearSignupErrors,
    formState: { errors: signupErrors },
  } = useForm();

  const handleLogin = async (data) => {
    let response = await axios.post(
      "http://localhost:3000/api/deliverypartner",
      {
        contact: data?.loginMobile,
        password: data?.loginpassword,
        login: true,
      }
    );

    response = await response?.data;
    response?.success
      ? (() => {
          const { result } = response;
          delete result?.password;
          localStorage?.setItem("delivery", JSON.stringify(result));
          router.push("/deliverydashboard");
        })()
      : toast.error(
          "Failed to Login. Please try again with valid mobile and password"
        );
  };

  const handleRegister = async (data) => {
    if (data?.registerPassword !== data?.c_password) {
      setSignupError("c_password", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    } else {
      clearSignupErrors("c_password");
    }

    let response = await axios.post(
      "http://localhost:3000/api/deliverypartner",
      {
        name: data?.name,
        contact: data?.registerMobile,
        password: data?.registerPassword,
        city: data?.city,
        address: data?.address,
      }
    );

    response = await response?.data;
    response?.success
      ? (() => {
          toast.success("Delivery Registration Successful");
          const { result } = response;
          delete result.password;
          localStorage?.setItem("delivery", JSON.stringify(result));
          router.push("/deliverydashboard");
        })()
      : toast.error("Delivery Registration Failed");
  };

  useEffect(() => {
    const delivery =
      localStorage?.getItem("delivery") &&
      JSON.parse(localStorage?.getItem("delivery"));
    delivery ? router.push("/deliverydashboard") : null;
  }, []);
  return (
    <>
      <Header />
      <h1 className="mb-3 mt-3 text-center text-3xl font-extrabold text-gray-900">
        <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Delivery
        </span>{" "}
        Partner
      </h1>
      <div className="flex flex-row">
        <div className="w-6/12 mt-3 mb-3 p-4 m-auto border border-gray-300 rounded-3xl bg-gray-100">
          <h1 className="mb-3 mt-3 text-center text-3xl font-extrabold text-gray-900">
            <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Login
            </span>{" "}
          </h1>
          <form
            className="m-auto flex flex-col w-1/2"
            onSubmit={handleLoginSubmit(handleLogin)}
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
                {...registerLogin("loginMobile", {
                  required: "Mobile Number is required",
                })}
              />
              {loginErrors.loginMobile && (
                <p>{loginErrors.loginMobile.message}</p>
              )}
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
                {...registerLogin("loginpassword", {
                  required: "Password is required",
                })}
              />
              {loginErrors.loginpassword && (
                <p>{loginErrors.loginpassword.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              SignIn
            </button>
          </form>
        </div>
        <div className="w-6/12  mt-3 mb-3 p-4 m-auto border border-gray-300 rounded-3xl bg-gray-100">
          <h1 className="mb-3 mt-3 text-center text-3xl font-extrabold text-gray-900">
            <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Registration
            </span>{" "}
          </h1>
          <form
            className="m-auto flex flex-col w-1/2"
            onSubmit={handleSignupSubmit(handleRegister)}
          >
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="company"
                  className="block mb-2 text-sm font-medium text-gray-900 text-left"
                >
                  User Name
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Your Restaurant Name"
                  {...registerSignup("name", { required: "Name is required" })}
                />
                {signupErrors.name && <p>{signupErrors.name.message}</p>}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 text-left"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="123-45-678"
                  pattern="[0-9]{10}"
                  {...registerSignup("registerMobile", {
                    required: "Mobile Number is required",
                  })}
                />
                {signupErrors.registerMobile && (
                  <p>{signupErrors.registerMobile.message}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 text-left"
              >
                Password
              </label>
              <input
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="•••••••••"
                {...registerSignup("registerPassword", {
                  required: "Password is required",
                })}
              />
              {signupErrors.registerPassword && (
                <p>{signupErrors.registerPassword.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-gray-900 text-left"
              >
                Confirm password
              </label>
              <input
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="•••••••••"
                {...registerSignup("c_password", {
                  required: "Confirm Password is required",
                })}
              />
              {signupErrors.c_password && (
                <p>{signupErrors.c_password.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 text-left"
              >
                City Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Your City Name"
                {...registerSignup("city", {
                  required: "City Name is required",
                })}
              />
              {signupErrors.city && <p>{signupErrors.city.message}</p>}
            </div>
            <div className="mb-6">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 text-left"
              >
                Address
              </label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Your Restaurant Address"
                {...registerSignup("address", {
                  required: "Address is required",
                })}
              />
              {signupErrors.address && <p>{signupErrors.address.message}</p>}
            </div>

            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  required
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 text-left"
              >
                I agree with the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  terms and conditions
                </a>
                .
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeliveryPartner;
