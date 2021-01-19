import React from "react";
import Loading from "./Loading";

interface Props {
  isLoading: boolean;
  output: string;
  status: string;
  className?: string;
}

const Output: React.FC<Props> = ({ isLoading, status, output, className }) => {
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
        <h6 style={{ color: status === "Runtime Error" ? "red" : "green" }}>
          {status}
        </h6>
        <div className="output">{output}</div>
      </div>
    );
  } else {
    return <></>;
  }
};
export default Output;
