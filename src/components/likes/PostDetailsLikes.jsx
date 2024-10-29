import { useEffect, useMemo, useState } from "react";
import { likeBtn } from "./likeBtn";

export const PostDetailsLikes = ({ whoPosted, numberOfLikes, postId }) => {
  const currentUserId = useMemo(() => {
    return JSON.parse(localStorage.getItem("learning_user"))?.id;
  }, []);

  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if (whoPosted === currentUserId) {
      setIsUser(true);
      console.log(currentUserId);
    }
  }, [whoPosted, currentUserId]);

  if (!isUser) {
    return (
      <button onClick={likeBtn(postId)} className="Dpost-info-likes-btn">
        {numberOfLikes.length ? numberOfLikes.length : "Be The First Like!"}
      </button>
    );
  } else {
    return (
      <div>{numberOfLikes.length ? numberOfLikes.length : "NO LIKES"}</div>
    );
  }
};
