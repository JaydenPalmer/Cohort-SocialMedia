import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostByPostId } from "../../services/postsService";
import { PostDetailsLikes } from "../likes/PostDetailsLikes";
import { getLikes } from "../../services/postLikesService";

export const PostDetails = () => {
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState({});
  const [whoPosted, setWhoPosted] = useState({});
  const [refreshLikes, setRefreshLikes] = useState(false);
  const { postId } = useParams();

  useEffect(() => {
    getPostByPostId(postId).then((postObj) => {
      //data comes through as an object, not an array.
      //quite strange
      const whoPostedThis = postObj.userId;
      setPost(postObj);
      setWhoPosted(whoPostedThis);
    });
  }, [postId]);

  useEffect(() => {
    getLikes().then((likeArray) => {
      const filteredLikes = likeArray.filter(
        (item) => item.postId === whoPosted
      );
      console.log(filteredLikes);
      setLikes(filteredLikes);
    });
  }, [whoPosted, refreshLikes]);

  return (
    <div className="Dpost-container">
      <h2 id="Dtitles">Post Details</h2>
      <section className="Dpost">
        <div className="Dpost-info-title">
          <span>Title : </span>
          {post.title}
        </div>
        <div className="Dpost-info-title">
          <span>Topic : </span>
          {post.topic?.name}
        </div>
        <div className="Dpost-info-title">
          <span>Author : </span>
          {post.user?.name}
        </div>
        <div className="Dpost-info Dpost-body">{post.body}</div>
        <footer className="Dfooter">
          <div className="Dpost-info-date">
            <span>Date Posted : </span>
            {post.created}
          </div>

          <div>
            <PostDetailsLikes
              whoPosted={whoPosted}
              numberOfLikes={likes}
              postId={post.id}
              onLikeChange={() => setRefreshLikes((prev) => !prev)}
            />
          </div>
        </footer>
      </section>
    </div>
  );
};
