/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import postService from "../services/postService";
import Header from "../components/Header";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PostFeed from "../components/PostFeed";

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

  const { isLoading, isError, data } = useQuery(
    ["posts", "all", sortBy, sortOrder],
    () => postService.getAll(sortBy, sortOrder)
  );

  const queryClient = useQueryClient()

  const deleteMutation = useMutation(
    (postId) => postService.deletePost(postId),
    {
      onSuccess: () => queryClient.invalidateQueries(["posts", "all"]),
    }
  );

  return (
    <main>
      <div className="flex flex-col items-center">
        <Header />
      </div>
      <PostFeed
        isLoading={isLoading}
        isError={isError}
        posts={data}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        handleDelete={(postId) => deleteMutation.mutate(postId)}
      ></PostFeed>
    </main>
  );
}
