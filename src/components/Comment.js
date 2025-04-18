import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import Posts from "./Posts";
import CommentForm from "./CommentForm";
import { CommentRefreshContext } from "./CommentRefreshContext";
import ShowComments from "./ShowComments";

export default function Comment(props) {
  const { darkTheme } = useContext(UserContext);
  const [comment, setComment] = useState({});
  const [showComments, setShowComments] = useState([]);
  const [commentsTotals, setCommentsTotals] = useState(0);
  const [userVotes, setUserVotes] = useState(0);

  useEffect(() => {
    if (props.comment) {
      setComment(props.comment);
    }
    const url = `${process.env.REACT_APP_API_URL}/comments/${props.commentId}`;
    axios.get(url).then((res) => {
      setComment(res.data);
    });

    refreshComment();
  }, [props.commentId]);

  useEffect(() => {
    refreshVotes();
  }, [showComments.length]);

  function refreshComment() {
    const apiUrl = `${process.env.REACT_APP_API_URL}/comments/root/${props.commentId}`;
    axios.get(apiUrl).then((res) => {
      setShowComments(res.data);
    });
  }

  async function refreshVotes() {
    const commentsIds = [comment._id, ...showComments.map((c) => c._id)];
    const apiUrl = `${process.env.REACT_APP_API_URL}/votes`;
    await axios
      .post(apiUrl, { commentsIds }, { withCredentials: true })
      .then((res) => {
        setCommentsTotals(res.data.commentsTotals);
        setUserVotes(res.data.userVotes);
      });
  }
  return (
    <>
      {comment.body ? (
        <>
          {/* <PostContent {...comment} /> */}
          <Posts {...comment} isCommentOpen={true} />
          <CommentForm
            rootId={comment._id}
            parentId={comment._id}
            isAuthor={true}
            addComment={() => refreshComment()}
          />

          <CommentRefreshContext.Provider
            value={{ refreshComment, commentsTotals, userVotes, refreshVotes }}
          >
            <ShowComments
              rootId={comment._id}
              parentId={comment._id}
              showComments={showComments}
              className={`py-2 border-l ${
                darkTheme ? "border-l-gray-500" : "border-l-gray-200"
              }`}
            />
          </CommentRefreshContext.Provider>
        </>
      ) : (
        <div className={"pt-2 text-center"}>
          <span className={"loader"}></span>
        </div>
      )}
    </>
  );
}
