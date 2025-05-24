import axios from "axios";
import { createContext, useState } from "react";

const UserContext = createContext({});

function UserContextProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState("login");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);

  const [commentId, setCommentId] = useState("");

  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [isCommunity, setIsCommunity] = useState(false);

  const [postParamsId, setPostParamsId] = useState("");

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isUpdateUser, setIsUpdateUser] = useState(false);

  const [getPost, setGetPost] = useState({});

  function fetchedComments() {
    setLoading(true);
    const url = `${process.env.REACT_APP_API_URL}/comments`;
    axios.get(url).then((res) => {
      setComments(res.data);
    });
  }

  return (
    <UserContext.Provider
      value={{
        darkTheme,
        setDarkTheme,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isLogin,
        setIsLogin,
        loading,
        setLoading,
        user,
        setUser,
        isLogoutModalOpen,
        setIsLogoutModalOpen,
        comments,
        setComments,
        commentId,
        setCommentId,
        isNewPostModalOpen,
        setIsNewPostModalOpen,
        isCommunity,
        setIsCommunity,
        isDelete,
        setIsDelete,
        postParamsId,
        setPostParamsId,
        fetchedComments,
        isUpdateModalOpen,
        setIsUpdateModalOpen,
        getPost,
        setGetPost,
        isCommentModalOpen,
        setIsCommentModalOpen,
        isUpdateUser,
        setIsUpdateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };

// Global UserContext provider for NEOGEN app
// - Manages app-wide states: theme, user, modals, post & comment data
// - Provides context values to all components via React Context API
// - Includes helper function to fetch comments using axios
