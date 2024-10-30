import { useEffect, useMemo, useState } from "react";
import { deletePost, getPosts } from "../../services/postsService";
import { Post } from "../posts/Post";
import { Link } from "react-router-dom";

export const MyPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [userFilterPosts, setUserFilterPosts] = useState([]);

  const currentUserId = useMemo(() => {
    return JSON.parse(localStorage.getItem("learning_user"))?.id;
  }, []);

  useEffect(() => {
    getPosts().then((postsArray) => {
      setAllPosts(postsArray);
      console.log("posts have been gathered...");
    });
  }, []);

  useEffect(() => {
    const userPosts = allPosts.filter((post) => post.userId === currentUserId);
    setUserFilterPosts(userPosts);
  }, [allPosts]);

  const handleDeleteBtn = (postId) => {
    console.log(postId);
    return async () => {
      try {
        await deletePost(postId);
        setAllPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== postId)
        );
      } catch {
        console.error("Failed to delete post:", error);
      }
    };
    //deletePost(postId);
  };

  return (
    <div className="posts-container">
      <h2 id="titles">My Posts</h2>

      <article className="posts">
        {userFilterPosts.map((postObj) => {
          return (
            <section key={postObj.id} className="post">
              <Link className="post-info-title" to={`/posts/${postObj.id}`}>
                <h2 className="post-info">{postObj.title}</h2>
              </Link>
              <button
                onClick={handleDeleteBtn(postObj.id)}
                className="Dpost-info-delete-btn"
              >
                Delete Post
              </button>
            </section>
          );
        })}
      </article>
    </div>
  );
};
