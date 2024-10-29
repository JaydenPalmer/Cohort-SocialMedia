import { sendLike } from "../../services/postLikesService";

export const handleLikeBtn = (postId, currentUserId) => {
  sendLike(postId, currentUserId);
};
