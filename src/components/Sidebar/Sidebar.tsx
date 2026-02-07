import React, { useRef, useState } from 'react'
import type { LayerNode } from '@/types/layer'
import { useSidebarStore } from '@state/useSidebarStore'
import { 
  ChevronDown, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Search, 
  BookOpen,
  Plus
} from 'lucide-react'
import { PagesPanel } from './PagesPanel'
import { LayersPanel } from './LayersPanel'
import { ResizeHandle } from './ResizeHandle'

interface SidebarProps {
  pages: LayerNode[]
}

export const Sidebar: React.FC<SidebarProps> = ({ pages }) => {
  const { sidebarWidth, activePageId } = useSidebarStore()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState<'file' | 'assets'>('file')

  const currentPage = pages.find((p) => p.id === activePageId)
  const currentLayers = currentPage?.children || []

  if (isCollapsed) {
    return (
      <div className="w-12 bg-[#1e1e1e] border-r border-[#2c2c2c] flex flex-col items-center py-3 flex-shrink-0 h-full">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-1.5 rounded-md hover:bg-[#2c2c2c] text-[#b3b3b3] hover:text-white transition-colors"
          title="Show sidebar"
        >
          <PanelLeftOpen size={18} />
        </button>
      </div>
    )
  }

  return (
    <div
      ref={sidebarRef}
      className="flex flex-col h-full relative flex-shrink-0 bg-[#1e1e1e] border-r border-[#2c2c2c] overflow-hidden min-w-[240px]"
      style={{ width: `${sidebarWidth}px` }}
    >
      {/* 1. Project Header (Team & Project Name) */}
      <div className="flex flex-col px-4 pt-3 pb-2 gap-1 group">
        <div className="flex items-center justify-between">
            <button className="flex items-center gap-1.5 text-white font-semibold text-[13px] hover:bg-[#2c2c2c] -ml-2 px-2 py-1 rounded-md transition-colors truncate">
                Osama Bin Habib's team lib...
                <ChevronDown size={14} className="text-[#b3b3b3]" />
            </button>
            <button 
                onClick={() => setIsCollapsed(true)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-[#b3b3b3] hover:text-white hover:bg-[#2c2c2c] transition-all"
            >
                <PanelLeftClose size={14} />
            </button>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="text-[#b3b3b3]">Team project</span>
          <span className="bg-[#3b4b5e] text-[#97b4f5] px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
            Free
          </span>
        </div>
      </div>

      {/* 2. Tab Switcher (File / Assets) */}
      <div className="flex items-center justify-between px-2 mt-2 border-b border-[#2c2c2c] pb-2">
        <div className="flex p-1 bg-[#1e1e1e] rounded-md gap-1">
          <button
            onClick={() => setActiveTab('file')}
            className={`px-3 py-1 text-[11px] font-medium rounded transition-colors ${
              activeTab === 'file' ? 'bg-[#2c2c2c] text-white' : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            File
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`px-3 py-1 text-[11px] font-medium rounded transition-colors ${
              activeTab === 'assets' ? 'bg-[#2c2c2c] text-white' : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            Assets
          </button>
        </div>
        <div className="flex items-center gap-1 text-[#b3b3b3]">
          <button className="p-1.5 hover:bg-[#2c2c2c] rounded-md hover:text-white transition-colors">
            <Search size={16} />
          </button>
          <button className="p-1.5 hover:bg-[#2c2c2c] rounded-md hover:text-white transition-colors relative">
            <BookOpen size={16} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#0c8ce9] rounded-full border border-[#1e1e1e]" />
          </button>
        </div>
      </div>

      {/* 3. Pages Section Header */}
      <div className="flex items-center justify-between px-4 py-3 group">
        <span className="text-white text-[11px] font-bold">Pages</span>
        <button className="text-[#b3b3b3] hover:text-white p-0.5 rounded transition-colors">
          <Plus size={16} />
        </button>
      </div>

      {/* 4. Panels Section (Scrollable) */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <PagesPanel pages={pages} />
        
        {/* Figma Free Tier Banner */}
        <div className="mx-2 my-2 p-3 bg-[#182635] border border-[#233549] rounded-lg">
            <div className="w-full h-1 bg-[#2c2c2c] rounded-full overflow-hidden mb-3">
                <div className="w-1/3 h-full bg-[#0c8ce9]" />
            </div>
            <p className="text-[11px] text-white font-medium mb-1">2 free pages left.</p>
            <button className="text-[11px] text-[#0c8ce9] hover:underline">
                See plans that offer more
            </button>
        </div>

        <div className="border-t border-[#2c2c2c] mt-2">
            <LayersPanel layers={currentLayers} onRename={() => {}} />
        </div>
      </div>

      <ResizeHandle />
    </div>
  )
}