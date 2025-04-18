import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./Main";
import CommentPage from "./CommentPage";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import CommentModal from "./CommentModal";
import Profile from "./Profile";
import MainLayout from "./MainLayout";
import AuthModal from "./AuthModal";
import PageNotFound from "./PageNotFound";

export default function RoutingPages() {
  const { commentId, user } = useContext(UserContext);
  const location = useLocation();
  // console.log(location);

  if (commentId !== "") {
    location.pathname = "/";
  }

  return (
    <div>
      {/* {commentId && <CommentModal />} */}
      <CommentModal />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={user?.email ? (<Main />) : (<AuthModal />)} />
          {
            user?.email && (
              <>
                <Route path="/comments/:id" element={<CommentPage />} />
                <Route path="/devi/profile" element={<Profile />} />
              </>
            )
          }
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
