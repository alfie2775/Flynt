export const lang: (
  state: string,
  action: { type: string; payload: string }
) => string = (state = "Python", action) => {
  switch (action.type) {
    case "SET_LANG":
      return action.payload;
    default:
      return state;
  }
};
