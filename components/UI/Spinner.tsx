import React from "react";

interface SpinnerProps {
  text?: string;
  size?: number; // u pikselima
  color?: string; // tailwind boja ili hex
}

const Spinner: React.FC<SpinnerProps> = ({
  text = "Loading...",
  size = 48,
  color = "#3b82f6", // default: Tailwind blue-500
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-2">
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 50 50"
      >
        <circle
          className="spinner-path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="90, 150"
          strokeDashoffset="0"
        />
      </svg>
      <span className="text-sm text-blue-500 font-medium">{text}</span>
    </div>
  );
};

export default Spinner;
