import { ReducerActionTypes, ReducerStateTypes } from "./types/types";

export function reducer(
  state: ReducerStateTypes,
  action: ReducerActionTypes
): ReducerStateTypes {
  switch (action.type) {
    case "SHOW_EDIT_TITLE_ICON":
      return { ...state, showTitleEdit: true };
    case "HIDE_EDIT_TITLE_ICON":
      return { ...state, showTitleEdit: false };
    case "SHOW_EDIT_TITLE_INPUT":
      return { ...state, titleInput: true };
    case "HIDE_EDIT_TITLE_INPUT":
      return { ...state, titleInput: false };
    case "SHOW_EDIT_CONTENT_ICON":
      return { ...state, showContentEdit: true };
    case "HIDE_EDIT_CONTENT_ICON":
      return { ...state, showContentEdit: false };
    case "SHOW_EDIT_CONTENT_INPUT":
      return { ...state, contentInput: true };
    case "HIDE_EDIT_CONTENT_INPUT":
      return { ...state, contentInput: false };
    default:
      return state;
  }
}

export const initStates: ReducerStateTypes = {
  showTitleEdit: false,
  titleInput: false,
  showContentEdit: false,
  contentInput: false,
};
