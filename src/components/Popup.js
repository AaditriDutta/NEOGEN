import { useContext } from "react";
import ClickOutHandler from "react-clickout-handler";
import { UserContext } from "../UserContext";

export default function Popup({children, modalOpen}) {
    const {darkTheme} = useContext(UserContext);
    return (
        <div
          className={`w-screen h-screen fixed z-50 top-0 left-0 backdrop-blur-xl flex items-center justify-center`}
        >
          <ClickOutHandler onClickOut={() => {modalOpen();}}>
            <div
              className={`md:w-[700px] lg:w-[900px] w-[500px] mx-4 px-2 rounded-xl border ${
                darkTheme
                  ? "bg-gray-800 border-gray-500"
                  : "bg-gray-200 border-gray-50"
              }`}
            >
              <div
                // className="commentPost overflow-y-scroll"
                style={{ maxHeight: "calc(100vh - 40px)" }}
                onClick={e=>e.stopPropagation()}
              >
               {children}
              </div>
            </div>
          </ClickOutHandler>
        </div>
      );
}
