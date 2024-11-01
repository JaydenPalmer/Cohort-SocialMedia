import { sendLike } from "../../services/postLikesService";
import { useNavigate } from "react-router-dom";

export const handleLikeBtn = (postId, currentUserId) => {
  sendLike(postId, currentUserId);
};
