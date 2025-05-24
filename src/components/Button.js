import { useContext } from "react"
import { UserContext } from "../UserContext"

export default function Button(props) {
    const {darkTheme} = useContext(UserContext);
  let buttonClasses = `rounded-xl px-4 py-2 text-sm transition-all ${
    darkTheme
      ? "bg-gray-600 hover:bg-gray-500 active:bg-gray-700"
      : "bg-gray-100 hover:bg-gray-200 active:bg-gray-300"
  }`;

//   if(props.outlineDesign){
//     buttonClasses += `bg-transparent border ${darkTheme ? "border-gray-500" : "border-gray-300"}`
//   };
  return (
    <button {...props} className={`${buttonClasses} ${props.className}`} />
  )
}
/**
 * Button.jsx
 * ---------------------
 * 🔘 Custom theme-aware button component
 * 
 * ✅ Adapts styling based on darkTheme from UserContext
 * ✅ Supports extra props and className via spread operator
 * ✅ Includes hover & active states for both light/dark modes
 */

