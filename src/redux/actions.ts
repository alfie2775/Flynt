import { RecentCode } from "./reducers/recentCodes";

export const setValue: (
  val: string,
  lang: string
) => { type: string; payload: { val: string; lang: string } } = (val, lang) => {
  return {
    type: "SET_VALUE",
    payload: { val, lang },
  };
};

export const resetValue: (lang: string) => { type: string; payload: string } = (
  lang
) => {
  return {
    type: "RESET_VALUE",
    payload: lang,
  };
};

export const setTheme: (theme: string) => { payload: string; type: string } = (
  theme
) => {
  return {
    type: "SET_THEME",
    payload: theme,
  };
};

export const setLang: (lang: string) => { payload: string; type: string } = (
  lang
) => {
  return {
    type: "SET_LANG",
    payload: lang,
  };
};

export const addRecentCode: (
  lang: string,
  code: string,
  input: string,
  output: string
) => { type: string; payload: RecentCode } = (lang, code, input, output) => {
  return {
    type: "ADD_RECENT_CODE",
    payload: {
      datetime: new Date().toString(),
      lang,
      input,
      code,
      output,
    },
  };
};

export const deleteAllRecentCodes = (): { type: string } => {
  return {
    type: "DELETE_ALL_RECENT_CODES",
  };
};

export const setInput: (input: string) => { type: string; payload: string } = (
  input
) => {
  return {
    type: "SET_INPUT",
    payload: input,
  };
};
export const setOutput: (
  output: string
) => { type: string; payload: string } = (output) => {
  return {
    type: "SET_OUTPUT",
    payload: output,
  };
};
