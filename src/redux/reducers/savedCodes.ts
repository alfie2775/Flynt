export interface Code {
  _id: string;
  codeName: string;
  lang: string;
  code: string;
  input: string;
}

export const savedCodes = (
  state: Code[] = [],
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "GET_SAVED_CODES":
      return action.payload || [];
    default:
      return state;
  }
};
