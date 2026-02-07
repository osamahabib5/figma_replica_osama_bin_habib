import React, { useState } from 'react'
import { 
  MousePointer2, 
  Frame, 
  Square, 
  PenTool, 
  Type, 
  Shapes, 
  Hand, 
  MessageSquare, 
  Code2, 
  ChevronDown 
} from 'lucide-react'

type ToolName = 'move' | 'frame' | 'rectangle' | 'pen' | 'text' | 'hand' | 'resources' | 'comment'

interface Tool {
  id: ToolName
  label: string
  shortcut: string
  icon: React.ReactNode
  hasSubmenu?: boolean
}

const TOOLS: Tool[] = [
  { id: 'move', label: 'Move', shortcut: 'V', icon: <MousePointer2 size={20} />, hasSubmenu: true },
  { id: 'frame', label: 'Frame', shortcut: 'F', icon: <Frame size={20} />, hasSubmenu: true },
  { id: 'rectangle', label: 'Rectangle', shortcut: 'R', icon: <Square size={20} />, hasSubmenu: true },
  { id: 'pen', label: 'Pen', shortcut: 'P', icon: <PenTool size={20} />, hasSubmenu: true },
  { id: 'text', label: 'Text', shortcut: 'T', icon: <Type size={20} /> },
  { id: 'hand', label: 'Hand', shortcut: 'H', icon: <Hand size={20} /> },
  { id: 'resources', label: 'Resources', shortcut: 'Shift+I', icon: <Shapes size={20} /> },
]

export const Toolbar: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<ToolName>('move')
  const [isDevMode, setIsDevMode] = useState(false)

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
      {/* Single joined container to remove spacing between sub-components */}
      <div className="flex items-center bg-[#1e1e1e] border border-[#2c2c2c] rounded-xl px-1 py-1 h-[48px] shadow-2xl">
        
        {/* Main Tools Section */}
        <div className="flex items-center h-full px-1">
          {TOOLS.map((tool, index) => (
            <React.Fragment key={tool.id}>
              {/* Group Dividers (thin 1px lines) */}
              {(index === 1 || index === 4) && (
                <div className="w-[1px] h-5 bg-[#383838] mx-1.5" />
              )}
              
              <div className="flex items-center group h-full">
                <button
                  onClick={() => setSelectedTool(tool.id)}
                  className={`p-2 rounded-lg transition-all flex items-center justify-center ${
                    selectedTool === tool.id
                      ? 'bg-[#0c8ce9] text-white'
                      : 'text-[#b3b3b3] hover:bg-[#2c2c2c] hover:text-white'
                  }`}
                  title={`${tool.label} (${tool.shortcut})`}
                >
                  {tool.icon}
                </button>
                
                {tool.hasSubmenu && (
                  <button className="h-full px-0.5 text-[#b3b3b3] hover:text-white transition-colors flex items-center">
                    <ChevronDown size={12} strokeWidth={3} />
                  </button>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Section Divider (The line between the Hand tool and Comments) */}
        <div className="w-[1px] h-full bg-[#2c2c2c] mx-1" />

        {/* Right Section (Comments & Dev Mode) joined into the same parent */}
        <div className="flex items-center h-full px-1 gap-1">
          <button 
            className="p-2 text-[#b3b3b3] hover:bg-[#2c2c2c] rounded-lg transition-all flex items-center justify-center"
            title="Comments (C)"
          >
            <MessageSquare size={20} />
          </button>

          {/* Mini Divider for Dev Mode */}
          <div className="w-[1px] h-5 bg-[#383838] mx-0.5" />

          <button 
            onClick={() => setIsDevMode(!isDevMode)}
            className={`p-2 rounded-lg transition-all flex items-center justify-center ${
              isDevMode ? 'text-[#10b981]' : 'text-[#b3b3b3] hover:bg-[#2c2c2c]'
            }`}
            title="Dev Mode"
          >
            <Code2 size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toolbar