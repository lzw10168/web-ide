import { FaCloud } from "react-icons/fa"
import { IoSettings } from "react-icons/io5"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import { ViewMode } from "@/type"
import React from "react"

const rotationClasses = {
  left: "rotate-90",
  right: "-rotate-90",
  top: "rotate-180",
  bottom: "rotate-0",
}

const GridIcon = React.memo(({ viewMode }: { viewMode: ViewMode }) => (
  <svg
    viewBox="0 0 20 20"
    className={`transform transition-all ${rotationClasses[viewMode] || ""}`}
    width="16"
    height="16"
    fill="#fff"
  >
    <path d="M0 9.002C0 8.45.455 8 .992 8h18.016c.548 0 .992.456.992 1.002v9.996c0 .553-.455 1.002-.992 1.002H.992C.444 20 0 19.544 0 18.998V9.002Zm0-8C0 .45.451 0 .99 0h4.02A.99.99 0 0 1 6 1.003v4.994C6 6.551 5.549 7 5.01 7H.99A.99.99 0 0 1 0 5.997V1.003Zm7 0C7 .45 7.451 0 7.99 0h4.02A.99.99 0 0 1 13 1.003v4.994C13 6.551 12.549 7 12.01 7H7.99A.99.99 0 0 1 7 5.997V1.003Zm7 0C14 .45 14.451 0 14.99 0h4.02A.99.99 0 0 1 20 1.003v4.994C20 6.551 19.549 7 19.01 7h-4.02A.99.99 0 0 1 14 5.997V1.003Z"></path>
  </svg>
))

const GridGroup = React.memo(
  ({
    viewMode,
    onClick,
  }: {
    viewMode: ViewMode
    onClick: (viewmode: ViewMode) => void
  }) => (
    <div className="flex">
      {(["left", "right", "top", "bottom"] as ViewMode[]).map((item) => (
        <button
          key={item}
          onClick={() => onClick(item)}
          className={`w-full h-10 flex items-center justify-center hover:bg-slate-600 border-r border-white/5 ${
            viewMode === item ? "bg-slate-600" : ""
          }`}
          aria-label={`Change view to ${item}`}
        >
          <GridIcon viewMode={item} />
        </button>
      ))}
    </div>
  )
)

const RightButton = React.memo(
  ({
    onClick,
    icon,
    text,
  }: {
    onClick?: () => void
    icon?: React.ReactNode
    text?: string
  }) => (
    <button
      onClick={onClick}
      className="bg-slate-700 h-10 flex items-center text-white px-5 py-2 rounded-md mr-2 hover:bg-slate-600"
      aria-label={text}
    >
      {icon}
      {text && <span className="ml-1">{text}</span>}
    </button>
  )
)

function Header({
  viewMode,
  onViewModeChange,
}: {
  viewMode: ViewMode
  onViewModeChange: (viewmode: ViewMode) => void
}) {
  return (
    <header className="flex justify-between h-16">
      <div className="flex items-center px-2">
        <div className="w-8 h-8">
          <img src="/logo.png" alt="web-ide" />
        </div>
        <h1 className="text-2xl font-bold ml-2">Web Ide</h1>
      </div>
      <div className="flex items-center">
        <RightButton text="Save" icon={<FaCloud size={18} color="#fff" />} />
        <RightButton
          text="Settings"
          icon={<IoSettings size={18} color="#fff" />}
        />

        <Popover>
          <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
            <RightButton icon={<GridIcon viewMode={viewMode} />} />
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="mt-3 w-40 divide-y divide-white/5 rounded-md bg-slate-700 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            <h1 className="text-left text-white/90 text-sm/6 font-semibold px-4 py-2">
              Change View
            </h1>
            <GridGroup viewMode={viewMode} onClick={onViewModeChange} />
          </PopoverPanel>
        </Popover>
        <RightButton text="Sign Up" />
        <RightButton text="Log In" />
      </div>
    </header>
  )
}

export default Header
