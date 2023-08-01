import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Profile from "./views/Profile/Profile";
import { loader as profileLoader } from "./views/Profile/loader";
// import { userPostsLoader, allPostsLoader } from "./views/UserPosts/loaders";
import UserPosts from "./views/UserPosts/UserPosts";
import Home from "./views/Home";
import Root from "./views/Root";
import LikedPosts from "./views/LikedPosts";
import CommentsPage from "./views/CommentsPage";
import UserRoot from "./views/UserRoot";
import FriendsPage from "./views/Friendspage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/posts"} />,
      },
      {
        path: "/posts",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/users/:userId",
        element: <UserRoot/>,
        children: [
          {
            path: "posts",
            element: <UserPosts />,
          },
          {
            path: "likedPosts",
            element: <LikedPosts/>
          },
          {
            path: "comments",
            element: <CommentsPage/>
          },
          {
            path: "friends",
            element: <FriendsPage/>
          },
          {
            path: "profile",
            element: <Profile />,
            loader: profileLoader,
          },
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
