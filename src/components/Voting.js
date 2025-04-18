import axios from "axios";
import Button from "./Button";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { CommentRefreshContext } from "./CommentRefreshContext";

export default function Voting(props) {
  const { darkTheme } = useContext(UserContext);
  const { commentsTotals, userVotes, refreshVotes } = useContext(
    CommentRefreshContext
  );

  const total = commentsTotals[props.commentId] || 0;
  const userVote = userVotes[props.commentId] || 0;

  function sendVote(direction = "up") {

    const directionNum = direction === 'up' ? 1 : -1;
    if(directionNum === userVote){
      direction= 'unvote';
    }

    const url = `${process.env.REACT_APP_API_URL}/vote/${props.commentId}/${direction}`;
    axios.get(url, { withCredentials: true }).then(() => {
      refreshVotes();
    });
  }
  function handleVoteUp() {
    sendVote("up");
  }
  function handleVoteDown() {
    sendVote("down");
  }

  function votingButton(directionName = "up") {
    const directionNum = directionName === "up" ? 1 : -1;

    let classNames = `w-4 h-4 ${darkTheme ? "text-gray-400" : "text-gray-500"}`;

    if (directionNum === userVote) {
      classNames += " text-pink-400";
    }

    if (directionName === "up") {
      return (
        <Button onClick={() => handleVoteUp()}>
          <HandThumbUpIcon className={classNames} />
        </Button>
      );
    } else {
      return (
        <Button onClick={() => handleVoteDown()}>
          <HandThumbDownIcon className={classNames} />
        </Button>
      );
    }
  }
  return (
    <div className="flex items-center gap-1">
      {votingButton("up")}
      <span>{total}</span>
      {votingButton("down")}
    </div>
  );
}
