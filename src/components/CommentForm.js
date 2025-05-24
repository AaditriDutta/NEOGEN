import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import Textarea from "./Textarea";
import Button from "./Button";
// import { Textarea } from '@mui/joy';
import { ArrowDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function CommentForm(props) {
  const { user, darkTheme, loading, setLoading, comments, setComments } =
    useContext(UserContext);
  const [body, setBody] = useState("");

  async function CreateComment() {
    setLoading(false);
    if (body !== "") {
      const url = `${process.env.REACT_APP_API_URL}/post`;
      setLoading(true);
      const data = {
        postedBy: user.id,
        body,
        author: user.username,
        rootId: props.rootId,
        parentId: props.parentId,
      };
      await axios
        .post(url, data, { withCredentials: true })
        .then((res) => {
          if (!user.email || res.data.errorMsg) {
            toast.error(res.data.errorMsg);
            setLoading(false);
          } else {
            if (props.addComment) {
              props.addComment();
            }
            setLoading(false);
            toast.success("Added");
            setBody("");
            props.cancelReply();
          }
        })
        .catch((err) => {
          // toast.error(err.message);
          setLoading(false);
        });
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Text box is required");
    }
  }
  return (
    <div className="px-2">
      {props.isAuthor && <div className="mb-1">Comment on this post</div>}

      <div
        className={`flex flex-col border rounded-xl ${
          darkTheme
            ? "bg-gray-700 border-gray-600"
            : "bg-gray-100 border-gray-300"
        }`}
      >
        {/* <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Text | markdown"
          className="w-full"
        /> */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Text | markdown"
          className={`rounded-xl px-4 py-2 outline-none ${
            darkTheme ? "bg-gray-700" : "bg-gray-100"
          }`}
        />

        <div className="flex items-center justify-end gap-2 mx-1 mb-1">
          {!!props.cancelReply && (
            <div>
              <Button onClick={() => props.cancelReply()}>
                <XMarkIcon className="w-4 h-4 text-red-300" />
              </Button>
            </div>
          )}
          <Button
            className="self-end"
            onClick={() => {
              CreateComment();
            }}
          >
            <ArrowDownIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * CommentForm.jsx
 * ---------------------
 * 📝 Renders a comment input form with support for markdown-style text
 *
 * ✅ Uses global user and theme from UserContext
 * ✅ Accepts `rootId` and `parentId` to associate the new comment correctly
 * ✅ Calls backend API to post a new comment on submit
 * ✅ Notifies user via toast (success or error)
 * ✅ Can optionally cancel reply with a close (X) button
 * ✅ Supports optional `addComment()` callback to refresh comments after posting
 */
