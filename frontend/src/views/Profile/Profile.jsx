/* eslint-disable react/prop-types */
import { useLoaderData } from "react-router-dom";
import userService from "../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { EditButton } from "../../components/buttons";
import { useState } from "react";
import { CancelButton, ConfirmButton } from "../../components/buttons";
import { useForm } from "react-hook-form";

export default function Profile() {
  const currentUser = userService.getCurrentUser();
  const user = useLoaderData(); // User whose profile is shown
  const {
    id: userId,
    username,
    displayName,
    about,
    posts,
    comments,
    friends,
  } = user;
  const IsOwnProfile = currentUser.userId === userId;

  const [nameState, setNameState] = useState(displayName);
  const [aboutState, setAboutState] = useState(about);

  const [nameIsEditable, setNameIsEditable] = useState(false);
  const [aboutIsEditable, setAboutIsEditable] = useState(false);

  const handleSubmitName = async (formData) => {
    try {
      await userService.updateUser(userId, {
        ...user,
        displayName: formData.displayName,
      });
      setNameIsEditable(false);
      setNameState(formData.displayName);
    } catch (error) {
      console.log("Error updating display name", error);
    }
  };

  const handleSubmitAbout = async (formData) => {
    try {
      await userService.updateUser(userId, { ...user, about: formData.about });
      setAboutIsEditable(false);
      setAboutState(formData.about);
    } catch (error) {
      console.log("Error updating about", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1>
        <FontAwesomeIcon icon={faUserCircle} />
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
            {IsOwnProfile && (
              <EditButton onClick={() => setNameIsEditable(true)} />
            )}
          </p>
          {nameIsEditable ? (
            <NameForm
              defaultValue={nameState}
              onCancel={() => setNameIsEditable(false)}
              onSubmit={handleSubmitName}
            />
          ) : (
            <p className="text-slate-500">{nameState}</p>
          )}
        </div>
        <div>
          <p className="flex gap-2">
            About
            {IsOwnProfile && (
              <EditButton onClick={() => setAboutIsEditable(true)} />
            )}
          </p>
          {aboutIsEditable ? (
            <AboutForm
              defaultValue={aboutState}
              onCancel={() => setAboutIsEditable(false)}
              onSubmit={handleSubmitAbout}
            />
          ) : (
            <p className="text-slate-500 py-2">{addLineBreaks(aboutState) || "-"}</p>
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
        <div>
          <p>Friends</p>
          <p className="text-slate-500">{friends.length}</p>
        </div>
      </section>
    </div>
  );
}

function NameForm({ defaultValue, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-4">
      <input
        defaultValue={defaultValue}
        {...register("displayName", { required: true, maxLength: 50 })}
      />
      <div className="py-4 flex gap-2">
        <ConfirmButton>Confirm</ConfirmButton>
        <CancelButton onClick={onCancel} />
      </div>
    </form>
  );
}

function AboutForm({ defaultValue, onSubmit, onCancel }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-4">
      <textarea
        defaultValue={defaultValue}
        {...register("about", { required: true, maxLength: 500 })}
      />
      <div className="py-4 flex gap-2">
        <ConfirmButton>Confirm</ConfirmButton>
        <CancelButton onClick={onCancel} />
      </div>
    </form>
  );
}

const addLineBreaks = (text) => {
  return text.split("\n").map((line) => (
    <>
      {line}
      <br />
    </>
  ));
};
