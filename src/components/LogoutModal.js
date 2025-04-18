import React from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Input from "./Input";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ClickOutHandler from "react-clickout-handler";
import { useNavigate } from "react-router-dom";

export default function LogoutModal() {
  const {
    darkTheme,
    isLogoutModalOpen,
    setIsLogoutModalOpen,
    loading,
    setLoading,
    setUser,
  } = useContext(UserContext);

  const navigate = useNavigate();

  async function logoutFun() {
    setLoading(false);
    const url = `${process.env.REACT_APP_API_URL}/logout`;
    axios
      .post(url, null, { withCredentials: true })
      .then((res) => {
        setLoading(true);
        setUser({});
        toast.success("Successfully logout");
        // setToggleDropDown(false);
        setIsLogoutModalOpen(false);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
    setLoading(false);
  }
  return (
    <>
      {isLogoutModalOpen && (
        <>
          <div
            className={`w-screen h-screen fixed z-50 top-0 left-0 backdrop-blur-xl flex items-center justify-center`}
          >
            <ClickOutHandler onClickOut={() => setIsLogoutModalOpen(false)}>
              <div
                className={`md:w-[500px] w-[280px] mx-4 p-4 rounded-xl border ${
                  darkTheme
                    ? "bg-gray-700 border-gray-500"
                    : "bg-gray-200 border-gray-50"
                }`}
              >
                <h3 className="text-center mb-2">You want to logout?</h3>
                <div className="flex gap-0.5 items-center justify-center">
                  <button
                    // disabled={loading}
                    className={`py-1 px-4 rounded-xl transition-all ${
                      darkTheme
                        ? "bg-gray-600 hover:bg-gray-500 active:bg-gray-700"
                        : "bg-gray-100 hover:bg-gray-50 active:bg-gray-300"
                    }`}
                    onClick={() => logoutFun()}
                  >
                    Yes
                  </button>
                  <button
                    // disabled={loading}
                    className={`py-1 px-4 rounded-xl transition-all ${
                      darkTheme
                        ? "bg-gray-600 hover:bg-gray-500 active:bg-gray-700"
                        : "bg-gray-100 hover:bg-gray-50 active:bg-gray-300"
                    }`}
                    onClick={() => setIsLogoutModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </ClickOutHandler>
          </div>
        </>
      )}
    </>
  );
}
