import React from "react";
import Ace from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-github";

interface Props {
  value: string;
  setValue: () => void;
  mode: string;
  theme: string;
}

const CodeEditor: React.FC<Props> = ({ value, setValue, mode, theme }) => {
  return (
    <Ace
      width="60%"
      fontSize="1rem"
      mode="python"
      theme="github"
      onChange={setValue}
      name="code"
      value={value}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        showLineNumbers: true,
        tabSize: 4,
        showPrintMargin: false,
      }}
      showGutter={true}
      highlightActiveLine={true}
    />
  );
};

export default CodeEditor;
