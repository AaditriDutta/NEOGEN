import React from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useState } from "react";
import axios from "axios";
import ClickOutHandler from "react-clickout-handler";
import { useEffect } from "react";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";

export default function CommentModal() {
  const { darkTheme, commentId, setCommentId, isCommentModalOpen, setIsCommentModalOpen } = useContext(UserContext);
  const navigate = useNavigate();
  const [comment, setComment] = useState({});

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/comments/${commentId}`;
    axios.get(url).then((res) => {
      setComment(res.data);
    });
  }, [commentId]);

  function closeCommentModal() {
    setComment({});
    setCommentId("");
    setIsCommentModalOpen(false);
    navigate("/");
  }

  return (
    <>
      {isCommentModalOpen && (
        <div
          className={`w-screen h-screen fixed z-50 top-0 left-0 backdrop-blur-xl flex items-center justify-center`}
        >
          <ClickOutHandler onClickOut={() => closeCommentModal()}>
            <div
              className={`md:w-[700px] lg:w-[900px] w-[500px] mx-4 px-2 rounded-xl border ${
                darkTheme
                  ? "bg-gray-800 border-gray-500"
                  : "bg-gray-200 border-gray-50"
              }`}
            >
              <div
                className="commentPost overflow-y-scroll"
                style={{ maxHeight: "calc(100vh - 100px)" }}
              >
                <Comment comment={comment} commentId={commentId} />
              </div>
            </div>
          </ClickOutHandler>
        </div>
      )}
    </>
  );
}
