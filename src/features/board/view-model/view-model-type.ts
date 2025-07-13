import { Rect } from "@/features/board/domain/rect";

export type ViewModelNode = {
  id: string;
  text: string;
  x: number;
  y: number;
  isSelected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}


export type ViewModel = {
  nodes: ViewModelNode[];
  selectionWindow?: Rect;
  layout?: {
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  };
  canvas?: {
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
  actions?: {
    addSticker?: {
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
      isActive?: boolean;
    };
  };
  overlay?: {
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onMouseUp?: (event: React.MouseEvent<HTMLDivElement>) => void;

  };
  window?: {
    onMouseUp?: (e: MouseEvent) => void
    onMouseMove?: (e: MouseEvent) => void
  }
};
