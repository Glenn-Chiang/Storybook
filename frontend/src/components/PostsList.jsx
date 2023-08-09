/* eslint-disable react/prop-types */
import { useState } from 'react';
import Post from './Post/Post'
import { ErrorAlert, SuccessAlert } from './Alert';

export default function PostsList({ posts}) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)

  const flashAlert = (message, status) => {
    if (status === "success") {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(null), 2000);
    } else {
      setErrorMessage(message)
      setTimeout(() => setErrorMessage(null), 2000) // TODO: Instead of timing out, error alert shoudl remain displayed until the user chooses to close it
    }
  };

  return (
    <section className="bg-transparent">
      <ul className="flex flex-col gap-8 pt-4">
        {
          posts.map((post) => (
            <li key={post.id}>
              <Post postId={post.id} flashAlert={flashAlert}/>
            </li>
          ))}
      </ul>
      {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}
      {errorMessage && <ErrorAlert>{errorMessage}</ErrorAlert>}
    </section>
  );
}
