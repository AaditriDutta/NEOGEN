import React from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext"; // global user state
import Input from "./Input"; // custom input component
import { useState } from "react";
import axios from "axios"; // HTTP requests
import { toast } from "react-hot-toast"; // toast notifications
import ClickOutHandler from "react-clickout-handler"; // handle outside clicks
import Button from "./Button"; // custom button component
import { CubeTransparentIcon } from "@heroicons/react/24/outline"; // icon

export default function AuthModal() {
  const {
    darkTheme, // dark/light mode
    setIsAuthModalOpen, // close modal
    isAuthModalOpen, // modal visibility
    isLogin, // login/register toggle
    setIsLogin, // toggle setter
    loading, // global loading state
    setLoading,
    user,
    setUser, // set logged-in user
  } = useContext(UserContext);

  // local form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aPassword, setAPassword] = useState(""); // confirm password

  // registration handler
  async function handleRegister(e) {
    e.preventDefault();
    setLoading(false);
    if (email === "" && username === "" && password === "" && aPassword === "") {
      setLoading(false);
      toast.error("All fields are required");
    } else if (password.length >= 6 && password === aPassword) {
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}/register`;
      const data = { username, email, password };
      await axios
        .post(url, data, { withCredentials: true }) // include cookies
        .then((res) => {
          if (res.data.errorMsg) {
            toast.error(res.data.errorMsg);
            setLoading(false);
          } else {
            setUser(res.data); // save user
            setIsAuthModalOpen(false); // close modal
            setLoading(false);
            toast.success("Successfully created");
            // clear form fields
            setUsername("");
            setEmail("");
            setPassword("");
            setAPassword("");
          }
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
        });
    } else {
      toast.error("password not matched Or min 6 letter required");
      setIsAuthModalOpen(true);
      setLoading(false);
    }
  }

  // login handler
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(false);
    if (email === "" && password === "") {
      setLoading(false);
      toast.error("Email and password are required");
    } else if (password.length >= 6) {
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}/login`;
      const data = { email, password };
      await axios
        .post(url, data, { withCredentials: true })
        .then((res) => {
          if (res.data.errorMsg) {
            toast.error(res.data.errorMsg);
            setLoading(false);
          } else {
            setUser(res.data);
            setIsAuthModalOpen(false);
            setLoading(false);
            toast.success("Successfully login");
            setEmail("");
            setPassword("");
          }
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
        });
    } else {
      toast.error("Password should be min 6 letter");
      setLoading(false);
    }
  }

  return (
    <>
      {/* modal background */}
      <div className={`w-screen h-screen fixed z-50 top-0 left-0 backdrop-blur-xl flex items-center justify-center`}>
        <ClickOutHandler onClickOut={() => setIsAuthModalOpen(false)}> {/* close on outside click */}
          <div
            className={`md:w-[500px] w-[318px] mx-4 p-4 rounded-xl border ${darkTheme
              ? "bg-gray-700 border-gray-500"
              : "bg-gray-200 border-gray-50"
            }`}
          >
            {/* title icon */}
            <div className="flex items-center gap-1 mb-3">
              <CubeTransparentIcon className="w-6 h-6" />
            </div>

            {/* form start */}
            <form className="flex flex-col gap-0.5">
              {/* login inputs */}
              {isLogin === "login" && (
                <>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              )}

              {/* register inputs */}
              {isLogin === "register" && (
                <>
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Password again"
                    value={aPassword}
                    onChange={(e) => setAPassword(e.target.value)}
                  />
                </>
              )}

              {/* submit button */}
              <Button
                onClick={
                  isLogin === "login"
                    ? (e) => handleLogin(e)
                    : (e) => handleRegister(e)
                }
                type="submit"
              >
                {isLogin === "login" ? "Log In" : "Sign Up"}
              </Button>

              {/* login/register switch */}
              {isLogin === "login" && (
                <div className="text-center my-2 text-[14px]">
                  New to NEOGEN ?{" "}
                  <button
                    className={`${darkTheme ? "text-teal-400" : "text-blue-500"}`}
                    onClick={() => setIsLogin("register")}
                  >
                    Sign Up
                  </button>
                </div>
              )}
              {isLogin === "register" && (
                <div className="text-center my-2 text-[14px]">
                  Already have an account ?{" "}
                  <button
                    className={`${darkTheme ? "text-teal-400" : "text-blue-500"}`}
                    onClick={() => setIsLogin("login")}
                  >
                    Log in
                  </button>
                </div>
              )}
            </form>
            {/* form end */}
          </div>
        </ClickOutHandler>
      </div>
    </>
  );
}

/**
 * AuthModal.jsx
 * ---------------------
 * 🔐 Authentication modal component (login + register)
 * 
 * ✅ Uses UserContext for global auth + theme state
 * ✅ Controlled form inputs for username, email, password
 * ✅ Handles register & login with form validation + API calls (axios)
 * ✅ Shows toast messages for errors and success
 * ✅ Supports dark/light mode styling
 * ✅ Uses ClickOutHandler to close modal on outside click
 * ✅ Toggles between login and register UI dynamically
 */
