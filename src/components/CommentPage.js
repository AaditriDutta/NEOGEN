import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Comment from "./Comment";
import { UserContext } from "../UserContext";

export default function CommentPage(props) {
  const {setPostParamsId}= useContext(UserContext);
  const [comment, setComment] = useState({});
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    setPostParamsId(id);
    const url = `${process.env.REACT_APP_API_URL}/comments/${id}`;
    axios.get(url).then((res) => {
      setComment(res.data);
    });
  }, []);
  return (
    <>
      {/* {comment.body ? (
        <Posts {...comment} isCommentOpen={true} />
      ) : (
        <div className={"pt-2 text-center"}>
          <span className={"loader"}></span>
        </div>
      )} */}

      <Comment commentId={id} />
    </>
  );
}

/**
 * CommentPage.jsx
 * ------------------------
 * 💬 Page component to render a single comment thread using a URL parameter
 *
 * ✅ Extracts comment `id` from the URL using `useParams()`
 * ✅ Fetches the comment data from the backend API using the extracted ID
 * ✅ Stores the fetched comment in local state (optional backup for rendering)
 * ✅ Passes the comment ID to the `Comment` component for threaded rendering
 * ✅ Also sets `postParamsId` in the global `UserContext` (for shared access)
 * ✅ Previously had inline rendering logic for comment post, now centralized in <Comment />
 */

