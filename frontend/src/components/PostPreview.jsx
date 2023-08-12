/* eslint-disable react/prop-types */
import {
  faCalendarCheck,
  faCalendarPlus,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DeleteButton, LikeButton } from "./buttons";
import { useState } from "react";
import userService from "../services/userService";
import NameLink from "./NameLink";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import postService from "../services/postService";

export default function PostPreview({ postId, handleDelete }) {
  const currentUser = userService.getCurrentUser();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const {
    isLoading,
    isError,
    data: post,
  } = useQuery(["posts", postId], () => postService.getById(postId), {
    onSuccess: (data) => {
      setLikeCount(data.likedBy.length);
      setLiked(data.likedBy.includes(currentUser.userId));
    },
  });

  const IsOwnPost = currentUser && currentUser.userId === post?.author?.id;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const queryClient = useQueryClient();
  const likeMutation = useMutation(() => postService.like(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", currentUser.userId, "liked"]) // LikedPosts should be refetched whenever user likes or unlikes a post
      queryClient.invalidateQueries(["posts", postId])
    },
    onMutate: () => {
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
      setLiked((prev) => !prev);
    },
  });

  if (isLoading) {
    return <section>Loading post...</section>;
  }

  if (isError) {
    return <section>Error loading post...</section>;
  }

  return (
    <article value={post}>
      <div className="flex justify-between flex-col gap-4 shadow p-6 rounded-xl bg-white">
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col items-start gap-2 w-full">
            <h2>
              <Link
                to={`/posts/${post.id}`}
                className="hover:underline underline-offset-8"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-sky-500 flex gap-2">
              <NameLink
                to={`/users/${post.author?.id}/profile`}
                name={post.author ? post.author.displayName : "Guest user"}
                isSelf={IsOwnPost}
              />
            </p>
            <p className="flex gap-4">
              <span className="flex gap-2 items-center text-slate-400">
                <FontAwesomeIcon icon={faCalendarPlus} />
                Date posted
              </span>
              <span className="text-slate-400">{post.datePosted}</span>
            </p>
            <p className="flex gap-4">
              <span className="flex gap-2 items-center text-slate-400">
                <FontAwesomeIcon icon={faCalendarCheck} />
                Last updated
              </span>
              <span className="text-slate-400">{post.lastUpdated}</span>
            </p>
            <p className="text-sky-900/75 w-full py-2 rounded ">
              {post.content}
            </p>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex gap-2 text-xl">
              <LikeButton
                liked={liked}
                onClick={likeMutation.mutate}
                likeCount={likeCount}
                disabled={!currentUser}
              />
              <CommentButton
                commentCount={post.comments.length}
                postId={post.id}
              />
            </div>
            <div className="flex text-xl gap-2 justify-center">
              {IsOwnPost && (
                <DeleteButton onClick={() => setDeleteModalVisible(true)} />
              )}
            </div>
          </div>
        </div>
      </div>
      {deleteModalVisible && (
        <DeleteModal
          closeModal={() => setDeleteModalVisible(false)}
          onSubmit={() => handleDelete(post.id)}
          resourceType={"post"}
        />
      )}
    </article>
  );
}

function CommentButton({ commentCount, postId }) {
  return (
    <div className="flex sm:flex-row-reverse gap-1">
      <Link
        to={`/posts/${postId}`}
        className="flex items-center justify-center text-white bg-sky-500 hover:bg-sky-600 w-8 h-8 rounded-xl"
      >
        <FontAwesomeIcon icon={faComment} />
      </Link>
      <span>{commentCount}</span>
    </div>
  );
}
