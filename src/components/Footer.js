import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function Footer() {
  const { darkTheme } = useContext(UserContext);
  return (
    <div
      className={`flex items-center max-h-full justify-center absolute bottom-3 right-0 left-0`}
    >
      <div
        className={`flex gap-2 items-center py-1 px-4 rounded-xl ${
          darkTheme && "bg-slate-500"
        }`}
      >
        <img src="./logo-k-main.svg" alt="kpk logo" className="h-8" />
        <h2 className="text-[11px]">D e v e l o p e d B y N E O G E N t e a m</h2>
      </div>
    </div>
  );
}
