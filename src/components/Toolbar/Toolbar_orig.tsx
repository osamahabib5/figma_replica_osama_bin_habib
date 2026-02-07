import React, { useState } from 'react'
import {
  MoveIcon,
  FrameIcon,
  RectangleIcon,
  ShapeIcon,
  PenIcon,
  TextIcon,
  CommentIcon,
  ActionsIcon,
  ChevronDownIcon,
} from '@components/LayersPanel/icons'

type ToolMode = 'draw' | 'design' | 'dev'
type ToolName = 'move' | 'frame' | 'rectangle' | 'shape' | 'pen' | 'text' | 'comment' | 'actions'

interface Tool {
  id: ToolName
  label: string
  shortcut: string
  icon: React.ReactNode
  submenu?: boolean
}

const TOOLS: Tool[] = [
  { id: 'move', label: 'Move', shortcut: 'V', icon: <MoveIcon size={20} />, submenu: true },
  { id: 'frame', label: 'Frame', shortcut: 'F', icon: <FrameIcon size={20} />, submenu: true },
  { id: 'rectangle', label: 'Rectangle', shortcut: 'R', icon: <RectangleIcon size={20} />, submenu: true },
  { id: 'shape', label: 'Shape', shortcut: 'O', icon: <ShapeIcon size={20} />, submenu: true },
  { id: 'pen', label: 'Pen', shortcut: 'P', icon: <PenIcon size={20} />, submenu: true },
  { id: 'text', label: 'Text', shortcut: 'T', icon: <TextIcon size={20} /> },
  { id: 'comment', label: 'Comment', shortcut: 'C', icon: <CommentIcon size={20} /> },
  { id: 'actions', label: 'Actions', shortcut: 'Ctrl+K', icon: <ActionsIcon size={20} /> },
]

const MODES: { id: ToolMode; label: string; shortcut?: string }[] = [
//   { id: 'draw', label: 'Draw' },
//   { id: 'design', label: 'Design' },
//   { id: 'dev', label: 'Dev Mode' },
]

export const Toolbar: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<ToolName>('move')
  const [activeMode, setActiveMode] = useState<ToolMode>('design')

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center justify-between bg-figma-bg border border-figma-border rounded-full px-3 py-2 h-12 shadow-2xl gap-2">
        {/* Left: Tools */}
        <div className="flex items-center gap-0.5">
        {/* Move Tool Group */}
        <div className="flex items-center gap-0">
          <button
            onClick={() => setSelectedTool('move')}
            className={`p-2 rounded transition-colors ${
              selectedTool === 'move'
                ? 'bg-figma-accent text-figma-text-primary'
                : 'text-figma-text-secondary hover:bg-figma-bg-hover'
            }`}
            title={`Move (${TOOLS[0].shortcut})`}
            aria-pressed={selectedTool === 'move'}
          >
            {TOOLS[0].icon}
          </button>
          <button
            className="p-2 text-figma-text-secondary hover:text-figma-text-primary hover:bg-figma-bg-hover rounded transition-colors"
            title="Move tools"
            aria-label="Move tools"
            aria-haspopup="menu"
          >
            <ChevronDownIcon size={16} />
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-figma-border mx-1" />

        {/* Frame Tool Group */}
        <div className="flex items-center gap-0">
          <button
            onClick={() => setSelectedTool('frame')}
            className={`p-2 rounded transition-colors ${
              selectedTool === 'frame'
                ? 'bg-figma-accent text-figma-text-primary'
                : 'text-figma-text-secondary hover:bg-figma-bg-hover'
            }`}
            title={`Frame (${TOOLS[1].shortcut})`}
            aria-pressed={selectedTool === 'frame'}
          >
            {TOOLS[1].icon}
          </button>
          <button
            className="p-2 text-figma-text-secondary hover:text-figma-text-primary hover:bg-figma-bg-hover rounded transition-colors"
            title="Region tools"
            aria-label="Region tools"
            aria-haspopup="menu"
          >
            <ChevronDownIcon size={16} />
          </button>
        </div>

        {/* Rectangle Tool Group */}
        <div className="flex items-center gap-0">
          <button
            onClick={() => setSelectedTool('rectangle')}
            className={`p-2 rounded transition-colors ${
              selectedTool === 'rectangle'
                ? 'bg-figma-accent text-figma-text-primary'
                : 'text-figma-text-secondary hover:bg-figma-bg-hover'
            }`}
            title={`Rectangle (${TOOLS[2].shortcut})`}
            aria-pressed={selectedTool === 'rectangle'}
          >
            {TOOLS[2].icon}
          </button>
          <button
            className="p-2 text-figma-text-secondary hover:text-figma-text-primary hover:bg-figma-bg-hover rounded transition-colors"
            title="Shape tools"
            aria-label="Shape tools"
            aria-haspopup="menu"
          >
            <ChevronDownIcon size={16} />
          </button>
        </div>
        {/* Shape Tool Group */}
        <div className="flex items-center gap-0">
          <button
            onClick={() => setSelectedTool('shape')}
            className={`p-2 rounded transition-colors ${
              selectedTool === 'shape'
                ? 'bg-figma-accent text-figma-text-primary'
                : 'text-figma-text-secondary hover:bg-figma-bg-hover'
            }`}
            title={`Shape (${TOOLS[3].shortcut})`}
            aria-pressed={selectedTool === 'shape'}
          >
            {TOOLS[3].icon}
          </button>
          <button
            className="p-2 text-figma-text-secondary hover:text-figma-text-primary hover:bg-figma-bg-hover rounded transition-colors"
            title="Shape tools"
            aria-label="Shape tools"
            aria-haspopup="menu"
          >
            <ChevronDownIcon size={16} />
          </button>
        </div>

        {/* Pen Tool Group */}
        <div className="flex items-center gap-0">
          <button
            onClick={() => setSelectedTool('pen')}
            className={`p-2 rounded transition-colors ${
              selectedTool === 'pen'
                ? 'bg-figma-accent text-figma-text-primary'
                : 'text-figma-text-secondary hover:bg-figma-bg-hover'
            }`}
            title={`Pen (${TOOLS[4].shortcut})`}
            aria-pressed={selectedTool === 'pen'}
          >
            {TOOLS[4].icon}
          </button>
          <button
            className="p-2 text-figma-text-secondary hover:text-figma-text-primary hover:bg-figma-bg-hover rounded transition-colors"
            title="Creation tools"
            aria-label="Creation tools"
            aria-haspopup="menu"
          >
            <ChevronDownIcon size={16} />
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-figma-border mx-1" />

        {/* Text, Comment, Actions */}
        {TOOLS.slice(5).map((tool) => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`p-2 rounded transition-colors ${
              selectedTool === tool.id
                ? 'bg-figma-accent text-figma-text-primary'
                : 'text-figma-text-secondary hover:bg-figma-bg-hover'
            }`}
            title={`${tool.label} (${tool.shortcut})`}
            aria-pressed={selectedTool === tool.id}
          >
            {tool.icon}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-figma-border mx-2" />

      {/* Right: Mode Toggle */}
      <div className="flex items-center gap-1 bg-figma-bg-hover rounded p-1">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`px-3 py-1.5 rounded text-sm transition-colors ${
              activeMode === mode.id
                ? 'bg-figma-accent text-figma-text-primary font-medium'
                : 'text-figma-text-secondary hover:text-figma-text-primary'
            }`}
            title={mode.label}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Toolbar
