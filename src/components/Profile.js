import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import Button from "./Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import AnimationWrapper from "./AnimationWrapper";
import { UserIcon } from "@heroicons/react/24/outline";

export default function Profile() {
  const { darkTheme, user, isUpdateUser, setIsUpdateUser } =
    useContext(UserContext);

  return (
    <AnimationWrapper>
      <div className="px-2 mt-9">
        <div className="flex gap-2 items-center justify-center flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div>
              <UserIcon className="w-8 h-8" />
            </div>
            <div>
              <div>Name</div>
              <div>Email</div>
            </div>
            <div className="font-[500]">
              <div>{user.username}</div>
              <div>{user.email}</div>
            </div>
          </div>
          <Button onClick={() => setIsUpdateUser(!isUpdateUser)} className={`${!darkTheme && "bg-white"}`}>Update</Button>
        </div>
      </div>
    </AnimationWrapper>
  );
}
