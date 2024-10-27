import { NoteTypes } from "../types/types";
import useStore from "../zustand/store";
import Note from "./Note";

export default function Notes() {
  const { note } = useStore();

  return (
    <div className="">
      <h2 className="text-2xl font-semibold">Notes:</h2>
      <div className="grid grid-cols-[repeat(1,_350px)]   md:grid-cols-[repeat(3,_350px)]  gap-5  my-5  ">
        {note.map((n: NoteTypes) => (
          <Note
            type="normal"
            edited={n.edited}
            key={n.id}
            id={n.id}
            title={n.title}
            content={n.content}
            date={n.date}
          />
        ))}
      </div>
    </div>
  );
}
