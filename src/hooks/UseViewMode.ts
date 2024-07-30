import { ViewMode } from "@/type"

function UseViewMode(viewMode: ViewMode) {
  return {
    isHorizontal: viewMode === "left" || viewMode === "right",
    isVertical: viewMode === "top" || viewMode === "bottom",
    isTop: viewMode === "top",
    isBottom: viewMode === "bottom",
    isLeft: viewMode === "left",
    isRight: viewMode === "right",
  }
}

export default UseViewMode
