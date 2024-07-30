import { INIT_HTML, INIT_JAVASCRIPT, INIT_LESS } from "./constant"
import "./index.less"
import { CodeMirrorWrap } from "@/components/CodeMirrorWrap"
import PreviewResult from "@/components/PreviewResult"
import HeaderLayout from "@/UI/HeaderLayout"
import { useState } from "react"
import { ViewMode } from "@/type"
import ResizableLayout from "@/UI/ResizableLayout"
function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("bottom")
  const handleViewMode = (mode: ViewMode) => {
    setViewMode(mode)
  }
  return (
    <div className="h-full flex flex-col">
      <HeaderLayout viewMode={viewMode} onViewModeChange={handleViewMode} />
      <ResizableLayout previewResult={<PreviewResult />} viewMode={viewMode}>
        <CodeMirrorWrap
          language="html"
          initValue={INIT_HTML}
          onChange={() => {}}
        />
        <CodeMirrorWrap
          language="js"
          initValue={INIT_JAVASCRIPT}
          onChange={() => {}}
        />
        <CodeMirrorWrap
          language="less"
          initValue={INIT_LESS}
          onChange={() => {}}
        />
      </ResizableLayout>
    </div>
  )
}
export default App
