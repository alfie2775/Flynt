import { combineReducers } from "redux";
import { value } from "./value";
import { theme } from "./theme";
import { lang } from "./lang";
import { output } from "./output";
import { input } from "./input";
import { recentCodes } from "./recentCodes";
import { templates } from "./templates";

const isAuth = (state = false, action: { type: string }) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return true;
    case "AUTH_LOGGED_OUT":
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  value,
  theme,
  lang,
  recentCodes,
  input,
  output,
  templates,
  isAuth,
});
