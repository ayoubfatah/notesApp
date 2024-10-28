import { NoteTypes } from "../types/types";
import { storage, STORAGE_KEYS } from "./storage";
import { notify } from "./notification";
import { getFormattedDateNowText } from "../utils";

export const noteOperations = {
  addNote: (state: { note: NoteTypes[] }, note: NoteTypes) => {
    const updatedNotes = [...state.note, note];
    storage.save(STORAGE_KEYS.NOTES, updatedNotes);
    notify.success("Note has been created successfully");
    return { note: updatedNotes };
  },

  updateTitle: (state: { note: NoteTypes[] }, id: string, title: string) => {
    const getNote = state.note.filter((n) => n.id === id);
    getNote[0].title = title;
    getNote[0].edited = true;
    getNote[0].date = getFormattedDateNowText();
    notify.success("title has been Updated", false);
    storage.save(STORAGE_KEYS.NOTES, state.note);
    return { note: state.note };
  },

  updateContent: (
    state: { note: NoteTypes[] },
    id: string,
    content: string
  ) => {
    const getNote = state.note.filter((n) => n.id === id);
    getNote[0].content = content;
    getNote[0].edited = true;
    getNote[0].date = getFormattedDateNowText();
    notify.success("Content has been Updated", false);
    storage.save(STORAGE_KEYS.NOTES, state.note);
    return { note: state.note };
  },

  deleteAllNotes: (state: { note: NoteTypes[]; deletedNotes: NoteTypes[] }) => {
    storage.save(STORAGE_KEYS.NOTES, []);
    storage.save(STORAGE_KEYS.DELETED_NOTES, [
      ...state.deletedNotes,
      ...state.note,
    ]);
    notify.success("all notes have been deleted");
    return { note: [], deletedNotes: [...state.deletedNotes, ...state.note] };
  },

  deleteDeletedNotes: (state: { deletedNotes: NoteTypes[] }, id: string) => {
    const newDeletedNotes = state.deletedNotes.filter((note) => note.id !== id);
    notify.success("Note has been deleted for ever");
    storage.save(STORAGE_KEYS.DELETED_NOTES, newDeletedNotes);
    return { deletedNotes: newDeletedNotes };
  },

  deleteAllDeletedNotes: (state: { deletedNotes: NoteTypes[] }) => {
    storage.save(STORAGE_KEYS.DELETED_NOTES, []);
    if (state.deletedNotes.length > 0) {
      notify.success("Deleted notes have been removed");
    }
    return { deletedNotes: [] };
  },

  restoreAll: (state: { note: NoteTypes[]; deletedNotes: NoteTypes[] }) => {
    storage.save(STORAGE_KEYS.DELETED_NOTES, []);
    storage.save(STORAGE_KEYS.NOTES, [...state.note, ...state.deletedNotes]);
    if (state.deletedNotes.length > 0) {
      notify.success("Notes have been Restored");
    }
    return { deletedNotes: [], note: [...state.note, ...state.deletedNotes] };
  },

  moveNoteToDeleted: (
    state: { note: NoteTypes[]; deletedNotes: NoteTypes[] },
    noteId: string
  ) => {
    const noteToMove = state.note.find((n) => n.id === noteId);
    if (!noteToMove) return state;
    notify.success("Note has been deleted Successfully ");
    storage.save(STORAGE_KEYS.DELETED_NOTES, [
      ...state.deletedNotes,
      { ...noteToMove },
    ]);
    storage.save(
      STORAGE_KEYS.NOTES,
      state.note.filter((n) => n.id !== noteId)
    );
    return {
      note: state.note.filter((n) => n.id !== noteId),
      deletedNotes: [...state.deletedNotes, { ...noteToMove }],
    };
  },

  restoreNote: (
    state: { note: NoteTypes[]; deletedNotes: NoteTypes[] },
    noteId: string
  ) => {
    const noteToRestore = state.deletedNotes.find((n) => n.id === noteId);
    if (!noteToRestore) return state;
    notify.success("Note has been restored Successfully ");
    storage.save(
      STORAGE_KEYS.DELETED_NOTES,
      state.deletedNotes.filter((n) => n.id !== noteId)
    );
    storage.save(STORAGE_KEYS.NOTES, [...state.note, { ...noteToRestore }]);
    return {
      deletedNotes: state.deletedNotes.filter((n) => n.id !== noteId),
      note: [...state.note, { ...noteToRestore }],
    };
  },
};
