import { combineReducers } from "redux";
import { value } from "./value";
import { theme } from "./theme";
import { lang } from "./lang";
import { output } from "./output";
import { input } from "./input";
import { recentCodes } from "./recentCodes";

export default combineReducers({
  value,
  theme,
  lang,
  recentCodes,
  input,
  output,
});
