/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { EditButton, DeleteButton } from "./components/buttons";
import AddNoteBox from "./components/AddNoteBox";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";

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
