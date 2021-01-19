import { combineReducers } from "redux";
import { value } from "./value";
import { theme } from "./theme";
import { lang } from "./lang";

export default combineReducers({ value, theme, lang });
