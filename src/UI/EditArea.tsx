import React from "react"
import { LanguageType } from "@/type"
import { IoLogoHtml5 } from "react-icons/io"
import { BiSolidFileCss } from "react-icons/bi"
import { TbBrandJavascript } from "react-icons/tb"

interface EditAreaProps {
  type: LanguageType
  isUnSave: boolean
  children: React.ReactNode
  fileName: string
}

function EditArea({ type, isUnSave, children, fileName }: EditAreaProps) {
  const typeIcon = {
    html: <IoLogoHtml5 size={20} className="text-red-500" />,
    less: <BiSolidFileCss size={20} className="text-blue-500" />,
    js: <TbBrandJavascript size={20} className="text-yellow-500" />,
  }

  return (
    <div className="flex flex-col h-full w-full border border-zinc-700 rounded-md">
      <div className="flex items-center bg-black-500 text-white ">
        <div className="bg-neutral-950	flex p-2 items-center">
          {typeIcon[type]}
          <span className="font-medium ml-1">{fileName.toUpperCase()}</span>
        </div>

        {isUnSave && (
          <span className="ml-1 w-2 h-2 bg-white rounded-full"></span>
        )}
      </div>
      <div className="flex-1 h-full overflow-auto">{children}</div>
    </div>
  )
}

export default EditArea
