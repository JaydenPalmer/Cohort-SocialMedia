import { useEffect } from "react";
import { useState } from "react";
import { getPosts } from "../../services/postsService";
import { getTopics } from "../../services/topicsService";
import { PostFilterDropdown } from "./PostFilterDropdown";
import { Post } from "./Post";
import "./posts.css";
import "./dropdown.css";
import { Link } from "react-router-dom";

export const PostList = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [dropFilterPosts, setDropFilterPosts] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(0);

  useEffect(() => {
    getPosts().then((postsArray) => {
      setAllPosts(postsArray);
      console.log("posts have been gathered...");
    });
  }, []);

  useEffect(() => {
    getTopics().then((topicsArray) => {
      setAllTopics(topicsArray);
      console.log("topics have been gathered");
    });
  }, []);

  useEffect(() => {
    if (selectedTopicId === 0) {
      setDropFilterPosts(allPosts);
    } else {
      const filteredDrop = allPosts.filter(
        (post) => post.topicId === selectedTopicId
      );
      setDropFilterPosts(filteredDrop);
    }
  }, [selectedTopicId, allPosts]);

  return (
    <div className="posts-container">
      <h2>Posts</h2>
      <section>
        {
          <PostFilterDropdown
            topic={allTopics}
            setSelectedTopicId={setSelectedTopicId}
          />
        }
      </section>

      <article className="posts">
        {dropFilterPosts.map((postObj) => {
          return <Post post={postObj} key={postObj.id} />;
        })}
      </article>
    </div>
  );
};
