/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {
  faClipboard,
  faEdit,
  faPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Modal from "./components/Modal";
import {
  ConfirmButton,
  CancelButton,
  EditButton,
  DeleteButton,
} from "./components/buttons";
import { useForm } from "react-hook-form";
import ErrorAlert from "./components/errorAlert";

export default function App() {
  const notes = [
    {
      id: 1,
      title: "Note 1",
      content: "some content",
    },
    {
      id: 2,
      title: "Note 2",
      content: "some other content",
    },
    {
      id: 3,
      title: "Note 3",
      content: "some other content",
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <Header />
      <AddNoteBox />
      <NotesList notes={notes} />
    </div>
  );
}

function Header() {
  return (
    <h1 className="text-4xl font-bold p-8 flex gap-4 items-center bg-sky-100 w-screen justify-center">
      <FontAwesomeIcon icon={faClipboard} />
      Nodepad
    </h1>
  );
}

function AddNoteBox() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (data) => {};

  return (
    <section className="p-4 mb-4 rounded-xl shadow flex flex-col items-center w-2/3">
      <h1 className="p-4">Add a Note</h1>
      {showForm ? (
        <NoteForm
          closeForm={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      ) : (
        <button
          onClick={handleClick}
          className="text-2xl text-white bg-sky-500 shadow-md rounded-xl w-1/6 p-1 hover:bg-sky-600"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
    </section>
  );
}

function NoteForm({ note, closeForm, onSubmit }) {
  const handleCancel = () => {
    closeForm();
  };

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-col">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            defaultValue={note ? note.title : ""}
            {...register("title", { required: "Title is required" })}
            className="shadow text-slate-400 rounded p-1 "
          ></input>
        </div>
        {errors.title && <ErrorAlert>{errors.title.message}</ErrorAlert>}

        <div className="flex gap-4 flex-col">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            defaultValue={note ? note.content : ""}
            {...register("content", { required: "Content is required" })}
            className="shadow text-slate-400 rounded p-1 h-40 "
          ></textarea>
        </div>
        {errors.content && <ErrorAlert>{errors.content.message}</ErrorAlert>}
      </div>
      <div className="flex gap-2 p-4">
        <ConfirmButton />
        <CancelButton onClick={handleCancel} />
      </div>
    </form>
  );
}

function NotesList({ notes }) {
  return (
    <section className="p-4 rounded-xl shadow w-2/3">
      <h1 className="p-4 text-center">My Notes</h1>
      <ul className="p-4 flex flex-col gap-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <li key={note.id}>
              <Note note={note} />
            </li>
          ))
        ) : (
          <p className="text-slate-400">You have not added any notes</p>
        )}
      </ul>
    </section>
  );
}

function Note({ note }) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col items-start">
        <h2>{note.title}</h2>
        <p className="text-slate-400">{note.content}</p>
      </div>
      <div className="flex flex-col text-2xl gap-2">
        <EditButton onClick={() => setEditModalVisible(true)} />
        <DeleteButton onClick={() => setDeleteModalVisible(true)} />
      </div>
      {editModalVisible && (
        <EditModal note={note} closeModal={() => setEditModalVisible(false)} />
      )}
      {deleteModalVisible && (
        <DeleteModal
          note={note}
          closeModal={() => setDeleteModalVisible(false)}
        />
      )}
    </div>
  );
}

function EditModal({ note, closeModal }) {
  const handleSubmit = (data) => {
    closeModal();
  };

  return (
    <Modal>
      <h1 className="p-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faEdit} />
        Edit Note
      </h1>
      <NoteForm note={note} closeForm={closeModal} onSubmit={handleSubmit} />
    </Modal>
  );
}

function DeleteModal({ note, closeModal }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal>
      <h1 className="p-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faXmarkCircle} />
        Delete Note
      </h1>
      <form onSubmit={handleSubmit}>
        <p className="text-center">
          Are you sure you want to delete your note '{note.title}'?
        </p>
        <div className="flex gap-2 p-4 justify-center">
          <ConfirmButton />
          <CancelButton onClick={handleCancel} />
        </div>
      </form>
    </Modal>
  );
}
