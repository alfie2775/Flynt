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
  } else {
    return (
      <div id="output" className={className || ""}>
        <h3>Output</h3>
        <div className="output">
          <pre
            style={{
              color: "white",
              margin: "0",
              fontFamily: "Josefin Sans",
              fontSize: "large",
            }}
          >
            {output || "Output is Empty"}
          </pre>
        </div>
      </div>
    );
  }
};
export default Output;
