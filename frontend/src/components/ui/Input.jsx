import { forwardRef } from "react";

const Input = forwardRef(({ label, error, ...props }, ref) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium mb-1">{label}</label>}
    <input
      ref={ref}
      className={`w-full border rounded p-2 ${error ? "border-red-500" : "border-gray-300"}`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
));

Input.displayName = "Input";
export default Input;
