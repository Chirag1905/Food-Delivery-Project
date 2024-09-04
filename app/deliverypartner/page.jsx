"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DeliveryHeader from "../_components/DeliveryHeader";
import axios from "axios";

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
      : alert(
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
          alert("Registration Successful");
          const { result } = response;
          delete result.password;
          localStorage?.setItem("delivery", JSON.stringify(result));
          router.push("/deliverydashboard");
        })()
      : alert("Registration Failed");
  };

  useEffect(() => {
    const delivery =
      localStorage?.getItem("delivery") &&
      JSON.parse(localStorage?.getItem("delivery"));
    delivery ? router.push("/deliverydashboard") : null;
  }, []);
  return (
    <div>
      <DeliveryHeader />
      <h1>Delivery Partner</h1>

      <div className="auth-container flex">
        <div className="login-wrapper h-[400px] w-1/2 border border-black m-3 p-5 text-center">
          <h3>Login</h3>
          <form
            className="flex flex-col"
            onSubmit={handleLoginSubmit(handleLogin)}
          >
            <div className="m-[10px]">
              <input
                type="text"
                className="w-[200px] h-[30px]"
                placeholder="Enter Mobile Number"
                {...registerLogin("loginMobile", {
                  required: "Mobile Number is required",
                })}
              />
              {loginErrors.loginMobile && (
                <p>{loginErrors.loginMobile.message}</p>
              )}
            </div>
            <div className="m-[10px]">
              <input
                type="password"
                className="w-[200px] h-[30px]"
                placeholder="Enter Your Password"
                {...registerLogin("loginpassword", {
                  required: "Password is required",
                })}
              />
              {loginErrors.loginpassword && (
                <p>{loginErrors.loginpassword.message}</p>
              )}
            </div>
            <div className="m-[10px]">
              <button className="w-[200px] h-[30px]">SignIn</button>
            </div>
          </form>
        </div>

        <div className="signup-wrapper h-[400px] w-1/2 border border-black m-3 p-5 text-center">
          <h3>Registration</h3>
          <form
            className="flex flex-col"
            onSubmit={handleSignupSubmit(handleRegister)}
          >
            <div className="m-[10px]">
              <input
                type="text"
                className="w-[200px] h-[30px]"
                placeholder="Enter Your Name"
                {...registerSignup("name", { required: "Name is required" })}
              />
              {signupErrors.name && <p>{signupErrors.name.message}</p>}
            </div>
            <div className="m-[10px]">
              <input
                type="number"
                className="w-[200px] h-[30px]"
                placeholder="Enter Mobile Number"
                {...registerSignup("registerMobile", {
                  required: "Mobile Number is required",
                })}
              />
              {signupErrors.registerMobile && (
                <p>{signupErrors.registerMobile.message}</p>
              )}
            </div>
            <div className="m-[10px]">
              <input
                type="password"
                className="w-[200px] h-[30px]"
                placeholder="Enter Your Password"
                {...registerSignup("registerPassword", {
                  required: "Password is required",
                })}
              />
              {signupErrors.registerPassword && (
                <p>{signupErrors.registerPassword.message}</p>
              )}
            </div>
            <div className="m-[10px]">
              <input
                type="password"
                className="w-[200px] h-[30px]"
                placeholder="Enter Confirm Password"
                {...registerSignup("c_password", {
                  required: "Confirm Password is required",
                })}
              />
              {signupErrors.c_password && (
                <p>{signupErrors.c_password.message}</p>
              )}
            </div>
            <div className="m-[10px]">
              <input
                type="text"
                className="w-[200px] h-[30px]"
                placeholder="Enter City Name"
                {...registerSignup("city", {
                  required: "City Name is required",
                })}
              />
              {signupErrors.city && <p>{signupErrors.city.message}</p>}
            </div>
            <div className="m-[10px]">
              <textarea
                className="w-[200px] h-[30px]"
                placeholder="Enter Your Address"
                {...registerSignup("address", {
                  required: "Address is required",
                })}
              />
              {signupErrors.address && <p>{signupErrors.address.message}</p>}
            </div>

            <div className="m-[10px]">
              <button className="w-[200px] h-[30px]">SignUp</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartner;
