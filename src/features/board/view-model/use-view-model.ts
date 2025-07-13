import { AddStickerViewState, useAddStickerViewModel } from "@/features/board/view-model/variants/add-sticker";
import { goToIdle, IdleViewState, useIdleViewModel } from "@/features/board/view-model/variants/idle";
import { ViewModel } from "@/features/board/view-model/view-model-type";
import { useState } from "react";
import { ViewModelParams } from "./view-model-params";
import { SelectionWindowViewState, useSelectionWindowViewModel } from "@/features/board/view-model/variants/selection-window";

export type ViewState = 
  | IdleViewState 
  | AddStickerViewState 
  | SelectionWindowViewState;

export function useViewModel( params :Omit< ViewModelParams, 'setViewState'>) {

  const [viewState, setViewState] = useState<ViewState>(() => goToIdle())

  const newParams = {
    ...params,
    setViewState
  }

  const addStickerViewModel = useAddStickerViewModel(newParams)
  const idleViewModel = useIdleViewModel(newParams)
  const selectionWindowViewModel = useSelectionWindowViewModel(newParams)

  let viewModel: ViewModel
  switch (viewState.type) {
    case "add-sticker":
      viewModel = addStickerViewModel()
      break;
    case "idle": {
      viewModel =  idleViewModel(viewState)
      break;
    }
    case "selection-window": {
      viewModel =  selectionWindowViewModel(viewState)
      break;
    }
    default:
      throw new Error("Invalid view state");
  }

  return viewModel
}