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
  const body = new FormData();
  body.append("LanguageChoice", langs[lang]);
  body.append(
    "Program",
    lang === "Java" ? code.replace("Flynt", "Rextester") : code
  );
  body.append("Input", input);
  body.append("CompilerArgs", cArgs[lang] || "");
  return fetch("https://rextester.com/rundotnet/api", {
    method: "POST",
    body: body,
  })
    .then(
      (res) => res.json(),
      (err) => err
    )
    .catch((err) => err);
};
