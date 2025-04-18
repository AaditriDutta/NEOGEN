import React, { useContext } from "react";
import Popup from "./Popup";
import { UserContext } from "../UserContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ClickOutHandler from "react-clickout-handler";

export default function DeletePostModal({ postId }) {
  const navigate = useNavigate();
  const {
    setIsDelete,
    isDelete,
    darkTheme,
    setCommentId,
    setPostParamsId,
    fetchedComments,
  } = useContext(UserContext);
  // if (!isDelete) {
  //   return null;
  // }

  async function deletePost() {
    const url = `${process.env.REACT_APP_API_URL}/comments/${postId}`;
    await axios
      .delete(url)
      .then((res) => {
        fetchedComments();
        toast.success("Deleted");
        navigate("/");
        setIsDelete(false);
        setCommentId("");
        setPostParamsId("");
      })
      .catch((err) => {
        toast.error(err.message);
      });
    // alert(postId);
  }

  function closeModal() {
    setIsDelete(false);
    setCommentId("");
    setPostParamsId("");
    navigate("/");
  }
  return (
    <>
      {isDelete && (
        <div
          className={`w-screen h-screen fixed z-50 top-0 left-0 backdrop-blur-xl flex items-center justify-center`}
        >
          <ClickOutHandler onClickOut={() => closeModal()}>
            <div
              className={`md:w-[500px] w-[280px] mx-4 p-4 rounded-xl border ${
                darkTheme
                  ? "bg-gray-700 border-gray-500"
                  : "bg-gray-200 border-gray-50"
              }`}
            >
              <h3 className="text-center mb-3">
                You want to delete this post?
              </h3>
              <div className="flex gap-0.5 items-center justify-center">
                <button
                  // disabled={loading}
                  className={`py-1 px-4 rounded-xl transition-all ${
                    darkTheme
                      ? "bg-gray-600 hover:bg-gray-500 active:bg-gray-700"
                      : "bg-gray-100 hover:bg-gray-50 active:bg-gray-300"
                  }`}
                  onClick={() => deletePost()}
                >
                  Yes
                </button>
                <button
                  // disabled={loading}
                  className={`py-1 px-4 rounded-xl transition-all ${
                    darkTheme
                      ? "bg-gray-600 hover:bg-gray-500 active:bg-gray-700"
                      : "bg-gray-100 hover:bg-gray-50 active:bg-gray-300"
                  }`}
                  onClick={() => closeModal()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </ClickOutHandler>
        </div>
      )}
    </>
  );
}
