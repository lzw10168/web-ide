import { ViewMode } from "@/type"
import Split from "react-split"

interface ResizableLayoutProps {
  children: React.ReactNode
  previewResult: React.ReactNode
  viewMode: ViewMode
}

type SplitProps = {
  className?: string
  sizes?: number[]
  minSize: number
  gutterSize: number
  snapOffset: number
  dragInterval: number
  gutterAlign: "start" | "end"
  direction?: "horizontal" | "vertical"
  expandToMin: boolean
  cursor?: string
}

const defaultSplitProps: SplitProps = {
  minSize: 100,
  gutterSize: 20,
  expandToMin: false,
  snapOffset: 10,
  dragInterval: 1,
  gutterAlign: "start",
}
function ResizableLayout({
  children,
  previewResult,
  viewMode,
}: ResizableLayoutProps) {
  const isHorizontal = viewMode === "left" || viewMode === "right"
  const isVertical = viewMode === "top" || viewMode === "bottom"
  if (isVertical) {
    const sizes = viewMode === "bottom" ? [60, 40] : [40, 60]
    return (
      <Split
        {...defaultSplitProps}
        key={viewMode}
        className="h-full"
        sizes={sizes}
        direction="vertical"
      >
        {viewMode === "top" ? previewResult : null}
        <Split
          {...defaultSplitProps}
          className="h-full flex flex-row"
          sizes={[33.3, 33.3, 33.3]}
          direction="horizontal"
        >
          {children}
        </Split>
        {viewMode === "bottom" ? previewResult : null}
      </Split>
    )
  }

  if (isHorizontal) {
    const sizes = viewMode === "right" ? [60, 40] : [40, 60]
    return (
      <Split
        {...defaultSplitProps}
        key={viewMode}
        className="h-full flex flex-row"
        sizes={sizes}
        direction="horizontal"
      >
        {viewMode === "left" ? previewResult : null}
        <Split
          {...defaultSplitProps}
          className="h-full flex flex-col"
          sizes={[33.3, 33.3, 33.3]}
          direction="vertical"
        >
          {children}
        </Split>
        {viewMode === "right" ? previewResult : null}
      </Split>
    )
  }
}

export default ResizableLayout
