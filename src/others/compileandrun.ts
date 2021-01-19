interface Langs {
  [key: string]: string;
}

const langs: Langs = {
  Python: "PYTHON",
  "C++14": "CPP14",
  C: "C",
  Java: "JAVA",
};

export const compileAndRun: (
  lang: string,
  code: string,
  input: string
) => any = (lang, code, input) => {
  return fetch(
    `https://api.hackerearth.com/v4/partner/code-evaluation/submissions/`,
    {
      method: "POST",
      body: JSON.stringify({
        lang: langs[lang],
        source: code,
        input: input,
        memory_limit: 243232,
        time_limit: 5,
      }),
      headers: {
        "client-secret": process.env.REACT_APP_API_KEY || "",
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return fetch(res["status_update_url"])
        .then((res) => res.json())
        .then((res) => {
          var stderr: string = "";
          var status: string;
          if (res["run_status"].status === "RE") {
            stderr = res.stderr;
            status = "Runtime Error";
          } else {
            status = "Success";
          }
          return {
            status,
            stderr,
            output: fetch(res["run_status"].output).then((res) =>
              res.toString()
            ),
          };
        })
        .catch((err) => {
          return { error: err.message };
        });
    })
    .catch((err) => {
      return { error: err.message };
    });
};
