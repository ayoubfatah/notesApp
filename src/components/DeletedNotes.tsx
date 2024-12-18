import Note from "./Note";
import { NoteTypes } from "../types/types";
import useStore from "../zustand/store";
import { handleDragLeave, handleDragOver, handleDrop } from "../utils";

export default function DeletedNotes() {
  const {
    deletedNotes,
    deleteAllDeletedNotes,
    restoreAll,
    setDragTarget,
    moveNoteToDeleted,
    restoreNote,
  } = useStore();

  return (
    <div className="mt-3">
      <div>
        <h2 className="text-2xl font-semibold"> Recently Deleted :</h2>
        <ul className="flex gap-2 text-[10px] text-blue-400">
          <li onClick={() => restoreAll()} className="cursor-pointer">
            Restore all
          </li>
          <li
            onClick={() => deleteAllDeletedNotes()}
            className="cursor-pointer"
          >
            Remove all
          </li>
        </ul>
      </div>
      <div
        onDragOver={(e) => handleDragOver(e, "deleted", setDragTarget)}
        onDragLeave={() => handleDragLeave(setDragTarget)}
        onDrop={(e) =>
          handleDrop(
            e,
            "deleted",
            moveNoteToDeleted,
            restoreNote,
            setDragTarget
          )
        }
        className="grid grid-cols-[repeat(1,_350px)]   md:grid-cols-[repeat(3,_350px)]  gap-5  my-5  "
      >
        {deletedNotes.map((n: NoteTypes) => (
          <Note
            type="deleted"
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
