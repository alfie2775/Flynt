export const theme: (
  state: string,
  action: { type: string; payload: string }
) => string = (state = "Dark", action) => {
  switch (action.type) {
    case "SET_THEME":
      return action.payload;
    default:
      return state;
  }
};
