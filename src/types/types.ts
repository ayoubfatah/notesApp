export type StoreState = {
  note: NoteTypes[];
  deletedNotes: NoteTypes[];
  isNoteFormOpen: boolean;
  addNote: (note: NoteTypes) => void;
  deleteNote: (id: string) => void;
  openNoteForm: () => void;
  closeNoteForm: () => void;
  updateTitle: (id: string, title: string) => void;
  updateContent: (id: string, content: string) => void;
  deleteAllNotes: () => void;
  deleteDeletedNotes: (id: string) => void;
  restoreDeletedNote: (id: string) => void;
  restoreAll: () => void;
  deleteAllDeletedNotes: () => void;
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
