import React from "react";
import Loading from "./Loading";

interface Props {
  isLoading: boolean;
  output: string;
  status: string;
  error: string;
  className?: string;
}

const Output: React.FC<Props> = ({
  isLoading,
  status,
  output,
  error,
  className,
}) => {
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
        <h5 style={{ color: status === "Success" ? "green" : "red" }}>
          {status}
        </h5>
        <div className="output">
          <pre
            style={{
              color: "white",
              margin: "0",
              fontFamily: "Josefin Sans",
              fontSize: "large",
            }}
          >
            {output + (error || "") || "Output is Empty"}
          </pre>
        </div>
      </div>
    );
  }
};
export default Output;
