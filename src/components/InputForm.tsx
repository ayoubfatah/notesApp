import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import useStore from "../zustand /store";
import { NoteTypes } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { getFormattedDateNowText } from "../utils";
import { MAX_CONTENT_CHARS, MAX_TITLE_CHARS } from "../const";
import { useClickOutside } from "../hooks/useClickOutside";

export default function NoteForm() {
  const { addNote, closeNoteForm, isNoteFormOpen } = useStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const id = uuidv4();

  const { formRef } = useClickOutside(closeNoteForm, isNoteFormOpen);

  function handleTitleChange(value: string) {
    setTitle(value);
  }

  function handleContentChange(value: string) {
    setContent(value);
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      const newNote: NoteTypes = {
        id: id,
        title,
        content: content,
        date: getFormattedDateNowText(),
        edited: false,
      };
      addNote(newNote);
      setTitle("");
      setContent("");
      closeNoteForm();
    }
  };

  if (!isNoteFormOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        ref={formRef}
        className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-200">Add New Note</h2>
          <button
            onClick={closeNoteForm}
            className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
            aria-label="Close form"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Title
              </label>
              <div
                className={` mb-1  text-[10px] ${
                  title.length > MAX_TITLE_CHARS
                    ? "text-red-500"
                    : "text-green-500"
                } `}
              >{`${title.length}/${MAX_TITLE_CHARS}`}</div>
            </div>
            <input
              maxLength={MAX_TITLE_CHARS}
              type="text"
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter note title"
              required
            />
            <div className="text-red-500 text-[10px] my-1">
              {title.length > MAX_TITLE_CHARS
                ? `title needs to have less than ${MAX_TITLE_CHARS} chars`
                : ""}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Content
              </label>
              <div
                className={` mb-1  text-[10px] ${
                  content.length > MAX_CONTENT_CHARS
                    ? "text-red-500"
                    : "text-green-500"
                } `}
              >{`${content.length}/${MAX_CONTENT_CHARS}`}</div>
            </div>
            <textarea
              maxLength={MAX_CONTENT_CHARS}
              id="content"
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
              placeholder="Enter note content"
              required
            ></textarea>
            <div className="text-red-500 text-[10px] my-1">
              {content.length > MAX_CONTENT_CHARS
                ? `content needs to have less than ${MAX_CONTENT_CHARS} chars`
                : ""}
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeNoteForm}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600 transition-colors duration-200"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
