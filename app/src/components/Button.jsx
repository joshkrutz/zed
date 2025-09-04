import React from "react";

export default function Button({ children, type, className, ...props }) {
  if (type === "ghost") {
    return (
      <button
        className={`cursor-pointer p-2 pl-8 pr-8 bg-white hover:text-accent1-hover text-accent1 rounded-xl ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  } else if (type === "destructive") {
    return (
      <button
        className={`disabled:cursor-not-allowed disabled:bg-destructive disabled:text-red-300 cursor-pointer p-2 pl-8 pr-8 bg-destructive-red hover:bg-destructive-red-hover text-white rounded-xl  ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`disabled:cursor-not-allowed disabled:bg-gray-300 cursor-pointer p-2 pl-8 pr-8 bg-accent1 hover:bg-accent1-hover text-white rounded-xl  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
