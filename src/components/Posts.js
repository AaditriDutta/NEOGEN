import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, useLocation } from "react-router-dom";
import PostContent from "./PostContent";

export default function Posts(props) {
  const { setCommentId, isCommentModalOpen, setIsCommentModalOpen } = useContext(UserContext);
  
  const location = useLocation();

  
  return (
    <>
      {props.isCommentOpen && <PostContent {...props} bgTrans={true} />}
      {!props.isCommentOpen && (
        <Link
          to={{...location,
            pathname: `/comments/${props._id}`,
            state: { commentId: props._id },
          }}
          onClick={()=> {setCommentId(props._id); setIsCommentModalOpen(!isCommentModalOpen)}}
        >
          <PostContent {...props} lineClamp={true} />
        </Link>
      )}
    </>
  );
}
