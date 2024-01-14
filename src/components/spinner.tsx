import React from "react";

const Spinner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    <svg className="animate-spin" viewBox="25 25 50 50">
      <circle
        className="animate-[dash_1.5s_ease-in-out_infinite]"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke="#70c542"
        strokeWidth="2"
        strokeDasharray="150, 200"
        strokeDashoffset="-10"
        strokeLinecap="round"
      />
    </svg>
  </div>
));
Spinner.displayName = "Spinner";

export { Spinner };
