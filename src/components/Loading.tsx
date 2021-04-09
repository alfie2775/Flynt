import React from "react";

interface Props {
  height?: string;
  width?: string;
  borderSize?: string;
}

const Loading: React.FC<Props> = ({
  height = "65px",
  width = "65px",
  borderSize = "10px",
}) => {
  return (
    <div
      style={{
        width,
        height,
        border: borderSize + " solid rgb(253, 253, 253)",
        borderTop: borderSize + " solid rgb(68, 68, 68)",
        borderBottom: borderSize + " solid rgb(68, 68, 68)",
      }}
      className="loading"
    ></div>
  );
};
export default Loading;
