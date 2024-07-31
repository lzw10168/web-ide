import { HTML_CACHE_KEY, JS_CACHE_KEY, LESS_CACHE_KEY } from "./constant"
import "./index.less"
import CodeEditor from "@/components/CodeEditor"
import PreviewResult from "@/components/PreviewResult"
import HeaderLayout from "@/UI/HeaderLayout"
import { useEffect, useState } from "react"
import { ViewMode } from "@/type"
import ResizableLayout from "@/UI/ResizableLayout"
function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("bottom")
  const [updateKey, setUpdateKey] = useState(0)
  const [updateLayoutKey, setUpdateLayoutKey] = useState(0)
  const INIT_HTML =
    localStorage.getItem(HTML_CACHE_KEY) || `<h1>Hello World</h1>`
  const INIT_JAVASCRIPT =
    localStorage.getItem(JS_CACHE_KEY) || `console.log('Hello World')`
  const INIT_LESS =
    localStorage.getItem(LESS_CACHE_KEY) || `h1 { color: #f70; }`
  useEffect(() => {
    setUpdateLayoutKey((prev) => prev + 1)
  }, [viewMode])
  const handleViewMode = (mode: ViewMode) => {
    setViewMode(mode)
  }

  const saveToServer = async (
    path: string,
    value: string | object,
    cacheKey: string
  ) => {
    const body =
      typeof value === "string"
        ? JSON.stringify({ value })
        : JSON.stringify(value)
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })

    if (res.ok) {
      const data = await res.json()
      console.log("data: ", data)
      if (cacheKey && typeof value === "string") {
        localStorage.setItem(cacheKey, value)
      }
      setUpdateKey((prev) => prev + 1)
    }
  }

  const handleInit = async () => {
    await saveToServer(
      "/server/save/init",
      {
        html: INIT_HTML,
        js: INIT_JAVASCRIPT,
        less: INIT_LESS,
      },
      null
    ) // Assuming you don't need to cache the initial payload
  }

  useEffect(() => {
    handleInit()
  }, [])

  const handleSaveHtml = async (value: string) => {
    await saveToServer("/server/save/html", value, HTML_CACHE_KEY)
  }

  const handleSaveJs = async (value: string) => {
    await saveToServer("/server/save/js", value, JS_CACHE_KEY)
  }

  const handleSaveLess = async (value: string) => {
    await saveToServer("/server/save/less", value, LESS_CACHE_KEY)
  }

  return (
    <div className="h-full flex flex-col">
      <HeaderLayout viewMode={viewMode} onViewModeChange={handleViewMode} />
      <ResizableLayout
        previewResult={<PreviewResult flag={updateKey} />}
        key={updateLayoutKey}
        viewMode={viewMode}
      >
        <CodeEditor
          language="html"
          initValue={INIT_HTML}
          onSave={handleSaveHtml}
        />
        <CodeEditor
          language="js"
          initValue={INIT_JAVASCRIPT}
          onSave={handleSaveJs}
        />
        <CodeEditor
          language="less"
          initValue={INIT_LESS}
          onSave={handleSaveLess}
        />
      </ResizableLayout>
    </div>
  )
}
export default App
