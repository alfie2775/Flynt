export interface RecentCode {
  datetime: string;
  code: string;
  input: string;
  output: string;
  lang: string;
}

export const recentCodes: (
  state: RecentCode[],
  action: { type: string; payload: RecentCode }
) => RecentCode[] = (state = [], action) => {
  switch (action.type) {
    case "ADD_RECENT_CODE":
      return [action.payload, ...state];

    default:
      return state;
  }
};
