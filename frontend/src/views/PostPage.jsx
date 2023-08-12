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
import { PostContext } from "../contexts/PostContext";
import BackButton from "../components/BackButton";

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

  const [liked, setLiked] = useState(
    post ? post.likedBy.includes(currentUser.userId) : false
  );
  const [likeCount, setLikeCount] = useState(post ? post.likedBy.length : 0);
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
    },
  });

  const handleLike = () => likeMutation.mutate();

  const editMutation = useMutation(
    (updateData) => postService.edit(post.id, updateData),
    {
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
    setEditModalVisible(false);
    editMutation.mutate({
      title: formData.title,
      content: formData.content,
      lastUpdated: new Date(),
    });
  };

  const deleteMutation = useMutation(() => postService.deletePost(post.id), {
    onSuccess: () => {
      console.log("Post deleted!", "success");
    },
    onError: (error) => {
      console.log(`Error deleting post: ${error.message}`, "error");
    },
  });

  const handleDelete = () => {
    setDeleteModalVisible(false);
    deleteMutation.mutate();
  };

  const [commentsVisible, setCommentsVisible] = useState(true);
  const toggleComments = () => setCommentsVisible((prev) => !prev);

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
    <PostContext.Provider value={post}>
      <div className="flex justify-start fixed left-2 bottom-2">
        <BackButton />
      </div>
      <main className="p-4 flex flex-col gap-4">
        <Post
          post={post}
          liked={liked}
          likeCount={likeCount}
          handleLike={handleLike}
          showEdit={() => setEditModalVisible(true)}
          showDelete={() => setDeleteModalVisible(true)}
          toggleComments={toggleComments}
        />
        {commentsVisible && <CommentSection postId={postId} />}
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
    </PostContext.Provider>
  );
}
