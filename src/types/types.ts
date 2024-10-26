export type NoteTypes = {
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
