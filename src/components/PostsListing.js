import React from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import Posts from "./Posts";
import { useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import AnimationWrapper from "./AnimationWrapper";

export default function PostsListing() {
  const { comments, setComments, loading, setLoading, fetchedComments } =
    useContext(UserContext);
  useEffect(() => {
    fetchedComments();
  }, []);
  
  return (
    <AnimationWrapper>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <>
            <Posts
              {...comment}
              key={index}
              fetchedComments={() => fetchedComments()}
            />
            <Footer />
          </>
        ))
      ) : (
        <div className={"pt-2 text-center"}>
          <span className={"loader"}></span>
        </div>
      )}
    </AnimationWrapper>
  );
}
