interface State {
  [key: string]: string[];
}

export const templates: (
  state: State | null,
  action: { type: string; payload: any }
) => State | null = (state = null, action) => {
  switch (action.type) {
    case "EDIT_TEMPLATE":
      return state;

    case "ADD_TEMPLATE":
      return {
        ...state,
        [action.payload.lang]: [
          ...(state ? state[action.payload.lang] : []),
          action.payload.code,
        ],
      };

    case "ADD_TEMPLATES":
      var templates: State = {};
      for (let template of action.payload) {
        if (templates[template.lang] !== undefined) {
          templates[template.lang] = [];
        }
        templates[template.lang] = [...templates[template.lang], template.code];
      }
      return templates;

    default:
      return state;
  }
};
