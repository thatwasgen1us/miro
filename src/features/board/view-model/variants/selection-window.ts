import { ViewModelParams } from "@/features/board/view-model/view-model-params";
import { ViewModel } from "../view-model-type";
import { goToIdle } from "@/features/board/view-model/variants/idle";
import { createRectFromPoints, isPointInRect } from "@/features/board/domain/rect";
import { Point } from "@/features/board/domain/point";
import { pointOnScreenToCanvas } from "@/features/board/domain/screen-to-canvas";
import { selectItems } from "@/features/board/domain/selection";

export type SelectionWindowViewState = {
  type: 'selection-window';
  startPoint: Point;
  endPoint: Point;
  initialSelectedIds: Set<string>
}

export function useSelectionWindowViewModel({
  nodesModel,
  setViewState,
  canvasRect
} : ViewModelParams) {
  return (state: SelectionWindowViewState): ViewModel => {
    const rect = createRectFromPoints(state.startPoint, state.endPoint)
    return {
      selectionWindow: rect,
      nodes: nodesModel.nodes.map(node => ({
        ...node,
        isSelected: 
          isPointInRect(node, rect) || (state.initialSelectedIds.has(node.id))
      })), 

      window: {
        onMouseMove: (e) => {
          const currentPoint = pointOnScreenToCanvas(
            {
              x: e.clientX,
              y: e.clientY
            },
            canvasRect
          );
          setViewState({
            ...state,
            endPoint: currentPoint
          })
        },
        onMouseUp: () => {

          const nodesIdsInRect =  nodesModel.nodes
            .filter((node) => isPointInRect(node, rect))
            .map(node => node.id)
          setViewState(goToIdle({
            selectedIds: selectItems(
              state.initialSelectedIds,
              nodesIdsInRect,
              "add"
            ),
          }))
        }
      }
    }
  };
}

export function goToSelectionWindow(
  {
    startPoint,
    endPoint,
    initialSelectedIds
  } : {
    startPoint: Point,
    endPoint: Point,
    initialSelectedIds?: Set<string>
  }
) : SelectionWindowViewState {
  return {
    type: 'selection-window',
    startPoint,
    endPoint,
    initialSelectedIds: initialSelectedIds ?? new Set()
  }
}