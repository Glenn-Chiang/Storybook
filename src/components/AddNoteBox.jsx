import { useState } from "react";


export default function AddNoteBox() {
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