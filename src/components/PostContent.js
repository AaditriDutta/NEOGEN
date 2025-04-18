import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import ReactTimeago from "react-timeago";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PostContent(props) {
  const navigate = useNavigate();
  const { author, title, body, codeBody, createdAt } = props;
  const {
    darkTheme,
    commentId,
    user,
    isDelete,
    setIsDelete,
    setCommentId,
    postParamsId,
    fetchedComments,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    setIsCommentModalOpen,
  } = useContext(UserContext);

  const classes = `mx-2 p-3 rounded-xl mb-1 transition-all ${darkTheme ? "bg-gray-700 border-gray-600" : "bg-gray-300 border-gray-300"
    } ${props.isCommentOpen ? "" : "hover:bg-[#8f7e7e2e]"} ${commentId && "bg-transparent mb-4 px-0 hover:bg-transparent"
    } ${props.bgTrans && "bg-transparent px-0"}`;

  // async function deletePostHandler(deleteId) {
  //   const options = {
  //     title: "Are you sure?",
  //     message: "You want to delete this post?",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => deletePost(),
  //       },
  //       {
  //         label: "No",
  //         // onClick: () => alert('Click No')
  //       },
  //     ],
  //     closeOnEscape: true,
  //     closeOnClickOutside: true,
  //     keyCodeForClose: [8, 32],
  //     willUnmount: () => {},
  //     afterClose: () => {},
  //     onClickOutside: () => {},
  //     onKeypress: () => {},
  //     onKeypressEscape: () => {},
  //     overlayClassName: "overlay-custom-class-name",
  //   };

  //   async function deletePost() {
  //     const url = `${process.env.REACT_APP_API_URL}/comments/${deleteId}`;
  //     await axios
  //       .delete(url)
  //       .then((res) => {
  //         toast.success("Deleted");
  //         navigate("/");
  //         setCommentId('');
  //         fetchedComments();
  //       })
  //       .catch((err) => {
  //         toast.error(err.message);
  //       });
  //   }
  //   confirmAlert(options);
  // }

  return (
    <div className={classes}>
      <div>
        <span className={`text-[11px] ${darkTheme ? "text-gray-400" : "text-gray-600"}`}>
          <span className="font-[500]">Posted by {author}</span> |{" "}
          <ReactTimeago date={createdAt} />
        </span>
        <h3 className={`text-[500] text-lg font-[500] mb-1 ${props.lineClamp && "line-clamp-2"}`}>
          <Markdown remarkPlugins={[remarkGfm]}>{title}</Markdown>
        </h3>
      </div>
      <p className={`leading-6 text-sm ${props.lineClamp && "line-clamp-3"}`}>
        <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
        {/* {body} */}
      </p>
      {codeBody && (
        <p className={`leading-6 text-sm ${props.lineClamp && "line-clamp-3"}`}>
          <pre style={{ background: "#1e1e1e", color: "#dcdcdc", padding: "10px", borderRadius: "5px" }}>
            <code>{codeBody}</code>
          </pre>
        </p>
      )}

      {(commentId || postParamsId) && user.id === props.postedBy && (
        <div className="flex gap-4 items-center justify-end">
          <button
            // onClick={() =>
            //   deletePostHandler(commentId ? commentId : postParamsId)
            // }
            onClick={() => {
              setIsDelete(!isDelete);
              setIsCommentModalOpen(false);
            }}
            className={`rounded-full p-2 transition-all ${darkTheme
              ? "bg-slate-800 hover:bg-gray-700 active:bg-slate-500"
              : "bg-slate-200 hover:bg-gray-100 active:bg-gray-300"
              }`}
          >
            <TrashIcon className={`w-4 h-4 text-red-400`} />
          </button>
          <button
            onClick={() => {
              setIsUpdateModalOpen(!isUpdateModalOpen);
              setIsCommentModalOpen(false);
            }}
            className={`rounded-full p-2 transition-all ${darkTheme
              ? "bg-slate-800 hover:bg-gray-700 active:bg-slate-500"
              : "bg-slate-200 hover:bg-gray-100 active:bg-gray-300"
              }`}
          >
            <PencilSquareIcon className="w-4 h-4 text-blue-500" />
          </button>
        </div>
      )}
    </div>
  );
}
