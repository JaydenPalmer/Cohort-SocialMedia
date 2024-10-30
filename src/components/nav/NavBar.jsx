import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="posts">
          All Posts
        </Link>
      </li>
      <li>
        <Link className="navbar-link" to="newpost">
          New Post
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
