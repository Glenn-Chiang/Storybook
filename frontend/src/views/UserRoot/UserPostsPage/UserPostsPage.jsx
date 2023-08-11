/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useParams } from "react-router-dom";
import PostFeed from "../../../components/PostFeed";
import postService from "../../../services/postService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function UserPostsPage() {
  const [sortBy, setSortBy] = useState("datePosted");
  const [sortOrder, setSortOrder] = useState("desc");

  const userId = useParams().userId;

  const {
    isLoading,
    isError,
    data: posts,
  } = useQuery(["posts", userId, "own", sortBy, sortOrder], () =>
    postService.getByUser(userId, sortBy, sortOrder)
  );

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (postId) => postService.deletePost(postId),
    {
      onSuccess: () => queryClient.invalidateQueries(["posts", userId, "own"]),
    }
  );

  const likeMutation = useMutation(
    (postId) => postService.like(postId), {
  });

  return (
    <main>
      <h1>
        <FontAwesomeIcon icon={faBookOpen} />
        Posts
      </h1>
      <PostFeed
        isLoading={isLoading}
        isError={isError}
        posts={posts}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        handleDelete={(postId) => deleteMutation.mutate(postId)}
        handleLike={(postId) => likeMutation.mutate(postId)}
      />
    </main>
  );
}
