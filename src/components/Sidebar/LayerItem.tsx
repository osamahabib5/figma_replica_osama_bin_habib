import React, { useState } from 'react'
import type { LayerNode } from '@/types/layer'
import { useSidebarStore } from '@state/useSidebarStore'
import { 
  ChevronRight, 
  Hash, 
  Type, 
  Square, 
  Eye, 
  EyeOff, 
  Lock, 
  MousePointer2 
} from 'lucide-react'

// Helper to match icons to Figma types seen in your screenshot
const getLayerIcon = (type: string) => {
  switch (type) {
    case 'frame': return <Hash size={14} />;
    case 'text': return <Type size={14} />;
    case 'rectangle': return <Square size={14} />;
    case 'component': return <span className="text-purple-500">◇</span>; // Figma component style
    default: return <Hash size={14} />;
  }
};

interface LayerItemProps {
  layer: LayerNode
  depth: number
  onRename?: (id: string, newName: string) => void
}

export const LayerItem: React.FC<LayerItemProps> = ({ layer, depth, onRename }) => {
  const {
    selectedLayerId,
    selectLayer,
    renamingId,
    renameLayer,
    finishRename,
    expandedIds,
    toggleLayerExpanded,
  } = useSidebarStore()

  const [editValue, setEditValue] = useState(layer.name)
  const isSelected = selectedLayerId === layer.id
  const isRenaming = renamingId === layer.id
  const isExpanded = expandedIds.has(layer.id)
  const hasChildren = layer.children && layer.children.length > 0

  const handleNameBlur = () => {
    if (editValue.trim() && editValue !== layer.name) {
      onRename?.(layer.id, editValue)
    }
    finishRename()
  }

  // Figma's indent is usually 8px or 12px per level
  const indentPadding = depth * 12 + 12;

  return (
    <div
      onClick={() => selectLayer(layer.id)}
      onDoubleClick={(e) => { e.stopPropagation(); renameLayer(layer.id); }}
      className={`group flex items-center h-7 px-2 cursor-default transition-colors ${
        isSelected ? 'bg-[#0c8ce9] text-white' : 'hover:bg-[#2c2c2c] text-[#e6e6e6]'
      }`}
      style={{ paddingLeft: `${indentPadding}px` }}
    >
      {/* Chevron/Arrow - Only visible on hover or if expanded in Figma */}
      <div className="w-4 flex items-center justify-center mr-1">
        {hasChildren && (
          <button
            onClick={(e) => { e.stopPropagation(); toggleLayerExpanded(layer.id); }}
            className={`transition-transform duration-100 ${isExpanded ? 'rotate-90' : ''} ${
               isSelected ? 'text-white' : 'text-[#b3b3b3]'
            }`}
          >
            <ChevronRight size={12} strokeWidth={3} />
          </button>
        )}
      </div>

      {/* Layer Type Icon */}
      <div className={`mr-2 flex-shrink-0 ${isSelected ? 'text-white' : 'text-[#b3b3b3]'}`}>
        {getLayerIcon(layer.type)}
      </div>

      {/* Name / Input */}
      {isRenaming ? (
        <input
          autoFocus
          className="flex-1 bg-white text-black text-[11px] px-1 rounded-sm outline-none"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleNameBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleNameBlur()}
        />
      ) : (
        <span className={`flex-1 text-[11px] truncate ${!layer.visible ? 'opacity-40' : ''}`}>
          {layer.name}
        </span>
      )}

      {/* Action Icons: Visibility & Lock (Match screenshot right-side icons) */}
      <div className="flex items-center gap-2 px-1">
        {layer.locked && (
          <Lock size={10} className={isSelected ? 'text-white' : 'text-[#b3b3b3]'} />
        )}
        
        {/* Visibility Toggle - shows on hover or if hidden */}
        <button 
          className={`opacity-0 group-hover:opacity-100 transition-opacity ${!layer.visible ? 'opacity-100' : ''}`}
        >
          {layer.visible ? (
            <Eye size={12} className={isSelected ? 'text-white' : 'text-[#b3b3b3]'} />
          ) : (
            <EyeOff size={12} className="text-[#b3b3b3]" />
          )}
        </button>
      </div>
    </div>
  )
}