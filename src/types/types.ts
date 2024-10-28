export type StoreState = {
  note: NoteTypes[];
  deletedNotes: NoteTypes[];
  isNoteFormOpen: boolean;
  addNote: (note: NoteTypes) => void;
  openNoteForm: () => void;
  closeNoteForm: () => void;
  updateTitle: (id: string, title: string) => void;
  updateContent: (id: string, content: string) => void;
  deleteAllNotes: () => void;
  deleteDeletedNotes: (id: string) => void;
  restoreAll: () => void;
  deleteAllDeletedNotes: () => void;
  draggedNote: NoteTypes | null;
  dragSource: "active" | "deleted" | null;
  dragTarget: "active" | "deleted" | null;

  // Actions
  setDraggedNote: (note: NoteTypes | null) => void;
  setDragSource: (source: "active" | "deleted" | null) => void;
  setDragTarget: (target: "active" | "deleted" | null) => void;
  moveNoteToDeleted: (noteId: string) => void;
  restoreNote: (noteId: string) => void;
  reorderNotes: (newOrder: NoteTypes[]) => void;
};

export type NoteTypes = {
  type: "deleted" | "normal";
  id: string;
  content: string;
  title: string;
  date: string;
  edited: boolean;
};

export type ReducerStateTypes = {
  showTitleEdit: boolean;
  titleInput: boolean;
  showContentEdit: boolean;
  contentInput: boolean;
};

export type ReducerActionTypes =
  | { type: "SHOW_EDIT_TITLE_ICON" }
  | { type: "HIDE_EDIT_TITLE_ICON" }
  | { type: "SHOW_EDIT_TITLE_INPUT" }
  | { type: "HIDE_EDIT_TITLE_INPUT" }
  | { type: "SHOW_EDIT_CONTENT_ICON" }
  | { type: "HIDE_EDIT_CONTENT_ICON" }
  | { type: "SHOW_EDIT_CONTENT_INPUT" }
  | { type: "HIDE_EDIT_CONTENT_INPUT" };
