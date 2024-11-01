import "./NavBar.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate();

  const { userId } = useParams();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="posts">
          All Posts
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="newpost">
          New Post
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="myposts">
          My Posts
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="favorites">
          Favorites
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to={`/profile/${currentUser?.id}`}>
          Profile
        </Link>
      </li>
      {localStorage.getItem("learning_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("learning_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
