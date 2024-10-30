import { getTopics } from "../../services/topicsService";
import { PostFilterDropdown } from "../posts/PostFilterDropdown";
import { useState, useEffect, useMemo } from "react";
import "./NewPost.css";

export const NewPost = () => {
  const [allTopics, setAllTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState(0);

  const currentUserId = useMemo(() => {
    return JSON.parse(localStorage.getItem("learning_user"))?.id;
  }, []);

  useEffect(() => {
    getTopics().then((topicsArray) => {
      setAllTopics(topicsArray);
      console.log("topics have been gathered");
    });
  }, []);

  return (
    <div className="Nposts-container">
      <h2 id="Ntitles">New Post</h2>
      <section className="Npost">
        <PostFilterDropdown
          className="dropdown-content"
          topic={allTopics}
          setSelectedTopicId={setSelectedTopicId}
        />
        <div className="Npost-info-title">
          <span>Title : </span>
          <input
            className="Npost-info-input"
            type="text"
            placeholder="TITLE"
          ></input>
        </div>
        <div className="Npost-info-title">
          <span>Body : </span>
          <input
            className="Npost-info-input"
            type="text"
            placeholder="BODY"
          ></input>
        </div>
        <footer className="Nfooter">
          <button id="Npost-info-post-btn">MAKE POST</button>
        </footer>
      </section>
    </div>
  );
};
