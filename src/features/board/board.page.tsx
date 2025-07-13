import { Actions } from "@/features/board/ui/Actions";
import { Canvas } from "@/features/board/ui/Canvas";
import { Dots } from "@/features/board/ui/Dots";
import { useCanvasRect } from "@/features/board/hooks/use-canvas-rect";
import { useLayoutFocus } from "@/features/board/hooks/use-layout-focus";
import { useWindowEvent } from "@/features/board/hooks/use-window-event";
import { Layout } from "@/features/board/ui/Layout";
import { useNodes } from "@/features/board/model/nodes";
import { Overlay } from "@/features/board/ui/Overlay";
import { SelectWindow } from "@/features/board/ui/SelectWindow";
import { Sticker } from "@/features/board/ui/Sticker";
import { useViewModel } from "@/features/board/view-model/use-view-model";
import { ArrowRightIcon, StickerIcon } from "lucide-react";
import { ActionButton } from "@/features/board/ui/ActionButton";



function BoardPage() {
  const nodesModel = useNodes()
  const focusLayoutRef = useLayoutFocus()
  const { canvasRef, canvasRect } = useCanvasRect();

  const viewModel = useViewModel({
    nodesModel,
    canvasRect
  })

  useWindowEvent(viewModel)

  return (
    <Layout 
      ref={focusLayoutRef}
      onKeyDown={viewModel.layout?.onKeyDown}
    >
    <Dots />
    <Canvas
      ref={canvasRef} 
      onClick={viewModel.canvas?.onClick}
      >
        <Overlay
          onClick={viewModel.overlay?.onClick}
          onMouseDown={viewModel.overlay?.onMouseDown}
          onMouseUp={viewModel.overlay?.onMouseUp}
        />
        {viewModel.nodes.map((node) => (
          <Sticker
            key={node.id} 
            text={node.text} 
            x={node.x} 
            y={node.y} 
            onClick={node.onClick}
            selected={node.isSelected}
          />
        ))}
      </Canvas>
      {viewModel.selectionWindow && (
        <SelectWindow {...viewModel.selectionWindow} />
      )}
      <Actions>
        <ActionButton 
          isActive={viewModel.actions?.addSticker?.isActive} 
          onClick={viewModel.actions?.addSticker?.onClick}>
          <StickerIcon />
        </ActionButton>
        <ActionButton isActive={false} onClick={() => {}}>
          <ArrowRightIcon />
        </ActionButton>
      </Actions>
    </Layout>
  )
}

export const Component = BoardPage;

