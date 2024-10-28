import { format } from "date-fns";
import { Dispatch } from "react";

export function getFormattedDateNowText(): string {
  return format(new Date(), "EEEE, MMMM do 'at' h:mmaaa");
}

export const handleDragOver = (
  e: React.DragEvent,
  target: "active" | "deleted",
  setDragTarget: Dispatch<"active" | "deleted" | null>
) => {
  e.preventDefault();
  setDragTarget(target);
};

export const handleDragLeave = (
  setDragTarget: Dispatch<"active" | "deleted" | null>
) => {
  setDragTarget(null);
};

export const handleDrop = (
  e: React.DragEvent,
  target: "active" | "deleted",
  deleteNote: (id: string) => void,
  restoreDeletedNote: (id: string) => void,
  setDragTarget: Dispatch<"active" | "deleted" | null>
) => {
  e.preventDefault();
  const draggedNoteId = e.dataTransfer.getData("noteId");

  if (target === "deleted") {
    deleteNote(draggedNoteId);
  } else {
    restoreDeletedNote(draggedNoteId);
  }

  setDragTarget(null);
};
