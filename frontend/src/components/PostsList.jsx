/* eslint-disable react/prop-types */
import Post from './Post/Post'

export default function PostsList({ posts, setPosts}) {
  return (
    <section className="bg-transparent">
      <ul className="flex flex-col gap-8 pt-4">
        {
          posts.map((post) => (
            <li key={post.id}>
              <Post post={post} setPosts={setPosts} />
            </li>
          ))}
      </ul>
    </section>
  );
}
