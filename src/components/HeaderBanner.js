import { ComputerDesktopIcon } from "@heroicons/react/24/solid";
import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { CodeBracketIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import AnimationWrapper from "./AnimationWrapper";

export default function HeaderBanner() {
  const { darkTheme, user } = useContext(UserContext);
  return (
    <AnimationWrapper>
      <div className="relative">
        <div>
          <img src="./headerBanner.jpg" alt="headerBanner" className="rounded-xl" />
        </div>
        <div
          className={`absolute -bottom-12 p-4 ml-4 rounded-full ${
            darkTheme ? "bg-slate-700" : "bg-slate-300"
          }`}
        >
          <CodeBracketIcon className="w-8 h-8" />
        </div>
      </div>
      <div className="ml-24">
        <h3 className="font-[500] text-lg">
          NEOGEN for developers
        </h3>
        <span>NEOGEN/<span className="text-pink-500">{user.username.split(" ")[0]}</span></span>
      </div>
    </AnimationWrapper>
  );
}
