import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Root from "./views/Root";

import Login from "./views/AuthPages/Login";
import Register from "./views/AuthPages/Register";
import Logout from "./views/AuthPages/Logout";
import { loader as loginLoader, logoutLoader } from "./views/AuthPages/loaders";
import AllPostsPage from "./views/AllPostsPage";
import UsersPage from "./views/UsersPage/UsersPage";
import { loader as usersLoader } from "./views/UsersPage/loader";

import UserRoot from "./views/UserRoot/UserRoot";
import ProfilePage from "./views/UserRoot/ProfilePage/ProfilePage";
import UserPostsPage from "./views/UserRoot/userPostsPage";
import CommentsPage from "./views/UserRoot/CommentsPage/CommentsPage";
import FriendsPage from "./views/UserRoot/FriendsPage/FriendsPage";
import LikedPostsPage from "./views/UserRoot/LikedPostsPage/LikedPostsPage";

import GroupRoot from "./views/GroupPages/GroupRoot";
import InfoPage from "./views/GroupPages/InfoPage";
import GroupPostsPage from "./views/GroupPages/GroupPostsPage";
import MembersPage from "./views/GroupPages/MembersPage";

import { loader as profileLoader } from "./views/UserRoot/ProfilePage/loader";
import { loader as userLoader } from "./views/UserRoot/loader";
import { loader as commentsLoader } from "./views/UserRoot/CommentsPage/loader";
import { loader as likedPostsLoader } from "./views/UserRoot/LikedPostsPage/loader";

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
        element: <AllPostsPage />,
      },
      {
        path: "/login",
        element: <Login />,
        loader: loginLoader,
      },
      {
        path: "/register",
        element: <Register />,
        loader: loginLoader,
      },
      {
        path: "/logout",
        element: <Logout />,
        loader: logoutLoader,
      },
      {
        path: "/users",
        element: <UsersPage />,
        loader: usersLoader,
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
            loader: likedPostsLoader,
          },
          {
            path: "comments",
            element: <CommentsPage />,
            loader: commentsLoader,
          },
          {
            path: "friends",
            element: <FriendsPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
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
