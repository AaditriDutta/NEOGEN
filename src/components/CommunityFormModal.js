import React, { useContext } from "react";
import Popup from "./Popup";
import { UserContext } from "../UserContext";

export default function CommunityFormModal() {
  const { isCommunity, setIsCommunity } = useContext(UserContext);
  if (!isCommunity) {
    return null;
  }
  return (
    // <>
    // {isCommunity && (

    <Popup modalOpen={() => setIsCommunity(false)}>CommunityFormModa</Popup>
    // )}
    // </>
  );
}
