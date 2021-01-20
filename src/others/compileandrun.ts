interface Langs {
  [key: string]: string;
}

const langs: Langs = {
  Python: "24",
  "C++14": "7",
  C: "26",
  Java: "4",
};

const cArgs: Langs = {
  "C++14": "-Wall -std=c++14 -O2 -o a.out source_file.cpp",
  C: "-Wall -std=gnu99 -O2 -o a.out source_file.c",
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
        CompilerArgs: cArgs[lang] || "",
      }),
    }
  )
    .then(
      (res) => res.json(),
      (err) => err
    )
    .catch((err) => err);
};
