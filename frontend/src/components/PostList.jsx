import PostPreview from "./PostPreview";

/* eslint-disable react/prop-types */
export default function PostList({ posts, handleDelete, handleLike }) {
  return (
    <section className="bg-transparent">
      <ul className="flex flex-col gap-8 pt-4">
        {posts.map((post) => (
          <li key={post.id}>
            <PostPreview postId={post.id} handleDelete={handleDelete} handleLike={handleLike}/>
          </li>
        ))}
      </ul>
    </section>
  );
}
