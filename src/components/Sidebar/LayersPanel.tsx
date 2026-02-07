import React from 'react'
import type { LayerNode } from '@/types/layer'
import { LayerTree } from './LayerTree'
import { ChevronDown } from 'lucide-react'

interface LayersPanelProps {
  layers: LayerNode[]
  onRename?: (id: string, newName: string) => void
}

export const LayersPanel: React.FC<LayersPanelProps> = ({ layers, onRename }) => {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Section Header */}
      <div className="flex items-center px-4 py-2 group cursor-default">
        <ChevronDown size={12} className="text-[#b3b3b3] mr-2" />
        <span className="text-white text-[11px] font-bold uppercase tracking-wider opacity-70">
          Layers
        </span>
      </div>

      {/* Tree Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {layers.length > 0 ? (
          <LayerTree layers={layers} onRename={onRename} />
        ) : (
          <div className="text-[11px] text-[#b3b3b3] p-4 text-center">
            No layers in this page
          </div>
        )}
      </div>
    </div>
  )
}