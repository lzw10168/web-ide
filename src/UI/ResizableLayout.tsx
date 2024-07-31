import UseViewMode from "@/hooks/UseViewMode"
import { ViewMode } from "@/type"
import { useEffect, useState } from "react"
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
  const { isHorizontal, isVertical, isBottom, isRight } = UseViewMode(viewMode)

  const sizes = isVertical ? [50, 50] : [50, 50]
  const [updateKey, setUpdateKey] = useState(0)

  useEffect(() => {
    setUpdateKey((prev) => prev + 1)
  }, [viewMode])

  useEffect(() => {
    setUpdateKey((prev) => prev + 1)
  }, [viewMode])
  if (isVertical) {
    return (
      <Split
        {...defaultSplitProps}
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
        {isBottom ? previewResult : null}
      </Split>
    )
  }

  if (isHorizontal) {
    return (
      <Split
        {...defaultSplitProps}
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
        {isRight ? previewResult : null}
      </Split>
    )
  }
}

export default ResizableLayout
