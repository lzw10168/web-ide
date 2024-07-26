import React, { KeyboardEvent, useCallback, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { html } from "@codemirror/lang-html"
import { less } from "@codemirror/lang-less"
import { githubDark } from "@uiw/codemirror-theme-github"
export interface CodeMirrorWrapProps {
  language: "javascript" | "html" | "less"
  initValue: string
  onChange: (val: string, viewUpdate: any) => void
}

const languageMap = {
  javascript: javascript({ jsx: true }),
  html: html(),
  less: less(),
}

export function CodeMirrorWrap(props: CodeMirrorWrapProps) {
  const { language, onChange, initValue } = props
  const [value, setValue] = useState(initValue)
  const handleChange = useCallback((val: string, viewUpdate) => {
    onChange(val, viewUpdate)
    setValue(val)
  }, [])

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
      event.preventDefault()
    }
  }
  return (
    <CodeMirror
      value={value}
      theme={githubDark}
      height="100%"
      extensions={[languageMap[language]]}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}
