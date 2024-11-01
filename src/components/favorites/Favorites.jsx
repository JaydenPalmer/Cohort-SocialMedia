import { useEffect, useMemo, useState } from "react";
import { deletePost, getPosts } from "../../services/postsService";
import { Post } from "../posts/Post";
import { Link, useNavigate } from "react-router-dom";
import { deleteLike, getLikesByUserId } from "../../services/postLikesService";

export const Favorites = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();

  const currentUserId = useMemo(() => {
    return JSON.parse(localStorage.getItem("learning_user"))?.id;
  }, []);

  // Fetch liked posts
  useEffect(() => {
    getLikesByUserId(currentUserId).then((likesArray) => {
      if (Array.isArray(likesArray)) {
        setLikedPosts(likesArray);
      } else {
        setLikedPosts([]);
      }
    });
  }, [currentUserId]);

  // Handle unlike/remove from favorites
  const handleUnlike = async (likeId) => {
    try {
      await deleteLike(likeId);
      setLikedPosts((prevLikes) =>
        prevLikes.filter((like) => like.id !== likeId)
      );
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
    }
  };

  return (
    <div className="posts-container">
      <h2 id="titles">My Favorites</h2>

      <article className="posts">
        {likedPosts.map((like) => {
          return (
            <section key={like.id} className="post">
              <Link className="post-info-title" to={`/posts/${like.post.id}`}>
                <h2 className="post-info">{like.post.title}</h2>
              </Link>
              <button
                onClick={() => handleUnlike(like.id)}
                className="Dpost-info-delete-btn"
              >
                Remove from Favorites
              </button>
            </section>
          );
        })}
      </article>
    </div>
  );
};
