import { createContext, useContext } from "react";
import { UserContext } from "../UserContext";

export const CommentRefreshContext = createContext({});

// export function CommentRefreshContextProvider({children}){
//     const {commentId} = useContext(UserContext);
//   return(
//     <CommentRefreshContext.Provider value={{}}></CommentRefreshContext.Provider>
//   )
// }