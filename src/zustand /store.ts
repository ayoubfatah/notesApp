import { create } from "zustand";
import { NoteTypes } from "../types/types";
import { toast } from "sonner";
import { getFormattedDateNowText } from "../utils";
import { playSuccessNotificationSound } from "../hooks/playSuccessNotificationSound";

type StoreState = {
  note: NoteTypes[];
  isNoteFormOpen: boolean;
  addNote: (note: NoteTypes) => void;
  deleteNote: (id: string) => void;
  openNoteForm: () => void;
  closeNoteForm: () => void;
  updateTitle: (id: string, title: string) => void;
  updateContent: (id: string, content: string) => void;
};

const saveNotesToLocalStorage = (notes: NoteTypes[]) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

const loadNotesFromLocalStorage = (): NoteTypes[] => {
  const notes = localStorage.getItem("notes");
  return notes ? JSON.parse(notes) : [];
};

const useStore = create<StoreState>((set) => ({
  note: loadNotesFromLocalStorage(),
  isNoteFormOpen: false,
  addNote: (note: NoteTypes) =>
    set((state) => {
      const updatedNotes = [...state.note, note];
      saveNotesToLocalStorage(updatedNotes);
      toast.success("Note has been created", {
        description: getFormattedDateNowText(),
      });
      playSuccessNotificationSound();

      return { note: updatedNotes };
    }),
  deleteNote: (id: string) =>
    set((state) => {
      const filteredNotes = [...state.note].filter((note) => note.id !== id);
      saveNotesToLocalStorage(filteredNotes);
      toast.success("Note has been deleted", {
        description: getFormattedDateNowText(),
      });
      playSuccessNotificationSound();

      return { note: filteredNotes };
    }),
  openNoteForm: () => set({ isNoteFormOpen: true }),
  closeNoteForm: () => set({ isNoteFormOpen: false }),
  updateTitle: (id: string, title: string) =>
    set((state) => {
      const getNote = state.note.filter((n) => n.id === id);
      getNote[0].title = title;
      getNote[0].edited = true;
      getNote[0].date = getFormattedDateNowText();
      toast.success("Title has been Updated", {
        description: getFormattedDateNowText(),
      });
      saveNotesToLocalStorage(state.note);
      return { note: state.note };
    }),
  updateContent: (id: string, content: string) =>
    set((state) => {
      const getNote = state.note.filter((n) => n.id === id);
      getNote[0].content = content;
      getNote[0].edited = true;
      getNote[0].date = getFormattedDateNowText();
      toast.success("Content has been Updated", {
        description: getFormattedDateNowText(),
      });
      saveNotesToLocalStorage(state.note);
      return { note: state.note };
    }),
}));

export default useStore;
