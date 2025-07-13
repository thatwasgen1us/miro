import { ViewModel } from "@/features/board/view-model/view-model-type";
import { useEffect, useLayoutEffect, useRef } from "react";

export function useWindowEvent(viewModel: ViewModel) {
  const viewModelRef = useRef(viewModel)

  useLayoutEffect(() => {
    viewModelRef.current = viewModel
  }, [viewModel])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      viewModelRef.current.window?.onMouseMove?.(e);
    };
    const onMouseUp = (e: MouseEvent) => {
      viewModelRef.current.window?.onMouseUp?.(e);
    };
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [viewModelRef])
}