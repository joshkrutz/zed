export default function Button({ children, type, className, ...props }) {
  if (type === "ghost") {
    return (
      <button
        className={`cursor-pointer p-2 pl-8 pr-8 bg-white hover:text-accent1-hover text-accent1 rounded-xl ${className}`}
        {...props}
      >
        {...children}
      </button>
    );
  }

  return (
    <button
      className={`cursor-pointer p-2 pl-8 pr-8 bg-accent1 hover:bg-accent1-hover text-white rounded-xl  ${className}`}
      {...props}
    >
      {...children}
    </button>
  );
}
