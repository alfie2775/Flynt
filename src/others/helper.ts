export const getUserName = (): string => {
  return localStorage.getItem("flynt-username")!;
};

export const setUserName = (username: string) => {
  localStorage.setItem("flynt-username", username)!;
};

export const removeUserData = () => {
  localStorage.removeItem("flynt-username");
  localStorage.removeItem("flynt-user-token");
};

export const getUserToken = (): string => {
  return localStorage.getItem("flynt-user-token")!;
};

export const setUserToken = (token: string) => {
  localStorage.setItem("flynt-user-token", token);
};

export const getHeaders = (): { [key: string]: string } => {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getUserToken(),
  };
};
