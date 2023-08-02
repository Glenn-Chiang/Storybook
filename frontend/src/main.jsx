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
import Home from "./views/Home";
import Root from "./views/Root";
import UserRoot from "./views/UserRoot/UserRoot";
import Profile from "./views/UserRoot/Profile/Profile";
import UserPostsPage from "./views/UserRoot/userPostsPage";
import CommentsPage from "./views/UserRoot/CommentsPage";
import FriendsPage from "./views/UserRoot/FriendsPage";
import LikedPostsPage from "./views/UserRoot/LikedPostsPage";

import GroupRoot from "./views/GroupPages/GroupRoot";
import InfoPage from "./views/GroupPages/InfoPage";
import GroupPostsPage from "./views/GroupPages/GroupPostsPage";
import MembersPage from "./views/GroupPages/MembersPage";

import { loader as profileLoader } from "./views/UserRoot/Profile/loader";
import { loader as userLoader } from "./views/UserRoot/loader";

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
        element: <UserRoot />,
        loader: userLoader,
        children: [
          {
            path: "posts",
            element: <UserPostsPage />,
          },
          {
            path: "likedPosts",
            element: <LikedPostsPage />,
          },
          {
            path: "comments",
            element: <CommentsPage />,
          },
          {
            path: "friends",
            element: <FriendsPage />,
          },
          {
            path: "profile",
            element: <Profile />,
            loader: profileLoader,
          },
        ],
      },
      {
        path: "/groups/:groupId",
        element: <GroupRoot />,
        children: [
          {
            path: "posts",
            element: <GroupPostsPage />,
          },
          {
            path: "info",
            element: <InfoPage />,
          },
          {
            path: "members",
            element: <MembersPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
