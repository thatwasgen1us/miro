import { ViewModelParams } from "@/features/board/view-model/view-model-params";
import { ViewModel } from "../view-model-type";
import { goToIdle } from "@/features/board/view-model/variants/idle";

export type AddStickerViewState = {
  type: 'add-sticker'
}

export function useAddStickerViewModel({
  nodesModel,
  setViewState,
  canvasRect
} : ViewModelParams) {
  return (): ViewModel => ({
    nodes: nodesModel.nodes,
    layout: {
      onKeyDown: (event) => {
        if (event.key === 'Escape') {
          setViewState(goToIdle());
        }
      },
    },
    canvas: {
      onClick: (event) => {
        if(!canvasRect) return;
        nodesModel.addSticker({
          text: "Default",
          x: event.clientX - canvasRect.x,
          y: event.clientY - canvasRect.y,
        })
        setViewState(goToIdle());
      },
    },
    actions: {
      addSticker: {
        isActive: true,
        onClick: () => setViewState(goToIdle())
      }
    }
  }
  )
}

export function goToAddSticker() : AddStickerViewState {
  return {
    type: 'add-sticker'
  }
}