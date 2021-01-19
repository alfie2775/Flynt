import { templates } from "../../others/templates";

interface Values {
  [key: string]: string;
}

export const value: (
  state: Values,
  action: { type: string; payload: any }
) => Values = (state = templates, action) => {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, [action.payload.lang]: action.payload.val };
    case "RESET_VALUE":
      return { ...state, [action.payload]: templates[action.payload] };
    default:
      return state;
  }
};
