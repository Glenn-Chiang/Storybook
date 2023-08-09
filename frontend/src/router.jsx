import {
  createBrowserRouter,
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
import UserPostsPage from "./views/UserRoot/UserPostsPage/UserPostsPage";
import CommentsPage from "./views/UserRoot/CommentsPage/CommentsPage";
import FriendsPage from "./views/UserRoot/FriendsPage/FriendsPage";
import LikedPostsPage from "./views/UserRoot/LikedPostsPage/LikedPostsPage";

import GroupRoot from "./views/GroupPages/GroupRoot";
import InfoPage from "./views/GroupPages/InfoPage";
import GroupPostsPage from "./views/GroupPages/GroupPostsPage";
import MembersPage from "./views/GroupPages/MembersPage";

import { loader as userLoader } from "./views/UserRoot/loader";
import { loader as createPostLoader } from "./views/UserRoot/CreatePostPage/loader";
import { loader as profileLoader } from "./views/UserRoot/ProfilePage/loader";
import { loader as commentsLoader } from "./views/UserRoot/CommentsPage/loader";
import { loader as likedPostsLoader } from "./views/UserRoot/LikedPostsPage/loader";
import AddFriendPage from "./views/UserRoot/AddFriendPage/AddFriendPage";
import FriendRequestsPage from "./views/UserRoot/FriendRequestsPage/FriendRequestsPage";
import friendRequestsLoader from "./views/UserRoot/FriendRequestsPage/loader";
import { loader as addFriendLoader } from "./views/UserRoot/AddFriendPage/loader";
import { loader as friendsLoader } from "./views/UserRoot/FriendsPage/loader";
import CreatePostPage from "./views/UserRoot/CreatePostPage/CreatePostPage";

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
            path: "createPost",
            element: <CreatePostPage />,
            loader: createPostLoader,
          },
          {
            path: "posts",
            element: <UserPostsPage />,
          },
          {
            path: "comments",
            element: <CommentsPage />,
            loader: commentsLoader,
          },
          {
            path: "friends",
            element: <FriendsPage />,
            loader: friendsLoader,
          },
          {
            path: "profile",
            element: <ProfilePage />,
            loader: profileLoader,
          },
          {
            path: "likedPosts",
            element: <LikedPostsPage />,
            loader: likedPostsLoader,
          },
          {
            path: "addFriend",
            element: <AddFriendPage />,
            loader: addFriendLoader,
          },
          {
            path: "friendRequests",
            element: <FriendRequestsPage />,
            loader: friendRequestsLoader,
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

export default router