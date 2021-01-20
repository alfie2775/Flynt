export const output: (
  state: string,
  action: { type: string; payload: string }
) => string = (state = "", action) => {
  switch (action.type) {
    case "SET_OUTPUT":
      return action.payload;

    default:
      return state;
  }
};
