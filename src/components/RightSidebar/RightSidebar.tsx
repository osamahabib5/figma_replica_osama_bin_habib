import React from 'react'
import { 
  ChevronDown, 
  Plus, 
  Settings2, 
  Eye, 
  Play, 
  MoreHorizontal,
  Minus,
  HelpCircle
} from 'lucide-react'

export const RightSidebar: React.FC = () => {
  return (
    <aside className="w-[240px] min-w-[240px] bg-[#1e1e1e] text-[#e6e6e6] border-l border-[#2c2c2c] flex flex-col h-full overflow-hidden">
      
      {/* 1. Top Header: User, Play, Share */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#2c2c2c]">
        <div className="flex items-center gap-1 group cursor-pointer hover:bg-[#2c2c2c] p-1 rounded">
          <div className="w-5 h-5 rounded-full bg-[#553b31] flex items-center justify-center text-[10px] font-bold text-[#e99a7a]">
            O
          </div>
          <ChevronDown size={12} className="text-[#b3b3b3]" />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-[#2c2c2c] rounded text-[#b3b3b3] hover:text-white transition-colors">
            <div className="flex items-center gap-1">
              <Play size={14} fill="currentColor" />
              <ChevronDown size={10} />
            </div>
          </button>
          <button className="bg-[#0c8ce9] hover:bg-[#0a7bc9] text-white px-3 py-1 rounded-md text-[12px] font-medium transition-colors">
            Share
          </button>
        </div>
      </div>

      {/* 2. Tab Switcher: Design / Prototype */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex p-0.5 bg-[#1e1e1e] rounded-md">
          <button className="px-3 py-1.5 text-[11px] font-bold bg-[#2c2c2c] rounded text-white shadow-sm">
            Design
          </button>
          <button className="px-3 py-1.5 text-[11px] font-medium text-[#b3b3b3] hover:text-white transition-colors">
            Prototype
          </button>
        </div>
        <button className="flex items-center gap-1 text-[11px] text-[#b3b3b3] hover:text-white hover:bg-[#2c2c2c] px-1.5 py-1 rounded transition-colors">
          42% <ChevronDown size={10} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        
        {/* 3. Page Section */}
        <div className="px-4 py-3 border-b border-[#2c2c2c]">
          <h3 className="text-[11px] font-bold text-white mb-3">Page</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-[#2c2c2c] px-2 py-1.5 rounded w-[160px] border border-transparent focus-within:border-[#0c8ce9] transition-all">
              <div className="w-3 h-3 bg-white rounded-sm shrink-0" />
              <input 
                defaultValue="E5E5E5"
                className="bg-transparent text-[11px] text-white outline-none w-full uppercase"
              />
              <div className="ml-auto flex items-center gap-0.5 border-l border-[#3d3d3d] pl-2 text-[#b3b3b3]">
                <span className="text-[11px]">100</span>
                <span className="text-[10px]">%</span>
              </div>
            </div>
            <button className="p-1.5 hover:bg-[#2c2c2c] rounded transition-colors text-[#b3b3b3] hover:text-white">
              <Eye size={14} />
            </button>
          </div>
          <label className="flex items-center gap-2 mt-3 cursor-pointer group">
            <div className="w-3 h-3 rounded-sm flex items-center justify-center bg-[#0c8ce9]">
                <span className="text-[8px] text-white">✓</span>
            </div>
            <span className="text-[11px] text-[#b3b3b3] group-hover:text-white transition-colors">Show in exports</span>
          </label>
        </div>

        {/* 4. Variables Section */}
        <div className="px-4 py-3 flex items-center justify-between hover:bg-[#2c2c2c] cursor-pointer transition-colors">
          <span className="text-[11px] font-bold text-white">Variables</span>
          <Settings2 size={14} className="text-[#b3b3b3]" />
        </div>

        {/* 5. Styles Section */}
        <div className="px-4 py-3 border-b border-[#2c2c2c]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">Styles</span>
            <button className="p-1 hover:bg-[#2c2c2c] rounded text-[#b3b3b3] hover:text-white transition-colors">
              <Plus size={14} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-[#b3b3b3] mb-2">Text styles</p>
              <div className="space-y-1">
                <StyleItem label="Header 1" value="12/Auto" />
                <StyleItem label="Header 2" value="20/Auto" />
                <StyleItem label="Body" value="13/Auto" />
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[10px] text-[#b3b3b3] mb-2">Color styles</p>
              <div className="space-y-1">
                <ColorStyleItem label="Fuschia" />
                <ColorStyleItem label="Iris" />
              </div>
            </div>
          </div>
        </div>

        {/* 6. Export Section */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">Export</span>
            <button className="p-1 hover:bg-[#2c2c2c] rounded text-[#b3b3b3] hover:text-white transition-colors">
              <Plus size={14} />
            </button>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 flex items-center bg-[#2c2c2c] rounded overflow-hidden h-7 border border-transparent hover:border-[#3d3d3d] transition-colors">
                <div className="px-2 py-1 text-[11px] font-bold border-r border-[#1e1e1e]">1x</div>
                <div className="flex-1 flex items-center justify-between px-2 py-1 group cursor-pointer">
                    <span className="text-[11px]">PNG</span>
                    <ChevronDown size={10} className="text-[#b3b3b3]" />
                </div>
            </div>
            <button className="p-1.5 hover:bg-[#2c2c2c] rounded text-[#b3b3b3] transition-colors">
              <MoreHorizontal size={14} />
            </button>
            <button className="p-1.5 hover:bg-[#2c2c2c] rounded text-[#b3b3b3] transition-colors">
              <Minus size={14} />
            </button>
          </div>

          <button className="w-full h-8 bg-[#2c2c2c] hover:bg-[#383838] rounded text-[11px] font-medium transition-colors border border-[#3d3d3d] px-2 truncate">
            Export Osama Bin Habib's team lib...
          </button>
          
          <div className="flex items-center gap-2 mt-4 text-[#b3b3b3] hover:text-white cursor-pointer group transition-colors px-1 py-1 rounded hover:bg-[#2c2c2c]">
             <ChevronDown size={10} className="-rotate-90 group-hover:rotate-0 transition-transform" />
             <span className="text-[11px] font-medium">Preview</span>
          </div>
        </div>
      </div>

      {/* Bottom Help Icon */}
      <div className="p-3 mt-auto flex justify-end">
        <button className="w-7 h-7 bg-[#2c2c2c] rounded-full flex items-center justify-center text-[#b3b3b3] hover:text-white shadow-lg border border-[#3d3d3d] transition-all hover:scale-105">
          <HelpCircle size={14} />
        </button>
      </div>
    </aside>
  )
}

const StyleItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex items-center gap-2 hover:bg-[#2c2c2c] px-1 py-1 rounded cursor-pointer group transition-colors">
    <div className="text-[11px] font-bold text-[#b3b3b3] w-4">Ag</div>
    <div className="flex-1 text-[11px] truncate">
      <span className="font-bold text-white">{label}</span>
      <span className="text-[#b3b3b3]"> · {value}</span>
    </div>
  </div>
)

const ColorStyleItem = ({ label }: { label: string }) => (
    <div className="flex items-center gap-2 group cursor-pointer px-1 py-1 rounded hover:bg-[#2c2c2c] transition-colors">
      <ChevronDown size={10} className="text-[#b3b3b3] -rotate-90 group-hover:text-white transition-colors" />
      <span className="text-[11px] text-[#0c8ce9] hover:underline truncate font-medium">{label}</span>
    </div>
)

export default RightSidebar