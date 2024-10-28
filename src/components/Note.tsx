import { FiCopy, FiEdit2, FiTrash2 } from "react-icons/fi";
import { NoteTypes } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { getFormattedDateNowText } from "../utils";
import { useReducer, useState } from "react";
import { MAX_CONTENT_CHARS, MAX_TITLE_CHARS } from "../const";
import { toast } from "sonner";
import useStore from "../zustand/store";
import { initStates, reducer } from "../reducer";
import { FiRotateCcw } from "react-icons/fi";

export default function Note({
  type,
  title,
  content,
  id,
  date,
  edited = false,
}: NoteTypes) {
  const [state, dispatch] = useReducer(reducer, initStates);
  const [tempTitle, setTempTitle] = useState(title);
  const [tempContent, setTempContent] = useState(content);

  const {
    addNote,
    updateTitle,
    updateContent,
    deleteDeletedNotes,
    restoreNote,
    moveNoteToDeleted,
    setDraggedNote,
    setDragSource,
  } = useStore();
  const duplicatedId = uuidv4();

  function handleUpdateTitle() {
    if (tempTitle.length === 0 || tempTitle.length > MAX_TITLE_CHARS) {
      dispatch({ type: "HIDE_EDIT_TITLE_INPUT" });
      if (tempTitle.length > MAX_TITLE_CHARS)
        toast.error(
          `Title is too long. It should be ${MAX_TITLE_CHARS} characters or less.`
        );
      if (tempTitle.length === 0) toast.error(`Title cannot be empty.`);
      setTempTitle(title);
      return;
    }
    updateTitle(id, tempTitle);
    dispatch({ type: "HIDE_EDIT_TITLE_INPUT" });
  }

  function handleUpdateContent() {
    if (tempContent.trim().length === 0) {
      toast.error("Content cannot be empty.");
      setTempContent(content);
    } else {
      updateContent(id, tempContent);
    }
    dispatch({ type: "HIDE_EDIT_CONTENT_INPUT" });
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("noteId", id);
    setDraggedNote({ id, title, content, date, edited, type });
    setDragSource(type === "normal" ? "active" : "deleted");
  };

  const handleDragEnd = () => {
    setDraggedNote(null);
    setDragSource(null);
  };

  function duplicateNote() {
    const duplicatedNote: NoteTypes = {
      type: "normal",
      title: `copy of ${title.slice(-8)}`,
      content,
      id: duplicatedId,
      date: getFormattedDateNowText(),
      edited: false,
    };
    addNote(duplicatedNote);
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="bg-gray-800 rounded-lg p-4 shadow-lg transition-all duration-300 hover:shadow-xl relative"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-2 w-full">
          <div
            onMouseEnter={() => dispatch({ type: "SHOW_EDIT_TITLE_ICON" })}
            onMouseLeave={() => dispatch({ type: "HIDE_EDIT_TITLE_ICON" })}
            className="flex justify-between w-full"
          >
            {state.titleInput && type === "normal" ? (
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleUpdateTitle}
                onKeyDown={(e) => e.key === "Enter" && handleUpdateTitle()}
                className="text-gray-200 bg-transparent border-b border-gray-500 focus:outline-none text-lg font-semibold"
                autoFocus
              />
            ) : (
              <h2 className="text-gray-200 text-lg font-semibold break-words uppercase">
                {title}
              </h2>
            )}
            {state.showTitleEdit && type === "normal" && (
              <button
                onClick={() => dispatch({ type: "SHOW_EDIT_TITLE_INPUT" })}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="Edit title"
              >
                <FiEdit2 className="ml-2 w-4 h-4" />
              </button>
            )}
            <div className="inline-flex space-x-2 ml-auto">
              {type === "deleted" && (
                <button
                  onClick={() => restoreNote(id)}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="restore note"
                >
                  <FiRotateCcw className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() =>
                  type === "normal"
                    ? moveNoteToDeleted(id)
                    : deleteDeletedNotes(id)
                }
                className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                aria-label="Delete note"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
              <button
                onClick={duplicateNote}
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                aria-label="Duplicate note"
              >
                <FiCopy className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div
            onMouseEnter={() => dispatch({ type: "SHOW_EDIT_CONTENT_ICON" })}
            onMouseLeave={() => dispatch({ type: "HIDE_EDIT_CONTENT_ICON" })}
          >
            {state.contentInput && type === "normal" ? (
              <textarea
                maxLength={MAX_CONTENT_CHARS}
                id="content"
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
                onBlur={() => handleUpdateContent()}
                onKeyDown={(e) => e.key === "Enter" && handleUpdateContent()}
                className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                placeholder="Enter note content"
                autoFocus
              ></textarea>
            ) : (
              <p className="text-gray-200  py-3 w-full break-words">
                {content}
                {state.showContentEdit && type === "normal" && (
                  <button
                    onClick={() =>
                      dispatch({ type: "SHOW_EDIT_CONTENT_INPUT" })
                    }
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    aria-label="Edit content"
                  >
                    <FiEdit2 className="ml-2 w-4 h-4" />
                  </button>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="text-gray-500  flex justify-between w-full text-[10px] absolute bottom-0 left-0 px-2 py-1">
        <span>{date}</span>
        <span>{edited ? "edited" : ""}</span>
      </div>
    </div>
  );
}
