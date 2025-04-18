import { useContext, useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { UserContext } from "./UserContext";
import Header from "./components/Header";
import AuthModal from "./components/AuthModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import LogoutModal from "./components/LogoutModal";
import { BrowserRouter as Router } from "react-router-dom";
import RoutingPages from "./components/RoutingPages";
import NewPostModal from "./components/NewPostModal";
import CommunityFormModal from "./components/CommunityFormModal";
import UpdateModal from "./components/UpdateModal";
import DeletePostModal from "./components/DeletePostModal";
import UpdateUserModal from "./components/UpdateUserModal";

const GlobalStyle = createGlobalStyle`
  body{
    background: ${(props) => (props.darkTheme ? "#28282b" : "#eee")};
    color: ${(props) => (props.darkTheme ? "#fffc" : "#333")};
  }
`;
function App() {
  const {
    darkTheme,
    setUser,
    user,
    commentId,
    postParamsId,
    isAuthModalOpen,
    setIsAuthModalOpen
  } = useContext(UserContext);
  const [profileLoading, setProfileLoading] = useState(true);
  useEffect(() => {
    setProfileLoading(true);
    const url = `${process.env.REACT_APP_API_URL}/profile`;
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setProfileLoading(false);
      })
      .catch((err) => {
        // toast.error(err.message);
        setProfileLoading(false);
      });
  }, []);

  // Loading spinner
  if (profileLoading) {
    return (
      <div className={"pt-[20%] h-screen text-center bg-[#eee]"}>
        <span className={"loader"}></span>
      </div>
    );
  }
  // if (loading) {
  //   return (
  //     <div className={"pt-[20%] h-screen text-center "+ (darkTheme ? "bg-[#28282b]" : "bg-[#eee")}>
  //       <span className={"loader"}></span>
  //     </div>
  //   );
  // }

  return (
    <div
      className="max-w-2xl mx-auto relative"
      // onClick={(e) => e.stopPropagation()}
    >
      <GlobalStyle darkTheme={darkTheme} />

      <div className="pb-16">
        <Router>
          {/* <Header /> */}

          <RoutingPages />

          {/* MODALS  */}
          {isAuthModalOpen && <AuthModal />}
          <NewPostModal />
          <LogoutModal />

          <CommunityFormModal />
          <DeletePostModal postId={commentId ? commentId : postParamsId} />
          <UpdateModal postId={commentId ? commentId : postParamsId} />

          <UpdateUserModal />
        </Router>
      </div>
    </div>
  );
}

export default App;
