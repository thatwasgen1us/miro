import { distanceFromPoints } from "@/features/board/domain/point";
import { pointOnScreenToCanvas } from "@/features/board/domain/screen-to-canvas";
import { Selection, SelectionModifier, selectItems } from "@/features/board/domain/selection";
import { goToAddSticker } from "@/features/board/view-model/variants/add-sticker";
import { goToSelectionWindow } from "@/features/board/view-model/variants/selection-window";
import { ViewModelParams } from "../view-model-params";
import { ViewModel } from "../view-model-type";


export type IdleViewState = {
  type: "idle"
  selectedIds: Set<string>
  mouseDown?: {
    x: number;
    y: number;
  }
}

export function useIdleViewModel({
  nodesModel,
  setViewState,
  canvasRect
}: ViewModelParams) {

  const select = (
    lastState: IdleViewState,
    ids: string[], 
    modificator: SelectionModifier
  ) => {
    setViewState({
      ...lastState,
      selectedIds: selectItems(lastState.selectedIds, ids, modificator)
    })
  }
  
  return (idleState: IdleViewState): ViewModel => ({
    nodes: nodesModel.nodes.map((node) => ({
      ...node,
      isSelected: idleState.selectedIds.has(node.id),
      onClick: (event) => {
        if (event.ctrlKey || event.shiftKey) {
          select(idleState, [node.id], "toggle")
        } else {
          select(idleState, [node.id], "replace")
        }
      },
    })),
    layout: {
      onKeyDown: (event) => {
        if (event.key === 's') {
          setViewState(goToAddSticker());
        }
      },
    },
    overlay: {
      onMouseDown: (e) => {
        setViewState({
          ...idleState,
          mouseDown: pointOnScreenToCanvas({
            x: e.clientX,
            y: e.clientY
          },
          canvasRect
        ),})
      },
      onMouseUp: () => {
        if (idleState.mouseDown) {
          setViewState({
          ...idleState,
          selectedIds: selectItems(
            idleState.selectedIds,
            [],
            "replace",
          ),
        })}
      }
    },
    window: {
      onMouseMove: (e) => {
        if (idleState.mouseDown) {

          const currentPoint = pointOnScreenToCanvas(
            {
              x: e.clientX,
              y: e.clientY
            },
          canvasRect,
          );

          if (distanceFromPoints(idleState.mouseDown, currentPoint) > 5) {
            setViewState(
              goToSelectionWindow({
                startPoint: idleState.mouseDown,
                endPoint: currentPoint,
                initialSelectedIds: e.shiftKey 
                  ? idleState.selectedIds
                  : undefined,
              }),
            );
          }
        }
      },
      onMouseUp: () => {
        setViewState({
          ...idleState,
          mouseDown: undefined
        })
      }
    },
    actions: {
      addSticker: {
        isActive: false,
        onClick: () => {
          setViewState(goToAddSticker())
        }
      }
    },
    
  }
  )
}

export function goToIdle({
  selectedIds,
} : {
  selectedIds?: Selection
} = {}): IdleViewState {
  return {
    type: "idle",
    selectedIds: selectedIds ?? new Set()
  }
}


