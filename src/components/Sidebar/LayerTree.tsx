import React from 'react'
import type { LayerNode } from '@/types/layer'
import { useSidebarStore } from '@state/useSidebarStore'
import { LayerItem } from './LayerItem'

interface LayerTreeProps {
  layers: LayerNode[]
  depth?: number
  onRename?: (id: string, newName: string) => void
}

export const LayerTree: React.FC<LayerTreeProps> = ({
  layers,
  depth = 0,
  onRename,
}) => {
  const { expandedIds } = useSidebarStore()

  return (
    <div className="flex flex-col">
      {layers.map((layer) => (
        <React.Fragment key={layer.id}>
          <LayerItem
            layer={layer}
            depth={depth}
            onRename={onRename}
          />
          {/* Recursively render children if the group is expanded */}
          {expandedIds.has(layer.id) && layer.children && layer.children.length > 0 && (
            <LayerTree
              layers={layer.children}
              depth={depth + 1}
              onRename={onRename}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}