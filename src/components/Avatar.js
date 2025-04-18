import React, { useContext } from "react";
import { UserContext } from "../UserContext";

export default function Avatar(props) {
  const { darkTheme } = useContext(UserContext);
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center border ${
        darkTheme ? "border-gray-400" : "border-gray-300"
      }`}
    >
      <div className="capitalize">{props.author.split("")[0]}</div>
    </div>
  );
}
