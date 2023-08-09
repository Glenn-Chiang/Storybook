import { useState } from "react";
import postService from "../services/postService";
import Header from "../components/Header";
import PostsPageLayout from "../components/PostsPageLayout";
import { useQuery } from "react-query";
import ErrorMessage from "../components/ErrorMessage";

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
export default function AllPostsPage() {
  const sortFields = [
    { value: "datePosted", label: "Date posted" },
    { value: "lastUpdated", label: "Last updated" },
  ];
  const sortOrders = [
    { value: "desc", label: "newest" },
    { value: "asc", label: "oldest" },
  ];
  const [sortBy, setSortBy] = useState(sortFields[0].value);
  const [sortOrder, setSortOrder] = useState(sortOrders[0].value);

  const { isLoading, isError, data, error } = useQuery(
    ["posts", sortBy, sortOrder],
    () => postService.getAll(sortBy, sortOrder)
  );

  return (
    <main>
      <div className="flex flex-col items-center">
        <Header />
      </div>
      {isLoading ? (
        <section>Loading...</section>
      ) : isError ? (
        <section>
          <ErrorMessage>Error: {error.message}</ErrorMessage>
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
