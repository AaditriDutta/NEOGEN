import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import ClickOutHandler from "react-clickout-handler";
import Posts from "./Posts";

export default function SearchList() {
  const { darkTheme, comments } = useContext(UserContext);
  const [inpValue, setInpValue] = useState("");

  return (
    <ClickOutHandler onClickOut={() => setInpValue("")}>
      <form
        className={
          "flex gap-1 items-center px-2 rounded-xl " +
          (darkTheme ? "bg-gray-700" : "bg-gray-300")
        }
      >
        <MagnifyingGlassIcon className={"h-6 w-6 "} />
        <input
          type="text"
          placeholder="Search"
          className={
            "w-full outline-none py-1 " +
            (darkTheme ? "bg-gray-700" : "bg-gray-300")
          }
          value={inpValue}
          onChange={(e) => setInpValue(e.target.value)}
        />
      </form>

      {/* SEARCHING Mechanizm  */}
      <div
        className={
          "py-2 rounded-xl absolute z-40 left-2 right-2 top-12 shadow-lg border " +
          `${inpValue === "" ? "hidden" : "block"} || ${
            darkTheme
              ? "bg-gray-600 border-gray-500"
              : "bg-gray-200 border-gray-400"
          }`
        }
      >
        {comments.length > 0 &&
          comments
            .filter((item) => {
              const searchValue = inpValue.toLowerCase();
              const name = item.title.toLowerCase();
              return name && name.startsWith(searchValue);
            })
            .map((item, index) => (
              // <ClickOutHandler onClickOut={() => setInpValue("")}>
              <div
                key={index}
                className={
                  "rounded-xl mb-1 mx-1 hover:rounded-xl transition-all " +
                  `${inpValue === "" ? "hidden" : "block"} ||
                ${
                  darkTheme
                    ? "hover:bg-gray-800 hover:border-none bg-gray-700"
                    : "hover:bg-[#ffecd2] hover:border-none bg-gray-50"
                }`
                }
              >
                <Posts {...item} key={index} />
              </div>
              // </ClickOutHandler>
            ))}
      </div>
    </ClickOutHandler>
  );
}
