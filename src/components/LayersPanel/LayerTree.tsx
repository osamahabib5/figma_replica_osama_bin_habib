import React from 'react'
import type { LayerNode } from '@/types/layer'
import { LayerRow } from './LayerRow'

interface LayerTreeProps {
  nodes: LayerNode[]
  depth?: number
  onContextMenu?: (e: React.MouseEvent, node: LayerNode) => void
}

export const LayerTree: React.FC<LayerTreeProps> = ({
  nodes,
  depth = 0,
  onContextMenu,
}) => {
  return (
    <div className="flex flex-col">
      {nodes.map((node) => (
        <React.Fragment key={node.id}>
          <LayerRow
            node={node}
            depth={depth}
            onContextMenu={onContextMenu}
          />
          {node.expanded && node.children.length > 0 && (
            <LayerTree
              nodes={node.children}
              depth={depth + 1}
              onContextMenu={onContextMenu}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
