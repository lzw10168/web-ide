import React, { KeyboardEvent, useCallback, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { html } from "@codemirror/lang-html"
import { less } from "@codemirror/lang-less"
import { githubDark } from "@uiw/codemirror-theme-github"
import { LanguageType } from "@/type"
import EditorLayout from "@/UI/EditorLayout"
export interface CodeEditorProps {
  language: LanguageType
  initValue: string
  onChange?: (val: string, viewUpdate: any) => void
  onSave: (value: string) => void
}

const languageMap = {
  js: javascript({ jsx: true }),
  html: html(),
  less: less(),
}

export default function CodeEditor(props: CodeEditorProps) {
  const { language, onSave, onChange, initValue } = props
  const [value, setValue] = useState(initValue)
  const [isUnSave, setIsUnSave] = useState(false)
  const handleChange = useCallback((val: string, viewUpdate: any) => {
    setIsUnSave(true)
    onChange?.(val, viewUpdate)
    setValue(val)
  }, [])

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
      event.preventDefault()
      setIsUnSave(false)
      onSave(value)
    }
  }
  return (
    <EditorLayout type={language} fileName={language} isUnSave={isUnSave}>
      <CodeMirror
        value={value}
        theme={githubDark}
        height="100%"
        extensions={[languageMap[language]]}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </EditorLayout>
  )
}
