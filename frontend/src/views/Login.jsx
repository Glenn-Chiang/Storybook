import { useForm } from "react-hook-form";
import ErrorAlert from "../components/ErrorAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faSignIn,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { ConfirmButton } from "../components/buttons";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    const { username, password } = formData;
  };

  return (
    <section className="bg-white rounded-xl flex flex-col items-center p-4 inset-x-0 m-auto">
      <h1 className="p-4 flex gap-2 items-center">
        <FontAwesomeIcon icon={faSignIn} />
        Login
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-4 p-4"
      >
        <div className="flex flex-col gap-2 ">
          <label htmlFor="username" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faUserCircle} />
            Username
          </label>
          <input
            className="p-2 rounded-lg w-80 bg-slate-100"
            type="username"
            id="username"
            {...register("username", { required: "Username cannot be empty" })}
          />
        </div>
        {errors.username && <ErrorAlert>{errors.username.message}</ErrorAlert>}
        <div className="flex flex-col gap-2 ">
          <label htmlFor="password" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faLock} />
            Password
          </label>
          <input
            className="p-2 rounded-lg w-80 bg-slate-100"
            type="password"
            id="password"
            {...register("password", { required: "Password cannot be empty" })}
          />
        </div>
        {errors.password && <ErrorAlert>{errors.password.message}</ErrorAlert>}
        <ConfirmButton>Login</ConfirmButton>
      </form>
    </section>
  );
}
