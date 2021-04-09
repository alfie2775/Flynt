import React from "react";
import Ace from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-dreamweaver";

interface Props {
  value: string;
  setValue: React.Dispatch<any>;
  lang: string;
  theme?: string;
  showGutter?: boolean;
  height?: string;
}

const CodeEditor: React.FC<Props> = ({
  value,
  setValue,
  lang,
  theme = "Dark",
  showGutter = true,
  height = "450px",
}) => {
  return (
    <Ace
      name="Code Editor"
      fontSize="1.1rem"
      mode={
        lang === "c" || lang === "c++ 17" || lang === "c++" ? "c_cpp" : lang
      }
      theme={theme === "Light" ? "dreamweaver" : "twilight"}
      width="100%"
      height={height}
      onChange={(val) => setValue(val)}
      value={value}
      editorProps={{ $blockScrolling: true }}
      highlightActiveLine={true}
      setOptions={{
        enableLiveAutocompletion: true,
        showLineNumbers: true,
        tabSize: 4,
      }}
      showGutter={showGutter}
    />
  );
};

export default CodeEditor;
