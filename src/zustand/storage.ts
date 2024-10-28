import { NoteTypes } from "../types/types";

export const STORAGE_KEYS = {
  NOTES: "notes",
  DELETED_NOTES: "deletedNotes",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export const storage = {
  save: (key: StorageKey, data: NoteTypes[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  },

  load: (key: StorageKey): NoteTypes[] => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },
};
