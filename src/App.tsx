import Header from "./components/Header";
import NoteForm from "./components/InputForm";

import useStore from "./zustand/store";

import { Toaster } from "sonner";
import DeletedNotes from "./components/DeletedNotes";
import Notes from "./components/Notes";

function App() {
  const { openNoteForm, deleteAllNotes, deletedNotes, note } = useStore();

  return (
    <>
      <Toaster
        richColors
        className="py-3 text-[25px]"
        theme="dark"
        position="top-right"
      />

      <main className="text-gray-200 poppins-regular min-h-screen bg-gray-900  flex  flex-col items-center ">
        <Header>
          <h2 className=" uppercase md:text-5xl font-bold">
            Notes With Zustand
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => openNoteForm()}
              className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600 transition-colors duration-200"
            >
              Add New Note
            </button>
            <button
              onClick={() => deleteAllNotes()}
              className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600 transition-colors duration-200"
            >
              Delete all Notes
            </button>
          </div>
          <NoteForm />
        </Header>
        {note.length > 0 ? <Notes /> : null}
        {deletedNotes.length > 0 ? <DeletedNotes /> : null}
      </main>
    </>
  );
}

export default App;
