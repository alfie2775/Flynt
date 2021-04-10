import { combineReducers } from "redux";
import { value } from "./value";
import { theme } from "./theme";
import { lang } from "./lang";
import { output } from "./output";
import { input } from "./input";
import { recentCodes } from "./recentCodes";
import { templates } from "./templates";
import { savedCodes } from "./savedCodes";

const isAuth = (state = false, action: { type: string; payload: boolean }) => {
  switch (action.type) {
    case "SET_AUTH":
      return action.payload;
    default:
      return state;
  }
};

const username = (state = "", action: any) => {
  switch (action.type) {
    case "SET_USERNAME":
      return action.payload;
    default:
      return state;
  }
};

const toast = (state = false, action: any) => {
  switch (action.type) {
    case "SET_TOAST":
      return action.payload;

    default:
      return state;
  }
};

const toastHeader = (state = "", action: any) => {
  switch (action.type) {
    case "SET_TOAST_HEADER":
      return action.payload;

    default:
      return state;
  }
};

const toastBody = (state = "", action: any) => {
  switch (action.type) {
    case "SET_TOAST_BODY":
      return action.payload;

    default:
      return state;
  }
};

export default combineReducers({
  codeInEditor: value,
  theme,
  lang,
  recentCodes,
  input,
  output,
  templates,
  isAuth,
  savedCodes,
  username,
  toast,
  toastHeader,
  toastBody,
});
