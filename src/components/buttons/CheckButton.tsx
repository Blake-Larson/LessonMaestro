import React from "react";

interface Props {
  width: string;
  height: string;
  padding: string;
}

function CheckButton({ width, height, padding }: Props) {
  return (
    <div
      className={`btn-ghost btn border border-base-300 p-${padding} cursor-pointer rounded-md bg-base-100 hover:btn-primary`}
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
