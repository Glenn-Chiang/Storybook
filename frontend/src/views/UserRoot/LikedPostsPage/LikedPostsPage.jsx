import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../../../services/postService";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PostFeed from "../../../components/PostFeed";

export default function LikedPostsPage() {
  const [sortBy, setSortBy] = useState("datePosted");
  const [sortOrder, setSortOrder] = useState("desc");

  const userId = useParams().userId;

  const {
    data: likedPosts,
    isLoading,
    isError,
  } = useQuery(["posts", userId, "liked", sortBy, sortOrder], () =>
    postService.getLikedByUser(userId, sortBy, sortOrder)
  );

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (postId) => postService.deletePost(postId),
    {
      onSuccess: () => queryClient.invalidateQueries(["posts", userId, "liked"]),
    }
  );

  const likeMutation = useMutation((postId) => postService.like(postId), {
    onSuccess: () => queryClient.invalidateQueries(["posts", userId]) 
  });

  return (
    <main>
      <h1>
        <FontAwesomeIcon icon={faBookBookmark} />
        Liked Posts
      </h1>
      <PostFeed
        isLoading={isLoading}
        isError={isError}
        posts={likedPosts}
        sortBy={setSortBy}
        setSortOrder={setSortOrder}
        handleDelete={(postId) => deleteMutation.mutate(postId)}
        handleLike={(postId) => likeMutation.mutate(postId)}
      />
    </main>
  );
}
