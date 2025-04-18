import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import Popup from "./Popup";
import Input from "./Input";
import Button from "./Button";
import Textarea from "./Textarea";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateModal({ modalOpen, postId }) {
  const navigate = useNavigate();
  const {
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    fetchedComments,
    getPost,
    setGetPost,
    setCommentId,
    commentId,
    setPostParamsId,
    postParamsId,
  } = useContext(UserContext);

  const [updateTitle, setUpdateTitle] = useState(getPost.title);
  const [updateBody, setUpdateBody] = useState(getPost.body);
  const [updateCodeBody, setUpdateCodeBody] = useState(getPost.codeBody);

  useEffect(() => {
    getPostForUpdate(postId);
    setUpdateBody(getPost.body);
    setUpdateTitle(getPost.title);
    setUpdateCodeBody(getPost.codeBody)
  }, [isUpdateModalOpen, commentId, postParamsId]);

  function getPostForUpdate(postId) {
    const url = `${process.env.REACT_APP_API_URL}/comments/${postId}`;
    axios.get(url).then((res) => {
      setGetPost(res.data);
    });
  }

  if (!isUpdateModalOpen) {
    return null;
  }

  async function UpdateHandler() {
    const url = `${process.env.REACT_APP_API_URL}/comments/${postId}`;
    const updatedData = { title: updateTitle, body: updateBody, codeBody: updateCodeBody };
    await axios.put(url, updatedData).then((res) => {
      fetchedComments();
      setIsUpdateModalOpen(false);
      toast.success("Updated");
      setIsUpdateModalOpen(false);
      setCommentId("");
      setPostParamsId("");
      navigate("/");
    });
  }

  function closeUpdate() {
    setIsUpdateModalOpen(false);
    setCommentId("");
    setPostParamsId("");
    navigate("/");
  }

  return (
    <Popup modalOpen={() => closeUpdate()}>
      <div className="p-2">
        <div className="flex flex-col">
          <label>Title</label>
          <Input
            className="w-full mb-1"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <label>Text body</label>
          <Textarea
            className="w-full mb-1"
            value={updateBody}
            onChange={(e) => setUpdateBody(e.target.value)}
            rows="6"
          />
          <label>Code Snippets</label>
          <Textarea
            className="w-full mb-1"
            value={updateCodeBody}
            onChange={(e) => setUpdateCodeBody(e.target.value)}
            rows="6"
          />
        </div>
        <div className="flex gap-2 justify-end items-center">
          <Button
            onClick={() => closeUpdate()}
          >
            Cancel
          </Button>
          <Button onClick={() => UpdateHandler()}>Update</Button>
        </div>
      </div>
    </Popup>
  );
}
