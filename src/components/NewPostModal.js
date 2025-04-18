import React from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Input from "./Input";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ClickOutHandler from "react-clickout-handler";
import Button from "./Button";
import Textarea from "./Textarea";
import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/joy";

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["link", "image"],
//     ["clean"],
//   ],
// };
// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
// ];

export default function NewPostModal() {
  const navigate = useNavigate();
  const {
    darkTheme,
    isNewPostModalOpen,
    setIsNewPostModalOpen,
    user,
    setLoading,
    fetchedComments,
  } = useContext(UserContext);
  const [comment, setComment] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [codeBody, setCodeBody] = useState("");

  async function CreatePost(e) {
    setLoading(false);
    e.preventDefault();
    if (body !== "") {
      const url = `${process.env.REACT_APP_API_URL}/post`;
      setLoading(true);
      const data = { title, body, codeBody, author: user.username, postedBy: user.id };
      await axios
        .post(url, data, { withCredentials: true })
        .then((res) => {
          if (!user?.email || res.data.errorMsg) {
            toast.error(res.data.errorMsg);
            setLoading(false);
          } else {
            fetchedComments();
            // setComments([...comments, res.data]);
            // setCommentId(res.data._id)
            toast.success("Created");
            setBody("");
            setTitle("");
            setCodeBody("");
            setLoading(false);
            setIsNewPostModalOpen(false);
            navigate("/");
          }
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
        });
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Text box is required");
    }
  }

  return (
    <>
      {isNewPostModalOpen && (
        <div
          className={`w-screen h-screen fixed z-50 top-0 left-0 backdrop-blur-xl flex items-center justify-center`}
        >
          <ClickOutHandler onClickOut={() => setIsNewPostModalOpen(false)}>
            <div
              className={`md:w-[700px] lg:w-[900px] w-[500px] mx-4 p-2 rounded-xl border ${
                darkTheme
                  ? "bg-gray-700 border-gray-500"
                  : "bg-gray-200 border-gray-50"
              }`}
            >
              <div
                className="commentPost"
                style={{ maxHeight: "calc(100vh - 100px)" }}
              >
                <form className="flex flex-col gap-0.5">
                  <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Text (required) | markdown"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows="4"
                  />
                  <Textarea
                    placeholder="Code Snippets"
                    value={codeBody}
                    onChange={(e) => setCodeBody(e.target.value)}
                    rows="8"
                  />

                  {/* <ReactQuill
                    name="content"
                    theme="snow"
                    formats={formats}
                    modules={modules}
                    value={body}
                    className="mt-2"
                    onChange={(newValue) => setBody(newValue)}
                    placeholder="Type here"
                  /> */}

                  <div className="flex justify-end gap-1">
                    <Button onClick={() => setIsNewPostModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" onClick={(e) => CreatePost(e)}>
                      Post
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </ClickOutHandler>
        </div>
      )}
    </>
  );
}
