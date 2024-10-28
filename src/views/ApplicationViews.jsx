import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { PostList } from "../components/posts/PostList";
import { NavBar } from "../components/nav/NavBar";

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
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<PostList />} />
      </Route>
    </Routes>
  );
};
