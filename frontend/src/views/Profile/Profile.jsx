/* eslint-disable react/prop-types */
import { useLoaderData } from "react-router-dom";
import userService from "../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import LinkButton from "../../components/LinkButton";
import {
  CancelButton,
  ConfirmButton,
  EditButton,
} from "../../components/buttons";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Profile() {
  const currentUser = userService.getCurrentUser();
  const user = useLoaderData(); // User whose profile is shown
  const { id: userId, username, displayName, about, posts, comments } = user;

  const [nameState, setNameState] = useState(displayName);
  const [aboutState, setAboutState] = useState(about);

  const [nameIsEditable, setNameIsEditable] = useState(false);
  const [aboutIsEditable, setAboutIsEditable] = useState(false);

  const handleSubmitName = async (formData) => {
    const displayName = formData.content;
    try {
      await userService.updateUser(userId, { ...user, displayName });
      setNameIsEditable(false);
      setNameState(displayName);
    } catch (error) {
      console.log("Error updating display name", error);
    }
  };

  const handleSubmitAbout = async (formData) => {
    const about = formData.content;
    try {
      await userService.updateUser(userId, { ...user, about });
      setAboutIsEditable(false);
      setAboutState(about);
    } catch (error) {
      console.log("Error updating about", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="p-4">
        <FontAwesomeIcon icon={faUserCircle} />
        {currentUser.userId === userId ? " My " : `${username}'s `}
        Profile
      </h1>
      <section className="flex flex-col gap-4 inset-x-0 m-auto bg-white rounded-xl p-4">
        <div>
          <p>Username</p>
          <p className="text-slate-500">{username}</p>
        </div>
        <div>
          <p className="flex gap-2">
            Display name
            {currentUser.userId === userId && (
              <EditButton onClick={() => setNameIsEditable(true)} />
            )}
          </p>
          {nameIsEditable ? (
            <EditForm
              defaultValue={nameState}
              onCancel={() => setNameIsEditable(false)}
              onSubmit={handleSubmitName}
              maxLength={50}
            />
          ) : (
            <p className="text-slate-500">{nameState}</p>
          )}
        </div>
        <div>
          <p className="flex gap-2">
            About
            {currentUser.userId === userId && (
              <EditButton onClick={() => setAboutIsEditable(true)} />
            )}
          </p>
          {aboutIsEditable ? (
            <EditForm
              defaultValue={aboutState}
              onCancel={() => setAboutIsEditable(false)}
              onSubmit={handleSubmitAbout}
              maxLength={500}
            />
          ) : (
            <p className="text-slate-500">{aboutState || "-"}</p>
          )}
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

function EditForm({ defaultValue, onSubmit, onCancel, maxLength }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-4">
      <input
        defaultValue={defaultValue}
        {...register("content", { required: true, maxLength: maxLength })}
      />
      <div className="py-4 flex gap-2">
        <ConfirmButton>Confirm</ConfirmButton>
        <CancelButton onClick={onCancel} />
      </div>
    </form>
  );
}
