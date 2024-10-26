import Header from "./components/Header";
import NoteForm from "./components/InputForm";
import Note from "./components/Note";

import useStore from "./zustand /store";
import { NoteTypes } from "./types/types";
import { Toaster } from "sonner";

function App() {
  const { note, openNoteForm } = useStore();

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
          <button
            onClick={() => openNoteForm()}
            className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600 transition-colors duration-200"
          >
            Add New Note
          </button>
          <NoteForm />
        </Header>
        <div className="grid grid-cols-[repeat(1,_350px)]   md:grid-cols-[repeat(3,_350px)]  gap-5  my-5  ">
          {note.map((n: NoteTypes) => (
            <Note
              edited={n.edited}
              key={n.id}
              id={n.id}
              title={n.title}
              content={n.content}
              date={n.date}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
