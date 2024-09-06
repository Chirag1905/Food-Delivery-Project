"use client";
import React, { useState, useEffect } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import UserSignUp from "../_components/UserSignUp";
import UserLogin from "../_components/UserLogin";
import { useRouter } from "next/navigation";

const UserAuth = () => {
  const [login, setLogin] = useState(true);
  const [searchParams, setSearchParams] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    if (router.query) {
      setSearchParams(router.query);
    }
  }, [router.query]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="text-center">
        <Header />
        {login ? (
          <UserLogin redirect={searchParams} />
        ) : (
          <UserSignUp redirect={searchParams} />
        )}
        <div>
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login ? (
              <p className="ms-2 text-sm font-medium text-gray-900 text-left">
                Do not have an account?
                <span className="text-blue-600 hover:underline"> SignUp</span>
              </p>
            ) : (
              <p className="ms-2 text-sm font-medium text-gray-900 text-left">
                Already have an account?
                <span className="text-blue-600 hover:underline"> SignIn</span>
              </p>
            )}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserAuth;
