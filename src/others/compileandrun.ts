interface Langs {
  [key: string]: string;
}

const langs: Langs = {
  Python: "24",
  "C++14": "27",
  C: "26",
  Java: "4",
};

export const compileAndRun: (
  lang: string,
  code: string,
  input: string
) => any = (lang, code, input) => {
  return fetch(
    "https://cors-anywhere.herokuapp.com/https://rextester.com/rundotnet/api",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LanguageChoice: langs[lang],
        Program: lang === "Java" ? code.replace("Flynt", "Rextester") : code,
        Input: input,
        CompilerArgs: "",
      }),
    }
  )
    .then(
      (res) => res.json(),
      (err) => err
    )
    .catch((err) => err);
};
