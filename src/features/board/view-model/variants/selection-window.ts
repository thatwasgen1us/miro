import { Point } from "@/features/board/domain/point";
import { createRectFromDimensions, createRectFromPoints, isRectsIntersecting, Rect } from "@/features/board/domain/rect";
import { pointOnScreenToCanvas } from "@/features/board/domain/screen-to-canvas";
import { selectItems } from "@/features/board/domain/selection";
import { goToIdle } from "@/features/board/view-model/variants/idle";
import { ViewModelParams } from "@/features/board/view-model/view-model-params";
import { ViewModel } from "../view-model-type";

export type SelectionWindowViewState = {
  type: 'selection-window';
  startPoint: Point;
  endPoint: Point;
  initialSelectedIds: Set<string>
}

export function useSelectionWindowViewModel({
  nodesModel,
  setViewState,
  canvasRect,
  nodesDimensions,
} : ViewModelParams) {

  const getNodes = (state: SelectionWindowViewState, selectionRect: Rect) => 
    nodesModel.nodes.map((node) => {
      const nodeDimensions = nodesDimensions[node.id]
      const nodeRect = createRectFromDimensions(node, nodeDimensions)

      return {
        ...node,
        isSelected:
          isRectsIntersecting(nodeRect, selectionRect) || 
          state.initialSelectedIds.has(node.id)
      };
      
    })

  return (state: SelectionWindowViewState): ViewModel => {
    const rect = createRectFromPoints(state.startPoint, state.endPoint)
    const nodes = getNodes(state, rect)

    return {
      selectionWindow: rect,
      nodes, 
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

          const nodesIdsInRect =  nodes
            .filter(node => node.isSelected)
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