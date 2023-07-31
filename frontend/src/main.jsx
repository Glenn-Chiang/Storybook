import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Browse from "./views/Browse";
import MyPosts from "./views/MyPosts";
import Profile from "./views/Profile/Profile";
import { loader as profileLoader } from "./views/Profile/loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={'/myPosts'}/>,
  },
  {
    path: "/myPosts",
    element: <MyPosts/>
  },
  {
    path: "/profile/:userId",
    element: <Profile />,
    loader: profileLoader
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
