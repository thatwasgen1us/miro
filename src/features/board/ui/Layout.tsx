import React, { Ref } from "react";

export function Layout({ children, ref, ...props }: {
  children: React.ReactNode;
  ref: Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="grow relative"
      ref={ref}
      {...props}
      tabIndex={0}
    >
      {children}
    </div>);
}
