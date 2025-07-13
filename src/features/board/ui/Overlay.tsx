import React from "react";

export function Overlay({
  onClick, onMouseDown, onMouseUp
}: {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      className="absolute inset-0"
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
    </div>
  );
}
