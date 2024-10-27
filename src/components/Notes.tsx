import { useRef, useState } from "react";
import { NoteTypes } from "../types/types";
import useStore from "../zustand/store";
import Note from "./Note";
import { Reorder } from "framer-motion";

export default function Notes() {
  const {
    note,
    deletedNotes,
    dragTarget,
    setDragTarget,
    moveNoteToDeleted,
    restoreNote,
  } = useStore();

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const constraintsRef = useRef(null);

  console.log(deletedNotes, dragTarget, draggedId, setDraggedId);
  const handleDragOver = (e: React.DragEvent, target: "active" | "deleted") => {
    e.preventDefault();
    setDragTarget(target);
  };

  const handleDragLeave = () => {
    setDragTarget(null);
  };

  const handleDrop = (e: React.DragEvent, target: "active" | "deleted") => {
    e.preventDefault();
    const draggedNoteId = e.dataTransfer.getData("noteId");

    if (target === "deleted") {
      moveNoteToDeleted(draggedNoteId);
    } else {
      restoreNote(draggedNoteId);
    }

    setDragTarget(null);
  };

  return (
    <div className="">
      <h2 className="text-2xl font-semibold">Notes:</h2>
      <div
        ref={constraintsRef}
        onDragOver={(e) => handleDragOver(e, "active")}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, "active")}
        className="grid grid-cols-[repeat(1,_350px)]   md:grid-cols-[repeat(3,_350px)]  gap-5  my-5  "
      >
        <Reorder.Group
          axis="y"
          values={note}
          onReorder={(newOrder: NoteTypes[]) =>
            useStore.setState({ note: newOrder })
          }
          className="grid grid-cols-[repeat(1,_350px)] md:grid-cols-[repeat(3,_350px)] gap-5 my-5"
        >
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
        </Reorder.Group>
      </div>
    </div>
  );
}
