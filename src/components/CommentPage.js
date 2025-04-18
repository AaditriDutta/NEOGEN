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
