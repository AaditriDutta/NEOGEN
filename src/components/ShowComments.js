import React, { useContext, useState } from "react";
import Avatar from "./Avatar";
import { UserContext } from "../UserContext";
import Button from "./Button";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import CommentForm from "./CommentForm";
import ReactTimeago from "react-timeago";
import { CommentRefreshContext } from "./CommentRefreshContext";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Voting from "./Voting";

export default function ShowComments(props) {
  const allComments = props.showComments.filter(
    (comm) => comm.parentId === props.parentId
  );
  const { darkTheme } = useContext(UserContext);
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const { refreshComment } = useContext(CommentRefreshContext);
  return (
    <div className="mt-3">
      {allComments.length > 0 &&
        allComments.map((item, index) => {
          const replies = props.showComments.filter(
            (c) => c.parentId === item._id
          );
          return (
            <div
              key={index}
              className={`flex flex-col flex-wrap gap-1 rounded-xl pl-3 py-2 mx-2 mb-1 ${
                darkTheme ? "bg-gray-600" : "bg-gray-100"
              } ${
                props.classNames
                  && (`py-0 -mb-2 border-l rounded-[0px] ${
                      darkTheme ? "border-l-gray-500" : "border-l-gray-200"
                    }`)
              }`}
            >
              <div className="">
                <div
                  className={`text-[11px] ${
                    darkTheme ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <ReactTimeago date={item.createdAt} />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Avatar {...item} />
                    <span className="font-[500]">{item.author}:</span>
                  </div>
                  <div>
                    <Markdown remarkPlugins={[remarkGfm]}>{item.body}</Markdown>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Voting commentId={item._id} />
                <Button onClick={() => setIsReplyOpen(item._id)}>
                  <ChatBubbleLeftIcon
                    className={`w-4 h-4 ${
                      darkTheme ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </Button>
              </div>
              {item._id === isReplyOpen && (
                <CommentForm
                  isAuthor={false}
                  cancelReply={() => setIsReplyOpen(false)}
                  rootId={props.rootId}
                  parentId={item._id}
                  addComment={() => refreshComment()}
                />
              )}
              {replies.length > 0 && (
                <div className="mb-1 -ml-1">
                  <ShowComments
                    showComments={props.showComments}
                    parentId={item._id}
                    rootId={props.rootId}
                    classNames={true}
                  />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
