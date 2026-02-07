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
  Layout,
  SlidersHorizontal,
  X
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
  
  // State to manage visibility of library sections
  const [visibleLibraries, setVisibleLibraries] = useState({
    ios: true,
    material: true,
    simple: true
  })

  const currentPage = pages.find((p) => p.id === activePageId)
  const currentLayers = currentPage?.children || []

  const toggleLibrary = (lib: keyof typeof visibleLibraries) => {
    setVisibleLibraries(prev => ({ ...prev, [lib]: !prev[lib] }))
  }

  if (isCollapsed) {
    return (
      <div className="w-12 bg-[#1e1e1e] border-r border-[#2c2c2c] flex flex-col items-center py-3 flex-shrink-0 h-full cursor-default">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-1.5 rounded-md hover:bg-[#2c2c2c] text-[#b3b3b3] hover:text-white transition-colors cursor-default"
        >
          <PanelLeftOpen size={18} />
        </button>
      </div>
    )
  }

  return (
    <div
      ref={sidebarRef}
      className="flex flex-col h-full relative flex-shrink-0 bg-[#1e1e1e] border-r border-[#2c2c2c] overflow-hidden select-none cursor-default"
      style={{ width: `${sidebarWidth}px` }}
    >
      {/* 1. Global Header */}
      <div className="flex items-center justify-between px-3 py-2 text-[#b3b3b3]">
        <div className="flex items-center gap-1 hover:bg-[#2c2c2c] p-1 rounded cursor-default">
          <svg width="12" height="18" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE"/>
            <path d="M0 47.5C0 42.2533 4.25332 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25332 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
            <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25332 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
            <path d="M0 9.5C0 14.7467 4.25332 19 9.5 19H19V0H9.5C4.25332 0 0 4.25332 0 9.5Z" fill="#F24E1E"/>
            <path d="M0 28.5C0 33.7467 4.25332 38 9.5 38H19V19H9.5C4.25332 19 0 14.7467 0 28.5Z" fill="#A259FF"/>
          </svg>
          <ChevronDown size={10} />
        </div>
        <button className="p-1 hover:bg-[#2c2c2c] rounded cursor-default">
          <Layout size={16} />
        </button>
      </div>

      {/* 2. Project Header */}
      <div className="flex flex-col px-3 py-1 group">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1.5 text-white font-bold text-[12px] hover:bg-[#2c2c2c] px-1 py-1 rounded transition-colors truncate cursor-default">
            Osama Bin Habib's team lib...
            <ChevronDown size={12} className="text-[#b3b3b3]" />
          </button>
          <button 
            onClick={() => setIsCollapsed(true)}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-[#b3b3b3] hover:text-white hover:bg-[#2c2c2c] transition-all cursor-default"
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

      {/* 3. Tab Switcher */}
      <div className="flex items-center justify-between px-3 mt-4 border-b border-[#2c2c2c]">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('file')}
            className={`text-[11px] font-bold transition-colors cursor-default pb-2 relative ${
              activeTab === 'file' ? 'text-white' : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            File
            {activeTab === 'file' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />}
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`text-[11px] font-bold transition-colors cursor-default pb-2 relative ${
              activeTab === 'assets' ? 'text-white' : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            Assets
            {activeTab === 'assets' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />}
          </button>
        </div>
        <div className="flex items-center gap-1 text-[#b3b3b3] pb-2">
          <button className="p-1 hover:bg-[#2c2c2c] rounded-md hover:text-white cursor-default">
            <Search size={16} />
          </button>
          <button className="p-1 hover:bg-[#2c2c2c] rounded-md hover:text-white relative cursor-default">
            <BookOpen size={16} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#0c8ce9] rounded-full border border-[#1e1e1e]" />
          </button>
        </div>
      </div>

      {/* 4. Scrollable Panels */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'file' ? (
          <div className="mt-2">
            <div className="flex items-center justify-between px-3 py-2 group cursor-default hover:bg-[#2c2c2c]">
              <div className="flex items-center gap-2">
                <ChevronDown size={12} className="text-[#b3b3b3]" />
                <span className="text-white text-[11px] font-bold">Pages</span>
              </div>
              <button className="p-0.5 hover:bg-[#383838] rounded cursor-default">
                <Plus size={14} className="text-[#b3b3b3] hover:text-white" />
              </button>
            </div>
            <PagesPanel pages={pages} />
            <div className="mx-2 my-2 p-3 bg-[#1e2a3a] border border-[#2c3e50] rounded-md">
              <div className="w-full h-1 bg-[#2c2c2c] rounded-full overflow-hidden mb-2">
                <div className="w-1/3 h-full bg-[#0c8ce9]" />
              </div>
              <p className="text-[11px] text-white font-medium mb-0.5">2 free pages left.</p>
              <button className="text-[11px] text-[#0c8ce9] hover:underline cursor-default">
                See plans that offer more
              </button>
            </div>
            <div className="border-t border-[#2c2c2c] mt-4 pt-2">
              <div className="flex items-center gap-2 px-3 py-2 hover:bg-[#2c2c2c] cursor-default">
                <ChevronDown size={12} className="text-[#b3b3b3]" />
                <span className="text-white text-[11px] font-bold">Layers</span>
              </div>
              <LayersPanel layers={currentLayers} onRename={() => {}} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-3">
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#b3b3b3]" />
                <input 
                  type="text" 
                  placeholder="Search all libraries"
                  className="w-full bg-[#2c2c2c] text-[11px] text-white rounded-md py-1.5 pl-8 pr-2 outline-none border border-transparent focus:border-[#0c8ce9]"
                />
              </div>
              <button className="p-1.5 text-[#b3b3b3] hover:text-white hover:bg-[#2c2c2c] rounded transition-colors">
                <SlidersHorizontal size={16} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-[#b3b3b3]">All libraries</span>
                
                {/* iOS Library Card */}
                {visibleLibraries.ios && (
                  <div className="group cursor-default relative">
                    <button 
                      onClick={() => toggleLibrary('ios')}
                      className="absolute top-2 right-2 z-10 p-1 bg-black/20 hover:bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} className="text-white" />
                    </button>
                    <div className="w-full aspect-[16/9] bg-gradient-to-br from-[#1c3a5e] to-[#2c7bb6] rounded-lg mb-2 overflow-hidden border border-[#2c2c2c] group-hover:border-[#3d3d3d] transition-colors relative">
                      <div className="absolute inset-0 p-4 flex flex-col justify-between">
                         <h4 className="text-white text-[18px] font-bold leading-tight">iOS and iPadOS 26 UI Kit</h4>
                         <div className="flex items-center gap-1 opacity-60">
                           <div className="w-3 h-3 bg-white rounded-full scale-75" />
                           <span className="text-[8px] text-white uppercase font-bold tracking-tighter">Apple Design Resources</span>
                         </div>
                      </div>
                    </div>
                    <p className="text-[11px] font-bold text-white flex items-center gap-1">
                      iOS and iPadOS 26 <BookOpen size={10} className="text-[#0c8ce9]" />
                    </p>
                    <p className="text-[10px] text-[#b3b3b3]">174 components</p>
                  </div>
                )}

                {/* Material 3 Card */}
                {visibleLibraries.material && (
                  <div className="group cursor-default relative">
                    <button 
                      onClick={() => toggleLibrary('material')}
                      className="absolute top-2 right-2 z-10 p-1 bg-black/10 hover:bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} className="text-black/50" />
                    </button>
                    <div className="w-full aspect-[16/9] bg-[#e6b6fd] rounded-lg mb-2 border border-[#2c2c2c] flex items-center justify-center p-4">
                        <h4 className="text-[#4a1d5a] text-[16px] font-bold">Material 3 Design Kit</h4>
                    </div>
                    <p className="text-[11px] font-bold text-white flex items-center gap-1">
                      Material 3 Design Kit <BookOpen size={10} className="text-[#0c8ce9]" />
                    </p>
                    <p className="text-[10px] text-[#b3b3b3]">355 components</p>
                  </div>
                )}

                {/* Simple Design System Card */}
                {visibleLibraries.simple && (
                  <div className="group cursor-default relative">
                    <button 
                      onClick={() => toggleLibrary('simple')}
                      className="absolute top-2 right-2 z-10 p-1 bg-white/10 hover:bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} className="text-white/50" />
                    </button>
                    <div className="w-full aspect-[16/9] bg-black rounded-lg mb-2 border border-[#2c2c2c] flex items-center justify-center">
                       <div className="flex flex-col items-center gap-2">
                          <div className="border border-white/20 p-1.5 rounded-full px-4 text-white text-[12px]">Simple</div>
                          <div className="flex gap-1">
                             <span className="bg-[#4a56ff] px-2 py-0.5 rounded text-[10px] text-white">Design</span>
                             <span className="bg-white px-2 py-0.5 rounded text-[10px] text-black">System</span>
                          </div>
                       </div>
                    </div>
                    <p className="text-[11px] font-bold text-white flex items-center gap-1">
                      Simple Design System <BookOpen size={10} className="text-[#0c8ce9]" />
                    </p>
                    <p className="text-[10px] text-[#b3b3b3]">1840 components</p>
                  </div>
                )}
              </div>

              <button className="w-full py-2 bg-[#1e1e1e] border border-[#3d3d3d] hover:bg-[#2c2c2c] text-white text-[11px] font-medium rounded-md transition-colors">
                Add more libraries
              </button>
            </div>
          </div>
        )}
      </div>
      <ResizeHandle />
    </div>
  )
}