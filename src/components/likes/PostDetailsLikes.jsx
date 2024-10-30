import { useEffect, useMemo, useState } from "react";
import { handleLikeBtn } from "./likeBtn";

export const PostDetailsLikes = ({
  whoPosted,
  numberOfLikes,
  postId,
  onLikeChange,
}) => {
  const currentUserId = useMemo(() => {
    return JSON.parse(localStorage.getItem("learning_user"))?.id;
  }, []);

  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if (whoPosted === currentUserId) {
      setIsUser(true);
      //console.log(currentUserId);
    } else {
      setIsUser(false);
    }
  }, [whoPosted, currentUserId, numberOfLikes]);

  const handleLike = async () => {
    await handleLikeBtn(postId, currentUserId);
    onLikeChange();
  };

  if (!isUser) {
    return (
      <button onClick={handleLike} className="Dpost-info-likes-btn">
        {numberOfLikes.length ? numberOfLikes.length : "Be The First Like!"}
      </button>
    );
  } else {
    return (
      <div>
        <button className="Dpost-info-edit-btn">EDIT POST</button>
        <div className="Dpost-info-likes">
          {numberOfLikes.length ? numberOfLikes.length : "NO LIKES"}
        </div>
      </div>
    );
  }
};
