import React from "react";

interface Props {
  width: string;
  height: string;
  padding: string;
}

function CheckButton({ width, height, padding }: Props) {
  return (
    <div
      className={`cursor-pointer rounded-md border border-base-300 bg-base-100 p-0.5`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v12m6-6H6"
        />
      </svg>
    </div>
  );
}

export default CheckButton;
