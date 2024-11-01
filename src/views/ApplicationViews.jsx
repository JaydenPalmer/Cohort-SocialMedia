import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { PostList } from "../components/posts/PostList";
import { NavBar } from "../components/nav/NavBar";
import { PostDetails } from "../components/posts/PostDetails";
import { NewPost } from "../components/newpost/NewPost";
import { MyPosts } from "../components/myposts/MyPosts";
import { EditPost } from "../components/edit/EditPost";
import { Favorites } from "../components/favorites/Favorites";
import { Profile } from "../components/profile/Profile";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user");
    const learningUserObj = JSON.parse(localLearningUser);

    setCurrentUser(learningUserObj);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar currentUser={currentUser} />
            <Outlet />
          </>
        }
      >
        <Route path="posts">
          <Route index element={<PostList />} />
          <Route path=":postId" element={<PostDetails />} />
        </Route>
        <Route path="newpost">
          <Route index element={<NewPost />} />
        </Route>
        <Route path="myposts">
          <Route index element={<MyPosts />} />
        </Route>
        <Route path="edit">
          <Route index element={<EditPost />} />
        </Route>
        <Route path="favorites">
          <Route index element={<Favorites />} />
        </Route>
        <Route path="profile">
          <Route index path=":userId" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};
