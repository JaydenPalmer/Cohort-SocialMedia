import { useEffect, useMemo, useState } from "react";
import { getUsers, updateProfile } from "../../services/userService";
import { getPosts } from "../../services/postsService";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const currentUserId = useMemo(() => {
    return JSON.parse(localStorage.getItem("learning_user"))?.id;
  }, []);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [currentUserPosts, setCurrentUserPosts] = useState(0);
  const [editBtn, setEditBtn] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: "",
    cohort: "",
  });

  const { userId } = useParams();

  useEffect(() => {
    getUsers().then((u) => {
      setUsers(u);
      getPosts().then((p) => {
        setPosts(p);
      });
    });
  }, [userId]);

  useEffect(() => {
    const filteredUsers = users.find((user) => user.id === parseInt(userId));
    setCurrentProfile(filteredUsers);

    if (filteredUsers) {
      setEditedProfile({
        id: parseInt(userId),
        name: filteredUsers.name,
        cohort: filteredUsers.cohort,
      });
    }
    const filteredPosts =
      posts?.filter((post) => post.userId === parseInt(userId)) || [];
    setCurrentUserPosts(filteredPosts.length);
  }, [users, posts, userId]);

  const handleEditProfile = () => {
    setEditBtn(true);
  };

  const handleSaveProfile = () => {
    updateProfile(editedProfile).then(() => {
      setCurrentProfile({
        ...currentProfile,
        ...editedProfile,
      });
      setEditBtn(false);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (userId != currentUserId) {
    return (
      <div className="Dpost-container">
        <h2 id="Dtitles">Profile</h2>
        <section className="Dpost">
          <div className="Dpost-info-title">
            <span>Name : </span>
            {currentProfile?.name}
          </div>
          <div className="Dpost-info-title">
            <span>Cohort : </span>
            {currentProfile?.cohort}
          </div>
          <footer className="Dfooter">
            <div className="Dpost-info-date">
              <span>Number of Posts : </span>
              {currentUserPosts}
            </div>
          </footer>
        </section>
      </div>
    );
  } else {
    if (editBtn) {
      return (
        <div className="Dpost-container">
          <h2 id="Dtitles">Edit Profile</h2>
          <section className="Dpost">
            <div className="Dpost-info-title">
              <span>Name : </span>
              <input
                type="text"
                name="name"
                value={editedProfile.name}
                onChange={handleInputChange}
                className="Dpost-edit-input"
              />
            </div>
            <div className="Dpost-info-title">
              <span>Cohort : </span>
              <input
                type="text"
                name="cohort"
                value={editedProfile.cohort}
                onChange={handleInputChange}
                className="Dpost-edit-input"
              />
            </div>
            <footer className="Dfooter">
              <div className="Dpost-info-date">
                <span>Number of Posts : </span>
                {currentUserPosts}
              </div>
              <div className="Dpost-info-edit">
                <button
                  className="Dpost-info-edit-btn"
                  onClick={handleSaveProfile}
                >
                  SAVE PROFILE
                </button>
                <button
                  className="Dpost-info-edit-btn"
                  onClick={() => setEditBtn(false)}
                >
                  CANCEL
                </button>
              </div>
            </footer>
          </section>
        </div>
      );
    } else {
      return (
        <div className="Dpost-container">
          <h2 id="Dtitles">Profile</h2>
          <section className="Dpost">
            <div className="Dpost-info-title">
              <span>Name : </span>
              {currentProfile?.name}
            </div>
            <div className="Dpost-info-title">
              <span>Cohort : </span>
              {currentProfile?.cohort}
            </div>
            <footer className="Dfooter">
              <div className="Dpost-info-date">
                <span>Number of Posts : </span>
                {currentUserPosts}
              </div>
              <div className="Dpost-info-edit">
                <button
                  className="Dpost-info-edit-btn"
                  onClick={handleEditProfile}
                >
                  EDIT PROFILE
                </button>
              </div>
            </footer>
          </section>
        </div>
      );
    }
  }
};
