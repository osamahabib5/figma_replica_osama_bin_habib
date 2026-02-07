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