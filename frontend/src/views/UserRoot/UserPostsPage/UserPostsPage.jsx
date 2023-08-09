/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useParams } from "react-router-dom";
import PostsPageLayout from "../../../components/PostsPageLayout";
import postService from "../../../services/postService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import ErrorAlert from "../../../components/ErrorAlert";

export default function UserPostsPage() {
  const [sortBy, setSortBy] = useState("datePosted");
  const [sortOrder, setSortOrder] = useState("desc");

  const userId = useParams().userId;

  const { isLoading, isError, data, error } = useQuery("posts", () =>
    postService.getByUser(userId, sortBy, sortOrder)
  );

  return (
    <main>
      <h1>
        <FontAwesomeIcon icon={faBookOpen} />
        Posts
      </h1>
      {isLoading ? (
        <section>Loading posts...</section>
      ) : isError ? (
        <section>
          <ErrorAlert>{error.message}</ErrorAlert>
        </section>
      ) : (
        <PostsPageLayout
          posts={data}
          setSortBy={setSortBy}
          setSortOrder={setSortOrder}
        ></PostsPageLayout>
      )}
    </main>
  );
}
