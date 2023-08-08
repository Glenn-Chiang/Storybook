/* eslint-disable react/prop-types */
import { useState } from 'react';
import Post from './Post/Post'
import Alert from "./Alert"

export default function PostsList({ posts}) {
  const [alert, setAlert] = useState(null);
  const flashAlert = (message) => {
    setAlert(message);
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <section className="bg-transparent">
      <ul className="flex flex-col gap-8 pt-4">
        {
          posts.map((post) => (
            <li key={post.id}>
              <Post post={post} flashAlert={flashAlert}/>
            </li>
          ))}
      </ul>
      {alert && <Alert>{alert}</Alert>}
    </section>
  );
}
