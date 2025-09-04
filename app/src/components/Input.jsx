export default function Input({ className, ...props }) {
  // TODO replace with a param that does custom input validation not just is empty
  const checkValidation = (e) => {
    if (e.target.value.length === 0) {
      e.target.classList.add(
        "ring-4",
        "ring-destructive",
        "border-red-500",
        "focus:border-destructive"
      );
    } else {
      e.target.classList.remove(
        "ring-4",
        "ring-destructive",
        "border-red-500",
        "focus:border-destructive"
      );
    }
  };

  return (
    <input
      autoFocus
      className={`disabled:bg-gray-200 disabled:cursor-not-allowed border border-[#dad9d9] rounded-lg p-1 pl-2 pr-2 focus:outline-[#acc9eb] focus:outline-4 focus:border-[#72A1D7] focus:border-2 ${className}`}
      onBlur={checkValidation}
      onFocus={(e) => {
        e.target.select();
      }}
      {...props}
    />
  );
}
