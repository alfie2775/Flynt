import axios from "axios";
import { getHeaders } from "./helper";

const api = "https://flynt-api.herokuapp.com";

export const logIn = async (username: string, password: string) => {
  const res = await axios
    .post(api + "/users/login", { username, password })
    .then((res) => res.data)
    .catch((err) => ({ error: err, status: "TA" }));
  return res;
};

export const signUp = async (user: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}): Promise<any> => {
  const res = await axios
    .post(api + "/users/signup", user)
    .then((res) => res.data)
    .catch((err) => ({ error: err }));
  return res;
};

export const getTemplates = async (): Promise<any> => {
  return axios
    .get(api + "/users/templates", { headers: getHeaders() })
    .then((res) => res.data)
    .catch((err) => err);
};

export const addTemplate = async (lang: string, code: string): Promise<any> => {
  return axios
    .post(api + "/users/templates", { lang, code }, { headers: getHeaders() })
    .then((res) => res.data)
    .catch((err) => err);
};

export const editTemplate = async (
  templateId: string,
  code: string
): Promise<any> => {
  return axios
    .post(
      api + "/users/templates/" + templateId,
      { code },
      { headers: getHeaders() }
    )
    .then((res) => res.data)
    .catch((err) => err);
};

export const deleteTemplate = async (templateId: string): Promise<any> => {
  return axios
    .delete(api + "/users/templates/" + templateId, { headers: getHeaders() })
    .then((res) => res.data)
    .catch((err) => err);
};

export const compileAndRun = async (
  script: string,
  language: string,
  stdin: string
): Promise<any> => {
  const res: any = await axios
    .post(api + "/compile", { script, language, stdin })
    .then((res) => res.data)
    .catch((err) => err);
  if (res.error) {
    return {
      error: true,
      status: "TA",
    };
  } else {
    return {
      output: res.output,
    };
  }
};

export const shareCode = async (lang: string, code: string, input: string) => {
  return axios
    .post(api + "/share/", { lang, input, code })
    .then((res) => res.data)
    .catch((err) => err);
};
export const getSharedCode = async (codeId: string) => {
  return axios.get(api + "/share/" + codeId);
};

export const getSavedCodes = async () => {
  return axios
    .get(api + "/savedCodes", { headers: getHeaders() })
    .then((res) => res.data)
    .catch((err) => err);
};

export const saveCode = async (
  savedCodeTitle: string,
  lang: string,
  code: string,
  input: string
): Promise<any> => {
  return axios
    .post(
      api + "/savedCodes",
      { title: savedCodeTitle, lang, code, input },
      { headers: getHeaders() }
    )
    .then((res) => res.data)
    .catch((err) => err);
};

export const deleteSavedCode = async (codeId: string) => {
  return axios
    .delete(api + "/savedCodes/" + codeId, { headers: getHeaders() })
    .then((res) => res.data)
    .catch((err) => err);
};

export const getAllUserData = async (dispatch: any) => {
  const templates = await getTemplates();
  if ("templates" in templates)
    dispatch({ type: "ADD_TEMPLATES", payload: templates.templates });
  const savedCodes = await getSavedCodes();
  dispatch({ type: "GET_SAVED_CODES", payload: savedCodes.reverse() });
};
