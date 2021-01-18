import React from "react";
import Loading from "./Loading";

interface Props {
  isLoading: boolean;
  output: string;
  className?: string;
}

const Output: React.FC<Props> = ({ isLoading, output, className }) => {
  if (isLoading) {
    return (
      <div id="output" className={className || ""}>
        <h3>Output</h3>
        <Loading />
      </div>
    );
  } else if (output) {
    return (
      <div id="output" className={className || ""}>
        <h3>Output</h3>
        <div className="output">{output}</div>
      </div>
    );
  } else {
    return <></>;
  }
};
export default Output;
