import { useEffect, useState } from "react";
import { getTopics } from "../../services/topicsService";
import { getLikes } from "../../services/postLikesService";

export const Post = ({ post }) => {
  const [likes, setLikes] = useState([]);
  const [topics, setTopics] = useState([]);
  const [assignedLikes, setAssignedLikes] = useState(0);
  const [assignedTopics, setAssignedTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsArray) => {
      setTopics(topicsArray);
    });
  }, []);

  useEffect(() => {
    getLikes().then((likeArray) => {
      setLikes(likeArray);
    });
  }, []);

  useEffect(() => {
    const foundTopic = topics.find((current) => current.id === post.topicId);
    setAssignedTopics(foundTopic);
  }, [topics, post]);

  useEffect(() => {
    const foundLikes = likes.filter((current) => current.postId === post.id);
    setAssignedLikes(foundLikes.length);
  }, [likes, post]);

  return (
    <section className="post">
      <h2 className="post-info">{post.title}</h2>
      <div>
        <div className="post-info">{assignedTopics?.name}</div>
        <div className="post-info">{assignedLikes} Likes</div>
      </div>
    </section>
  );
};
