/* eslint-disable react/prop-types */
import Post from './Post'

export default function PostsList({ posts, setPosts }) {
  return (
    <section className="">
      <ul className="flex flex-col gap-8 pt-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <Post post={post} setPosts={setPosts} />
            </li>
          ))
        ) : (
          <p className="text-slate-400 text-center p-4">You have not created any posts</p>
        )}
      </ul>
    </section>
  );
}
