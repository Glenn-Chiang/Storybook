/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import postService from "../services/postService";
import Post from "../components/Post";
import CommentSection from "../components/CommentSection";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import userService from "../services/userService";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

export default function PostPage() {
  const postId = useParams().postId;
  const currentUser = userService.getCurrentUser();
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery(["posts", postId], () => postService.getById(postId), {
    onSuccess: (data) => {
      setLikeCount(data.likedBy.length);
      setLiked(data.likedBy.includes(currentUser.userId));
    },
  });

  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const likeMutation = useMutation(() => postService.like(post?.id), {
    onMutate: () => {
      // Optimistic update
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    },
    onError: (error) => {
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
      console.log(`Error liking post: ${error.message}`, "error");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", postId]); // Only refetch this post
      queryClient.invalidateQueries([
        "posts",
        "users",
        currentUser.userId,
        "liked",
      ]); // Unliking a post will remove it from LikedPostsPage, therefore we need to refetch likedPosts
    },
  });

  const handleLike = () => likeMutation.mutate();

  const editMutation = useMutation(
    (updateData) => postService.edit(post.id, updateData),
    {
      onMutate: () => {
        setEditModalVisible(false);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["posts", postId]); // Only refetch this post
        console.log("Changes saved!", "success");
      },
      onError: (error) => {
        console.log(`Error editing post: ${error.message}`, "error");
      },
    }
  );

  const handleEdit = (formData) => {
    editMutation.mutate({
      title: formData.title,
      content: formData.content,
      lastUpdated: new Date(),
    });
  };

  const deleteMutation = useMutation(() => postService.deletePost(post.id), {
    onMutate: () => {
      setDeleteModalVisible(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts"); // Refetch posts for current page
      console.log("Post deleted!", "success");
    },
    onError: (error) => {
      console.log(`Error deleting post: ${error.message}`, "error");
    },
  });

  const handleDelete = () => deleteMutation.mutate();

  if (isLoading) {
    return <section>Loading post...</section>;
  }

  if (isError) {
    return (
      <section>
        <ErrorMessage>Error loading post</ErrorMessage>
      </section>
    );
  }

  return (
    <>
      <main className="p-4 flex flex-col gap-4">
        <Post
          post={post}
          liked={liked}
          likeCount={likeCount}
          handleLike={handleLike}
          showEdit={() => setEditModalVisible(true)}
          showDelete={() => setDeleteModalVisible(true)}
        />
        <CommentSection postId={postId} />
      </main>
      {editModalVisible && (
        <EditModal
          closeModal={() => setEditModalVisible(false)}
          handleSubmit={handleEdit}
        />
      )}
      {deleteModalVisible && (
        <DeleteModal
          closeModal={() => setDeleteModalVisible(false)}
          onSubmit={handleDelete}
          resourceType={"post"}
        />
      )}
    </>
  );
}
