import { CanvasRect } from "@/features/board/hooks/use-canvas-rect";
import { NodesDimensionsMap } from "@/features/board/hooks/use-nodes-dimensions";
import { NodesModel } from "@/features/board/model/nodes";
import { ViewState } from "@/features/board/view-model/use-view-model";
import { Dispatch, SetStateAction } from "react";


export type ViewModelParams = {
  setViewState: Dispatch<SetStateAction<ViewState>>
  nodesModel: NodesModel;
  canvasRect: CanvasRect | undefined;
  nodesDimensions: NodesDimensionsMap
};
