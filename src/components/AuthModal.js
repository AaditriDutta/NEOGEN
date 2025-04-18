import React from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Input from "./Input";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ClickOutHandler from "react-clickout-handler";
import Button from "./Button";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";

export default function AuthModal() {
  const {
    darkTheme,
    setIsAuthModalOpen,
    isAuthModalOpen,
    isLogin,
    setIsLogin,
    loading,
    setLoading,
    user,
    setUser,
  } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aPassword, setAPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(false);
    if (
      email === "" &&
      username === "" &&
      password === "" &&
      aPassword === ""
    ) {
      setLoading(false);
      toast.error("All fields are required");
    } else if (password.length >= 6 && password === aPassword) {
      setLoading(true);
      // const url =
      //   isLogin === "login"
      //     ? `${process.env.REACT_APP_API_URL}/login`
      //     : `${process.env.REACT_APP_API_URL}/register`;
      // const data =
      //   isLogin === "login"
      //     ? { email, password }
      //     : { username, email, password };
      const url = `${process.env.REACT_APP_API_URL}/register`;
      const data = { username, email, password };
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
            toast.success("Successfully created");
            setUsername("");
            setEmail("");
            setPassword("");
            setAPassword("");
            setIsAuthModalOpen(false);
          }
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
        });
      setLoading(false);
    } else {
      toast.error("password not matched Or min 6 letter required");
      setIsAuthModalOpen(true);
      setLoading(false);
    }
    setLoading(false);
  }
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
      setLoading(false);
    } else {
      toast.error("Password should be min 6 letter");
      setLoading(false);
    }
  }
  return (
    <>
      <div
        className={`w-screen h-screen fixed z-50 top-0 left-0 backdrop-blur-xl flex items-center justify-center`}
      >
        <ClickOutHandler onClickOut={() => setIsAuthModalOpen(false)}>
          <div
            className={`md:w-[500px] w-[318px] mx-4 p-4 rounded-xl border ${darkTheme
                ? "bg-gray-700 border-gray-500"
                : "bg-gray-200 border-gray-50"
              }`}
          >
            {/* <h3 className="text-center mb-2">{isLogin==="login" ? "Log In" : "Sign Up"}</h3> */}
            <div className="flex items-center gap-1 mb-3">
              <CubeTransparentIcon className="w-6 h-6" />
              {/* <h2>Devi</h2> */}
            </div>
            <form className="flex flex-col gap-0.5">
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
              <Button
                // disabled={loading}
                onClick={
                  isLogin === "login"
                    ? (e) => handleLogin(e)
                    : (e) => handleRegister(e)
                }
                type="submit"
              >
                {isLogin === "login" ? "Log In" : "Sign Up"}
              </Button>

              {isLogin === "login" && (
                <div className="text-center my-2 text-[14px]">
                  New to NEOGEN ?{" "}
                  <button
                    className={`${darkTheme ? "text-teal-400" : "text-blue-500"
                      }`}
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
                    className={`${darkTheme ? "text-teal-400" : "text-blue-500"
                      }`}
                    onClick={() => setIsLogin("login")}
                  >
                    Log in
                  </button>
                </div>
              )}
            </form>
          </div>
        </ClickOutHandler>
      </div>
    </>
  );
}
