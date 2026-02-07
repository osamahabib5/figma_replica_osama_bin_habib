import React, { useRef, useState } from 'react'
import type { LayerNode } from '@/types/layer'
import { useSidebarStore } from '@state/useSidebarStore'
import { 
  ChevronDown, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Search, 
  BookOpen,
  Plus,
  Layout
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
        >
          <PanelLeftOpen size={18} />
        </button>
      </div>
    )
  }

  return (
    <div
      ref={sidebarRef}
      className="flex flex-col h-full relative flex-shrink-0 bg-[#1e1e1e] border-r border-[#2c2c2c] overflow-hidden select-none"
      style={{ width: `${sidebarWidth}px` }}
    >
      {/* 1. Global Header: Figma Logo & Layout Icon */}
      <div className="flex items-center justify-between px-3 py-2 text-[#b3b3b3]">
        <div className="flex items-center gap-1 hover:bg-[#2c2c2c] p-1 rounded cursor-pointer">
          <svg width="12" height="18" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE"/>
            <path d="M0 47.5C0 42.2533 4.25332 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25332 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
            <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25332 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
            <path d="M0 9.5C0 14.7467 4.25332 19 9.5 19H19V0H9.5C4.25332 0 0 4.25332 0 9.5Z" fill="#F24E1E"/>
            <path d="M0 28.5C0 33.7467 4.25332 38 9.5 38H19V19H9.5C4.25332 19 0 14.7467 0 28.5Z" fill="#A259FF"/>
          </svg>
          <ChevronDown size={10} />
        </div>
        <button className="p-1 hover:bg-[#2c2c2c] rounded">
          <Layout size={16} />
        </button>
      </div>

      {/* 2. Project Header */}
      <div className="flex flex-col px-3 py-1 group">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1.5 text-white font-bold text-[12px] hover:bg-[#2c2c2c] px-1 py-1 rounded transition-colors truncate">
            Osama Bin Habib's team lib...
            <ChevronDown size={12} className="text-[#b3b3b3]" />
          </button>
          <button 
            onClick={() => setIsCollapsed(true)}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-[#b3b3b3] hover:text-white hover:bg-[#2c2c2c] transition-all"
          >
            <PanelLeftClose size={14} />
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] mt-0.5 px-1">
          <span className="text-[#b3b3b3]">Team project</span>
          <span className="bg-[#3b4b5e] text-[#97b4f5] px-1.5 py-0.5 rounded-[2px] text-[9px] font-bold uppercase tracking-tight">
            Free
          </span>
        </div>
      </div>

      {/* 3. Tab Switcher (File / Assets) */}
      <div className="flex items-center justify-between px-3 mt-4">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('file')}
            className={`text-[11px] font-bold transition-colors ${
              activeTab === 'file' ? 'text-white' : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            File
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`text-[11px] font-bold transition-colors ${
              activeTab === 'assets' ? 'text-white' : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            Assets
          </button>
        </div>
        <div className="flex items-center gap-1 text-[#b3b3b3]">
          <button className="p-1 hover:bg-[#2c2c2c] rounded-md hover:text-white">
            <Search size={16} />
          </button>
          <button className="p-1 hover:bg-[#2c2c2c] rounded-md hover:text-white relative">
            <BookOpen size={16} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#0c8ce9] rounded-full border border-[#1e1e1e]" />
          </button>
        </div>
      </div>

      {/* 4. Scrollable Panels */}
      <div className="flex-1 overflow-y-auto mt-2 custom-scrollbar">
        {/* Pages Section */}
        <div className="flex items-center justify-between px-3 py-2 group cursor-pointer hover:bg-[#2c2c2c]">
          <div className="flex items-center gap-2">
            <ChevronDown size={12} className="text-[#b3b3b3]" />
            <span className="text-white text-[11px] font-bold">Pages</span>
          </div>
          <button className="p-0.5 hover:bg-[#383838] rounded">
            <Plus size={14} className="text-[#b3b3b3] hover:text-white" />
          </button>
        </div>

        <PagesPanel pages={pages} />
        
        {/* Figma Free Tier Banner */}
        <div className="mx-2 my-2 p-3 bg-[#1e2a3a] border border-[#2c3e50] rounded-md">
          <div className="w-full h-1 bg-[#2c2c2c] rounded-full overflow-hidden mb-2">
            <div className="w-1/3 h-full bg-[#0c8ce9]" />
          </div>
          <p className="text-[11px] text-white font-medium mb-0.5">2 free pages left.</p>
          <button className="text-[11px] text-[#0c8ce9] hover:underline">
            See plans that offer more
          </button>
        </div>

        {/* Layers Section */}
        <div className="border-t border-[#2c2c2c] mt-4 pt-2">
          <div className="flex items-center gap-2 px-3 py-2 hover:bg-[#2c2c2c] cursor-pointer">
            <ChevronDown size={12} className="text-[#b3b3b3]" />
            <span className="text-white text-[11px] font-bold">Layers</span>
          </div>
          <LayersPanel layers={currentLayers} onRename={() => {}} />
        </div>
      </div>

      <ResizeHandle />
    </div>
  )
}

// export default Sidebar;