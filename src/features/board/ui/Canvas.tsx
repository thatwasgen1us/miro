import React, { Ref } from "react";

export function Canvas({
  children, ref, ...props
}: {
  children: React.ReactNode;
  ref: Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className="absolute inset-0 select-none"
      ref={ref}
    >
      {children}
    </div>
  );
}
