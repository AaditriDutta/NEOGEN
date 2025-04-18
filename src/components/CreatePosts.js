import { UserIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import AnimationWrapper from "./AnimationWrapper";

export default function CreatePosts() {
  const { darkTheme, user, isNewPostModalOpen, setIsNewPostModalOpen } =
    useContext(UserContext);
  return (
    <AnimationWrapper>
      <div className="p-4 mt-4">
        <div
          className={`flex items-center p-2 rounded-xl ${
            darkTheme ? "bg-gray-700" : "bg-gray-300"
          }`}
        >
          {user.email && <UserIcon className="w-6 h-6" />}
          <form className="flex-grow">
            <input
              onClick={() => setIsNewPostModalOpen(!isNewPostModalOpen)}
              // onFocus={()=> setIsNewPostModalOpen(!isNewPostModalOpen)}
              type="text"
              placeholder="Create post"
              className={`w-full px-3 py-1 rounded-xl outline-none ${
                darkTheme ? "bg-gray-700" : "bg-gray-300"
              }`}
            />
          </form>
        </div>
      </div>
    </AnimationWrapper>
  );
}
