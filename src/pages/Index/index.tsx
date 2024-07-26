import { INIT_HTML, INIT_JAVASCRIPT, INIT_LESS } from "./constant"
import Split from "react-split"
import "./index.less"
import { CodeMirrorWrap } from "@/components/CodeMirrorWrap"

function App() {
  return (
    <Split
      className="split"
      sizes={[33.3, 33.3, 33.3]}
      minSize={100}
      expandToMin={false}
      gutterSize={20}
      snapOffset={30}
      dragInterval={1}
      gutterAlign="start"
      direction="horizontal"
      cursor="col-resize"
    >
      <CodeMirrorWrap
        language="html"
        initValue={INIT_HTML}
        onChange={() => {}}
      />
      <CodeMirrorWrap
        language="javascript"
        initValue={INIT_JAVASCRIPT}
        onChange={() => {}}
      />
      <CodeMirrorWrap
        language="less"
        initValue={INIT_LESS}
        onChange={() => {}}
      />
    </Split>
  )
}
export default App
