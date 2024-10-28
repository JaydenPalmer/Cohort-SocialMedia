import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostByPostId } from "../../services/postsService";

export const PostDetails = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    getPostByPostId(postId).then((postObj) => {
      //data comes through as an object, not an array.
      //quite strange
      setPost(postObj);
    });
  }, [postId]);

  return <div>this worked yay</div>;
};
