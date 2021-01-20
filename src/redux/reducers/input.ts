export const input: (
  state: string,
  action: { type: string; payload: string }
) => string = (state = "", action) => {
  switch (action.type) {
    case "SET_INPUT":
      return action.payload;

    default:
      return state;
  }
};
