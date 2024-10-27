import { create } from "zustand";
import { NoteTypes, StoreState } from "../types/types";
import { toast } from "sonner";
import { getFormattedDateNowText } from "../utils";
import { playSuccessNotificationSound } from "../hooks/playSuccessNotificationSound";

const notify = {
  success: (message: string, sound: boolean = true) => {
    toast.success(message, {
      description: getFormattedDateNowText(),
    });
    if (sound) playSuccessNotificationSound();
  },
};

const STORAGE_KEYS = {
  NOTES: "notes",
  DELETED_NOTES: "deletedNotes",
} as const;
type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
const storage = {
  save: (key: StorageKey, data: NoteTypes[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  },

  load: (key: StorageKey): NoteTypes[] => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },
};

//
const useStore = create<StoreState>((set) => ({
  note: storage.load(STORAGE_KEYS.NOTES),
  deletedNotes: storage.load(STORAGE_KEYS.DELETED_NOTES),
  isNoteFormOpen: false,
  draggedNote: null,
  dragSource: null,
  dragTarget: null,
  //
  openNoteForm: () => set({ isNoteFormOpen: true }),
  closeNoteForm: () => set({ isNoteFormOpen: false }),
  //   +
  addNote: (note: NoteTypes) =>
    set((state) => {
      const updatedNotes = [...state.note, note];
      storage.save(STORAGE_KEYS.NOTES, updatedNotes);
      notify.success("Note has been created successfully");
      return { note: updatedNotes };
    }),
  // -
  deleteNote: (id) =>
    set((state) => {
      const deletedNote = state.note.find((note) => note.id === id);
      const newDeletedNotes = deletedNote
        ? [...state.deletedNotes, deletedNote]
        : state.deletedNotes;
      const filteredNotes = state.note.filter((note) => note.id !== id);
      storage.save(STORAGE_KEYS.NOTES, filteredNotes);
      storage.save(STORAGE_KEYS.DELETED_NOTES, newDeletedNotes);
      notify.success("Note has been deleted successfully");
      return { note: filteredNotes, deletedNotes: newDeletedNotes };
    }),
  // UPDATING TITLE
  updateTitle: (id, title) =>
    set((state) => {
      const getNote = state.note.filter((n) => n.id === id);
      getNote[0].title = title;
      getNote[0].edited = true;
      getNote[0].date = getFormattedDateNowText();
      notify.success("title has been Updated", false);
      storage.save(STORAGE_KEYS.NOTES, state.note);

      return { note: state.note };
    }),
  updateContent: (id, content) =>
    set((state) => {
      const getNote = state.note.filter((n) => n.id === id);
      getNote[0].content = content;
      getNote[0].edited = true;
      getNote[0].date = getFormattedDateNowText();
      notify.success("Content has been Updated", false);
      storage.save(STORAGE_KEYS.NOTES, state.note);

      return { note: state.note };
    }),
  // -
  deleteAllNotes: () =>
    set((state) => {
      storage.save(STORAGE_KEYS.NOTES, []);
      storage.save(STORAGE_KEYS.DELETED_NOTES, [
        ...state.deletedNotes,
        ...state.note,
      ]);
      notify.success("all notes have been deleted");

      return { note: [], deletedNotes: [...state.deletedNotes, ...state.note] };
    }),
  // -
  deleteDeletedNotes: (id) =>
    set((state) => {
      const newDeletedNotes = state.deletedNotes.filter(
        (note) => note.id !== id
      );
      notify.success("Note has been deleted for ever");
      storage.save(STORAGE_KEYS.DELETED_NOTES, newDeletedNotes);
      return { deletedNotes: newDeletedNotes };
    }),
  restoreDeletedNote: (id) =>
    set((state) => {
      const restoredNote = state.deletedNotes.find((n) => n.id === id);
      const newDeletedNotes = state.deletedNotes.filter((n) => n.id !== id);
      notify.success("Note has been deleted for ever");
      storage.save(STORAGE_KEYS.DELETED_NOTES, newDeletedNotes);
      storage.save(
        STORAGE_KEYS.NOTES,
        restoredNote ? [...state.note, restoredNote] : state.note
      );

      return {
        deletedNotes: [...newDeletedNotes],
        note: restoredNote ? [...state.note, restoredNote] : state.note,
      };
    }),
  deleteAllDeletedNotes: () =>
    set((state) => {
      storage.save(STORAGE_KEYS.DELETED_NOTES, []);
      if (state.deletedNotes.length > 0) {
        notify.success("Deleted notes have been removed");
      }

      return { deletedNotes: [] };
    }),
  restoreAll: () =>
    set((state) => {
      storage.save(STORAGE_KEYS.DELETED_NOTES, []);
      storage.save(STORAGE_KEYS.NOTES, [...state.note, ...state.deletedNotes]);
      if (state.deletedNotes.length > 0) {
        notify.success("Notes have been Restored");
      }
      return { deletedNotes: [], note: [...state.note, ...state.deletedNotes] };
    }),

  setDraggedNote: (note) => set({ draggedNote: note }),
  setDragSource: (source) => set({ dragSource: source }),
  setDragTarget: (target) => set({ dragTarget: target }),
  moveNoteToDeleted: (noteId) =>
    set((state) => {
      const noteToMove = state.note.find((n) => n.id === noteId);
      if (!noteToMove) return state;
      notify.success("Note has been deleted Successfully ");

      return {
        note: state.note.filter((n) => n.id !== noteId),
        deletedNotes: [
          ...state.deletedNotes,
          { ...noteToMove, deletedAt: new Date().toISOString() },
        ],
      };
    }),
  restoreNote: (noteId) =>
    set((state) => {
      const noteToRestore = state.deletedNotes.find((n) => n.id === noteId);
      if (!noteToRestore) return state;
      notify.success("Note has been restored Successfully ");
      return {
        deletedNotes: state.deletedNotes.filter((n) => n.id !== noteId),
        note: [
          ...state.note,
          { ...noteToRestore, restoredAt: new Date().toISOString() },
        ],
      };
    }),
}));

export default useStore;
