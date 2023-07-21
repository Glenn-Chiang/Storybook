/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {
  faClipboard,
  faEdit,
  faPlus,
  faXmark,
  faXmarkCircle,

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

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

  return (
    <section className="p-4 mb-4 rounded-xl shadow flex flex-col items-center w-2/3">
      <h1 className="p-4">Add a Note</h1>
      {showForm ? (
        <NoteForm closeForm={() => setShowForm(false)} />
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

function NoteForm({ note, closeForm }) {
  const handleConfirm = () => {
    closeForm();
  };

  const handleCancel = () => {
    closeForm();
  };

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [titleInputValue, setTitleInputValue] = useState(
    note ? note.title : ""
  );
  const [contentInputValue, setContentInputValue] = useState(
    note ? note.content : ""
  );

  return (
    <form className="flex flex-col items-center">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-col">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            ref={inputRef}
            value={titleInputValue}
            onChange={(event) => setTitleInputValue(event.target.value)}
            className="shadow text-slate-400 rounded p-1 "
          ></input>
        </div>
        <div className="flex gap-4 flex-col">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={contentInputValue}
            onChange={(event) => setContentInputValue(event.target.value)}
            className="shadow text-slate-400 rounded p-1 h-40 "
          ></textarea>
        </div>
      </div>
      <div className="flex gap-2 p-4">
        <ConfirmButton onClick={handleConfirm} />
        <CancelButton onClick={handleCancel} />
      </div>
    </form>
  );
}

function ConfirmButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-white p-2 rounded-xl bg-teal-400 hover:bg-teal-500"
    >
      Confirm
    </button>
  );
}

function CancelButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-white p-2 rounded-xl bg-rose-400 hover:bg-rose-500"
    >
      Cancel
    </button>
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

function EditButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-sky-400 hover:bg-sky-500 text-white rounded w-8 h-8 flex justify-center items-center"
    >
      <FontAwesomeIcon icon={faEdit} />
    </button>
  );
}

function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-rose-400 text-white rounded w-8 h-8 flex justify-center items-center hover:bg-rose-500"
    >
      <FontAwesomeIcon icon={faXmark} />
    </button>
  );
}

function EditModal({ note, closeModal }) {
  return (
    <Modal>
      <h1 className="p-4 flex items-center gap-2">
        <FontAwesomeIcon icon={faEdit} />
        Edit Note
      </h1>
      <NoteForm note={note} closeForm={closeModal} />
    </Modal>
  );
}

function DeleteModal({ note, closeModal }) {
  const handleConfirm = () => {
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
      <p className="text-center">
        Are you sure you want to delete your note '{note.title}'?
      </p>
      <div className="flex gap-2 p-4">
        <ConfirmButton onClick={handleConfirm} />
        <CancelButton onClick={handleCancel} />
      </div>
    </Modal>
  );
}

function Modal({ children }) {
  return (
    <div className="fixed inset-0 h-screen w-screen bg-sky-950/60 flex items-center">
      <div className="fixed bg-white w-1/2 inset-x-0 m-auto flex items-center flex-col p-4 rounded-xl border-sky-500 border-2">
        {children}
      </div>
    </div>
  );
}
