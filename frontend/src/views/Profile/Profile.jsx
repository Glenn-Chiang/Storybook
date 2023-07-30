import { useLoaderData } from "react-router-dom";
import userService from "../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import LinkButton from "../../components/LinkButton";

export default function Profile() {
  const currentUser = userService.getCurrentUser();
  const user = useLoaderData(); // User whose profile is shown
  const { id: userId, username, displayName, about, posts, comments } = user;

  return (
    <div className="flex flex-col items-center">
      <h1 className="p-4">
        <FontAwesomeIcon icon={faUserCircle} />
        {currentUser.userId === userId ? " My " : `${ username}'s `} 
        Profile
      </h1>
      <section className="flex flex-col gap-4 inset-x-0 m-auto bg-white rounded-xl p-4">
        <div>
          <p>Username</p>
          <p className="text-slate-500">{username}</p>
        </div>
        <div>
          <p>Display name</p>
          <p className="text-slate-500">{displayName}</p>
        </div>
        <div>
          <p>About</p>
          <p className="text-slate-500">{about || "-"}</p>
        </div>
        <div>
          <p>Posts</p>
          <p className="text-slate-500">{posts.length}</p>
        </div>
        <div>
          <p>Comments</p>
          <p className="text-slate-500">{comments.length}</p>
        </div>
      </section>
      <div className="p-8">
        <LinkButton to={"/"}>
          View {currentUser.userId === userId ? "my" : `${username}'s`} posts
        </LinkButton>
      </div>
    </div>
  );
}
