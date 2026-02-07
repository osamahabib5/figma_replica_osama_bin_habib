import React, { useRef, useEffect } from 'react'
import type { LayerNode } from '@/types/layer'
import { useLayersStore } from '@state/layersStore'
import { ChevronRightIcon, EyeIcon, EyeOffIcon, LockIcon, getIconForLayerType } from './icons'

interface LayerRowProps {
  node: LayerNode
  depth: number
  onContextMenu?: (e: React.MouseEvent, node: LayerNode) => void
}

export const LayerRow: React.FC<LayerRowProps> = ({ node, depth, onContextMenu }) => {
  const {
    selectNode,
    multiSelect,
    rangeSelect,
    selectedIds,
    isSelected,
    toggleNodeExpanded,
    toggleNodeVisibility,
    toggleNodeLockState,
  } = useLayersStore()

  const rowRef = useRef<HTMLDivElement>(null)
  const isSelectedNode = isSelected(node.id)
  const hasChildren = node.children.length > 0

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (node.locked) {
      e.preventDefault()
      return
    }

    if (e.ctrlKey || e.metaKey) {
      multiSelect(node.id)
    } else if (e.shiftKey) {
      rangeSelect(node.id)
    } else {
      selectNode(node.id)
    }
  }

  const handleVisibilityClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleNodeVisibility(node.id)
  }

  const handleLockClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleNodeLockState(node.id)
  }

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasChildren) {
      toggleNodeExpanded(node.id)
    }
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onContextMenu) {
      onContextMenu(e, node)
    }
  }

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSelectedNode || !rowRef.current) return

      switch (e.key) {
        case 'ArrowRight':
          if (hasChildren && !node.expanded) {
            e.preventDefault()
            toggleNodeExpanded(node.id)
          }
          break
        case 'ArrowLeft':
          if (hasChildren && node.expanded) {
            e.preventDefault()
            toggleNodeExpanded(node.id)
          }
          break
        case 'Enter':
          if (hasChildren) {
            e.preventDefault()
            toggleNodeExpanded(node.id)
          }
          break
      }
    }

    if (isSelectedNode) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSelectedNode, hasChildren, node.expanded, node.id])

  const paddingLeft = depth * 16 // 16px per level indent

  return (
    <div
      ref={rowRef}
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
      className={`
        group relative h-7 flex items-center no-select cursor-default transition-colors
        ${
          isSelectedNode
            ? 'bg-figma-bg-selected'
            : 'hover:bg-figma-bg-hover'
        }
        ${node.locked ? 'opacity-50 cursor-not-allowed' : ''}
        ${!node.visible ? 'opacity-40' : ''}
      `}
      style={{
        paddingLeft: `${paddingLeft}px`,
      }}
    >
      {isSelectedNode && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-figma-accent" />
      )}
      {/* Chevron */}
      <div
        className={`
          w-4 h-4 flex items-center justify-center flex-shrink-0 chevron-rotate transition-transform duration-150 ease-in-out
          ${hasChildren ? 'cursor-pointer' : 'opacity-0'}
          ${node.expanded ? 'rotate-90' : ''}
        `}
        onClick={handleChevronClick}
      >
        {hasChildren && <ChevronRightIcon size={14} className="text-figma-text-secondary" />}
      </div>

      {/* Layer Icon */}
      <div className="w-4 h-4 ml-1 flex items-center justify-center flex-shrink-0 text-figma-text-secondary">
        {getIconForLayerType(node.type, 14)}
      </div>

      {/* Layer Name */}
      <span
        className={`
          flex-1 ml-1.5 text-figma-sm truncate
          ${
            node.visible
              ? 'text-figma-text-primary font-normal'
              : 'text-figma-text-disabled font-normal'
          }
        `}
      >
        {node.name}
      </span>

      {/* Visibility Toggle - appears on hover or always if not visible */}
      <button
        onClick={handleVisibilityClick}
        className={`
          w-4 h-4 flex items-center justify-center flex-shrink-0 mr-1 transition-opacity
          text-figma-text-secondary hover:text-figma-text-primary
          ${node.visible ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}
        `}
        title={node.visible ? 'Hide' : 'Show'}
      >
        {node.visible ? (
          <EyeIcon size={14} />
        ) : (
          <EyeOffIcon size={14} />
        )}
      </button>

      {/* Lock Toggle - appears on hover or always if locked */}
      {node.locked ? (
        <button
          onClick={handleLockClick}
          className="w-4 h-4 flex items-center justify-center flex-shrink-0 text-figma-text-secondary hover:text-figma-text-primary"
          title="Unlock"
        >
          <LockIcon size={14} />
        </button>
      ) : (
        <button
          onClick={handleLockClick}
          className="w-4 h-4 flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 text-figma-text-secondary hover:text-figma-text-primary transition-opacity"
          title="Lock"
        >
          <LockIcon size={14} />
        </button>
      )}
    </div>
  )
}
