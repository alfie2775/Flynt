import { templates } from "./templates";
interface Values {
  [key: string]: string;
}
export const getValues: () => Values = () => {
  if (localStorage.getItem("Codes")) {
    return JSON.parse(localStorage.getItem("Codes")!);
  } else {
    localStorage.setItem("Codes", JSON.stringify(templates));
    return templates;
  }
};

export const resetValue: (lang: string, value: Values) => void = (
  lang,
  value
) => {
  value[lang] = templates[lang];
  localStorage.setItem("Codes", JSON.stringify(value));
};

export const updateValue: (lang: string, value: string) => void = (
  lang,
  value
) => {
  var values = JSON.parse(localStorage.getItem("Codes")!);
  values[lang] = value;
  localStorage.setItem("Codes", JSON.stringify(values));
};

export const getTheme: () => string = () => {
  if (!localStorage.getItem("Theme")) localStorage.setItem("Theme", "Twilight");
  return localStorage.getItem("Theme")!;
};

export const updateTheme: (theme: string) => void = (theme) => {
  localStorage.setItem("Theme", theme);
};
