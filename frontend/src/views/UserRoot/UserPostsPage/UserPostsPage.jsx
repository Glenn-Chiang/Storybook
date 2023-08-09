/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useParams } from "react-router-dom";
import PostsPageLayout from "../../../components/PostsPageLayout";
import postService from "../../../services/postService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";

export default function UserPostsPage() {
  const [sortBy, setSortBy] = useState("datePosted");
  const [sortOrder, setSortOrder] = useState("desc");

  const userId = useParams().userId;

  const { isLoading, isError, data } = useQuery(
    ["posts", sortBy, sortOrder],
    () => postService.getByUser(userId, sortBy, sortOrder)
  );

  return (
    <main>
      <h1>
        <FontAwesomeIcon icon={faBookOpen} />
        Posts
      </h1>

      <PostsPageLayout
        isLoading={isLoading}
        isError={isError}
        posts={data}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
      />
    </main>
  );
}
