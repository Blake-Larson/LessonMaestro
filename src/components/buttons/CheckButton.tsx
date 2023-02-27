import React from "react";

interface Props {
  width: string;
  height: string;
  padding: string;
}

function CheckButton({ width, height, padding }: Props) {
  return (
    <div
      className={`cursor-pointer rounded-md hover:bg-primary p-${padding} border border-base-300 bg-base-100 transition-colors duration-300`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-${width} h-${height}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    </div>
  );
}

export default CheckButton;
