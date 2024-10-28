// store.ts
import { create } from "zustand";
import { NoteTypes, StoreState } from "../types/types";
import { storage, STORAGE_KEYS } from "./storage";
import { noteOperations } from "./noteOperations";

const useStore = create<StoreState>((set) => ({
  note: storage.load(STORAGE_KEYS.NOTES),
  deletedNotes: storage.load(STORAGE_KEYS.DELETED_NOTES),
  isNoteFormOpen: false,
  draggedNote: null,
  dragSource: null,
  dragTarget: null,

  openNoteForm: () => set({ isNoteFormOpen: true }),
  closeNoteForm: () => set({ isNoteFormOpen: false }),

  setDraggedNote: (note) => set({ draggedNote: note }),
  setDragSource: (source) => set({ dragSource: source }),
  setDragTarget: (target) => set({ dragTarget: target }),

  addNote: (note: NoteTypes) =>
    set((state) => noteOperations.addNote(state, note)),
  updateTitle: (id: string, title: string) =>
    set((state) => noteOperations.updateTitle(state, id, title)),
  updateContent: (id: string, content: string) =>
    set((state) => noteOperations.updateContent(state, id, content)),
  deleteAllNotes: () => set((state) => noteOperations.deleteAllNotes(state)),
  deleteDeletedNotes: (id: string) =>
    set((state) => noteOperations.deleteDeletedNotes(state, id)),
  deleteAllDeletedNotes: () =>
    set((state) => noteOperations.deleteAllDeletedNotes(state)),
  restoreAll: () => set((state) => noteOperations.restoreAll(state)),
  moveNoteToDeleted: (noteId: string) =>
    set((state) => noteOperations.moveNoteToDeleted(state, noteId)),
  restoreNote: (noteId: string) =>
    set((state) => noteOperations.restoreNote(state, noteId)),
  reorderNotes: (newOrder: NoteTypes[]) => set({ note: newOrder }),
}));

export default useStore;
