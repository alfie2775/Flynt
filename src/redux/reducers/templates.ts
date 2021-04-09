interface State {
  [key: string]: { id: string; code: string }[];
}

export const templates: (
  state: State | null,
  action: { type: string; payload: any }
) => State | null = (state = null, action) => {
  switch (action.type) {
    case "EDIT_TEMPLATE":
      return state;

    case "ADD_TEMPLATES":
      var templates: State = {};
      for (let template of action.payload) {
        if (templates[template.lang] === undefined) {
          templates[template.lang] = [];
        }
        templates[template.lang] = [
          ...templates[template.lang],
          { id: template._id, code: template.code },
        ];
      }
      return templates;

    case "DELETE_TEMPLATES":
      return null;

    default:
      return state;
  }
};
