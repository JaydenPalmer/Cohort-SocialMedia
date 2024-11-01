import { getTopics } from "../../services/topicsService";
import { PostFilterDropdown } from "../posts/PostFilterDropdown";
import { useState, useEffect, useMemo } from "react";
import {
  getOnePostById,
  sendPost,
  updatePost,
} from "../../services/postsService";
import { useLocation, useNavigate } from "react-router-dom";

export const EditPost = () => {
  const [allTopics, setAllTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedTopicId, setSelectedTopicId] = useState(0);
  const [sendThePostBtn, setSendThePostBtn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.state?.postId;

  const currentUserId = useMemo(() => {
    return JSON.parse(localStorage.getItem("learning_user"))?.id;
  }, []);

  useEffect(() => {
    getOnePostById(postId).then((post) => {
      setTitle(post.title);
      setBody(post.body);
      setSelectedTopicId(post.topicId);
      setDate(new Date(post.date));
    });
  }, [postId]);

  useEffect(() => {
    getTopics().then((topicsArray) => {
      setAllTopics(topicsArray);
      console.log("topics have been gathered");
    });
  }, [sendThePostBtn]);

  useEffect(() => {
    if (selectedTopicId > 0 && title && body) {
      if (sendThePostBtn) {
        const updatedPost = {
          id: postId,
          userId: currentUserId,
          topicId: selectedTopicId,
          title: title,
          body: body,
          date: date,
        };

        updatePost(updatedPost).then(() => {
          setSendThePostBtn(false);
          navigate("/myposts");
        });
      }
    } else {
      setSendThePostBtn(false);
    }
  }, [sendThePostBtn, title, body, selectedTopicId]);

  return (
    <div className="Nposts-container">
      <h2 id="Ntitles">New Post</h2>
      <section className="Npost">
        <PostFilterDropdown
          className="dropdown-content"
          topic={allTopics}
          value={selectedTopicId}
          setSelectedTopicId={setSelectedTopicId}
        />
        <div className="Npost-info-title">
          <span>Title : </span>
          <input
            className="Npost-info-input"
            type="text"
            placeholder={title}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>
        </div>
        <div className="Npost-info-title">
          <span>Body : </span>
          <textarea
            value={body}
            className="Npost-info-input"
            type="text"
            placeholder={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </div>
        <footer className="Nfooter">
          <div className="Npost-info-date">{date.toLocaleDateString()}</div>
          <button
            id="Npost-info-post-btn"
            onClick={() => setSendThePostBtn(true)}
          >
            Update Post
          </button>
        </footer>
      </section>
    </div>
  );
};
