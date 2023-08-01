/* eslint-disable react/prop-types */
import {
  CancelButton,
  ConfirmButton,
} from "../../components/buttons";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

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

function ProfileLink({ route, children }) {
  return (
    <Link
      to={route}
      className="bg-sky-200 hover:bg-sky-300 text-sky-500 w-28 h-28 flex flex-col justify-center items-center gap-2 p-4 rounded-xl"
    >
      {children}
    </Link>
  );
}

export {NameForm, AboutForm, ProfileLink}
