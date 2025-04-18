import {
  ChatBubbleLeftEllipsisIcon,
  BellIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  UserIcon,
  FaceSmileIcon,
  CubeTransparentIcon,
  ArrowRightStartOnRectangleIcon,
  HomeIcon
} from "@heroicons/react/24/outline";
// import {FaceSmileIcon} from "@heroicons/react/24/solid";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../UserContext";
import Switch, { switchClasses } from "@mui/joy/Switch";
import Button from "./Button";
import { Link } from "react-router-dom";
import SearchList from "./SearchList";
import ClickOutHandler from "react-clickout-handler";
// import ClickOutHandler from "react-clickout-handler";
export default function Header() {
  const {
    darkTheme,
    setDarkTheme,
    isAuthModalOpen,
    setIsAuthModalOpen,
    setIsLogin,
    user,
    setIsLogoutModalOpen,
    isLogoutModalOpen,
    isNewPostModalOpen,
    setIsNewPostModalOpen,
    setIsCommunity,
    isCommunity,
    setIsDelete,
    setCommentId,
    setPostParamsId,
  } = useContext(UserContext);

  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [postDropDown, setPostDropDown] = useState(false);

  // CLOSE DROPDOWN ON OUTSIDE
  const dropdown = useRef(null);

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!toggleDropDown) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setToggleDropDown(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [toggleDropDown]);

  function closeModal() {
    setIsDelete(false);
    setCommentId("");
    setPostParamsId("");
  }
  return (
    <div className="sticky z-30 top-0">
      <div
        className={`h-12 flex relative top-0 z-30 items-center justify-around gap-2 px-4 backdrop-blur-xl`}
      >
        <Link to="/" onClick={() => closeModal()}>
          <CubeTransparentIcon
            className={
              "rounded-full w-7 h-7 transition-all hover:rotate-180 duration-700 ease-out"
            }
          />
        </Link>
        <div className="flex items-center gap-2 flex-grow">
          <SearchList />

          {user.email && (
            <div className="flex gap-1 items-center">
              {/* <div
                className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                  +darkTheme
                    ? "hover:bg-gray-600 active:bg-gray-300"
                    : "hover:bg-gray-300 active:bg-gray-600"
                }`}
              >
                <ChatBubbleLeftEllipsisIcon className={"h-5 w-5"} />
              </div>
              <div
                className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                  +darkTheme
                    ? "hover:bg-gray-600 active:bg-gray-300"
                    : "hover:bg-gray-300 active:bg-gray-600"
                }`}
              >
                <BellIcon className={"h-5 w-5"} />
              </div> */}
              <ClickOutHandler onClickOut={() => setPostDropDown(false)}>
                <div
                  onClick={() => setPostDropDown(!postDropDown)}
                  className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                    +darkTheme
                      ? "hover:bg-gray-600 active:bg-gray-300"
                      : "hover:bg-gray-300 active:bg-gray-600"
                  }`}
                >
                  <PlusIcon className={"h-5 w-5"} />
                </div>
                {postDropDown && (
                  <div
                    className={`absolute z-50 top-12 py-2 mx-2 min-w-52 rounded-xl left-[16.1%] ${
                      darkTheme ? "bg-gray-600" : "bg-gray-200"
                    }`}
                  >
                    <div
                      onClick={() => {
                        setIsNewPostModalOpen(!isNewPostModalOpen);
                        setPostDropDown(false);
                      }}
                      className={`transition-all pl-3 py-1 cursor-pointer flex items-center gap-1 ${
                        darkTheme ? "hover:bg-gray-700" : "hover:bg-slate-300"
                      }`}
                    >
                      <PlusIcon className="w-4 h-4" />
                      Create post
                    </div>
                    {/* <div
                      onClick={() => {
                        setIsCommunity(!isCommunity);
                        setPostDropDown(false);
                      }}
                      className={`pl-3 py-1 cursor-pointer ${
                        darkTheme ? "hover:bg-gray-700" : "hover:bg-slate-300"
                      }`}
                    >
                      Create new Community
                    </div> */}
                  </div>
                )}
              </ClickOutHandler>
            </div>
          )}

          {!user.email && (
            <div className="hidden sm:block">
              <div className="flex gap-1">
                <Button
                  onClick={() => {
                    setIsLogin("login");
                    setIsAuthModalOpen(true);
                  }}
                  className={`transition-all ${
                    darkTheme
                      ? "hover:bg-gray-500 active:bg-gray-300"
                      : "hover:bg-gray-200 active:bg-gray-400"
                  }`}
                  // outlineDesign
                >
                  Log In
                </Button>
                <Button
                  onClick={() => {
                    setIsLogin("register");
                    setIsAuthModalOpen(true);
                  }}
                  className={`transition-all ${
                    darkTheme
                      ? "hover:bg-gray-500 active:bg-gray-300"
                      : "hover:bg-gray-200 active:bg-gray-400"
                  }`}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          )}
        </div>

        <div
          ref={dropdown}
          onClick={() => setToggleDropDown(!toggleDropDown)}
          className={`border rounded-xl flex items-center px-2 py-1 transition-all ${
            darkTheme
              ? "border-gray-500 hover:bg-gray-600 active:bg-gray-300"
              : "border-gray-300 hover:bg-gray-300 active:bg-gray-600"
          }`}
        >
          {user.email && <UserIcon className="w-4 h-4" />}
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </div>
      </div>

      {toggleDropDown && (
        //  <ClickOutHandler onClickOut={() => setToggleDropDown(false)}>
        <div
          // ref={dropdown}
          onClick={(e) => e.stopPropagation()}
          className={`absolute z-50 top-12 right-0 py-2 mx-2 min-w-52 rounded-xl ${
            darkTheme ? "bg-gray-600" : "bg-gray-200"
          }`}
        >
          <div
            className={`flex items-center gap-2 pl-3 py-1 transition-all ${
              darkTheme ? "hover:bg-gray-700" : "hover:bg-slate-300"
            }`}
          >
            light
            <Switch
              checked={darkTheme}
              onChange={() => setDarkTheme(!darkTheme)}
              sx={(theme) => ({
                [theme.getColorSchemeSelector("dark")]: {
                  "--Switch-trackBackground": "rgba(255 255 255 / 0.4)",
                },
                [`&.${switchClasses.checked}`]: {
                  "--Switch-trackBackground": "#0dda",
                  "&:hover": {
                    "--Switch-trackBackground": "#0dd",
                  },
                },
              })}
            />
            dark
          </div>
          {!user.email ? (
            <div
              onClick={() => {
                setIsAuthModalOpen(!isAuthModalOpen);
                setToggleDropDown(false);
              }}
              className={`transition-all pl-3 py-1 cursor-pointer ${
                darkTheme ? "hover:bg-gray-700" : "hover:bg-slate-300"
              }`}
            >
              Login/signup
            </div>
          ) : (
            <>
              <Link
                to={"/"}
                onClick={() => {
                  setToggleDropDown(false);
                }}
                className={`transition-all pl-3 py-1 cursor-pointer flex items-center gap-1 ${
                  darkTheme ? "hover:bg-gray-700" : "hover:bg-slate-300"
                }`}
              >
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
              <Link
                to={"/devi/profile"}
                onClick={() => {
                  setToggleDropDown(false);
                }}
                className={`transition-all pl-3 py-1 cursor-pointer flex items-center gap-1 ${
                  darkTheme ? "hover:bg-gray-700" : "hover:bg-slate-300"
                }`}
              >
                <UserIcon className="w-4 h-4" />
                Profile
              </Link>
              <div
                onClick={() => {
                  setIsLogoutModalOpen(!isLogoutModalOpen);
                  setToggleDropDown(false);
                }}
                className={`transition-all pl-3 py-1 cursor-pointer flex items-center gap-1 ${
                  darkTheme ? "hover:bg-gray-700" : "hover:bg-slate-300"
                }`}
              >
                <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
                Logout
              </div>
            </>
          )}
        </div>
        // </ClickOutHandler>
      )}
    </div>
  );
}
