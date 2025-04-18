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

export default function UpdateUserModal({ modalOpen, postId }) {
  const navigate = useNavigate();
  const { user, isUpdateUser, setIsUpdateUser } = useContext(UserContext);

  const [updateUsername, setUpdateUsername] = useState(user.username);
  const [updateEmail, setUpdateEmail] = useState(user.email);
  const [updatePassword, setUpdatePassword] = useState("");

  useEffect(() => {
    setUpdateUsername(user.username);
    setUpdateEmail(user.email);
  }, [isUpdateUser]);

  if (!isUpdateUser) {
    return null;
  }

  async function updateUser() {
    const url = `${process.env.REACT_APP_API_URL}/updateprofile`;
    const updatedData = {
      username: updateUsername,
      email: updateEmail,
      password: updatePassword,
    };
    await axios
      .put(url, updatedData, { withCredentials: true })
      .then((res) => {
        if (res.data.errorMsg) {
          toast.error(res.data.errorMsg);
        } else {
          toast.success("Updated");
          navigate("/devi/profile");
          setIsUpdateUser(false);
          setTimeout(() => {
            window.location.reload();
          }, [1000]);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  function closeUpdate() {
    setIsUpdateUser(false);
    navigate("/devi/profile");
  }

  return (
    <Popup modalOpen={() => closeUpdate()}>
      <div className="p-2">
        <div className="flex flex-col">
          <label>Username</label>
          <Input
            className="w-full mb-1"
            value={updateUsername}
            onChange={(e) => setUpdateUsername(e.target.value)}
          />
          <label>Email</label>
          <Input
            className="w-full mb-1 text-slate-500 hover:cursor-not-allowed"
            value={updateEmail}
            // onChange={(e) => setUpdateEmail(e.target.value)}
            disabled={true}
          />
          <label>Password</label>
          <Input
            className="w-full mb-1"
            value={updatePassword}
            onChange={(e) => setUpdatePassword(e.target.value)}
          />
        </div>
        <div className="flex gap-2 justify-end items-center">
          <Button onClick={() => closeUpdate()}>Cancel</Button>
          <Button onClick={() => updateUser()}>Update</Button>
        </div>
      </div>
    </Popup>
  );
}
