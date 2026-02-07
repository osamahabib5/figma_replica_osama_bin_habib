import React, { useState } from 'react'
import type { LayerNode } from '@/types/layer'
import { useSidebarStore } from '@state/useSidebarStore'
import { SIDEBAR_TOKENS } from '@styles/tokens'
import { ChevronRightIcon, EyeIcon, EyeOffIcon, LockIcon, getIconForLayerType } from '@components/LayersPanel/icons'

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
  const canExpand = layer.children.length > 0

  const handleNameDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    renameLayer(layer.id)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }

  const handleNameBlur = () => {
    if (editValue.trim() && editValue !== layer.name) {
      onRename?.(layer.id, editValue)
    }
    finishRename()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameBlur()
    } else if (e.key === 'Escape') {
      setEditValue(layer.name)
      finishRename()
    }
  }

  const paddingLeft = depth * SIDEBAR_TOKENS.spacing.indentPerLevel + SIDEBAR_TOKENS.spacing.paddingX

  return (
    <div>
      <div
        onClick={() => selectLayer(layer.id)}
        onDoubleClick={handleNameDoubleClick}
        className="group relative flex items-center transition-colors"
        style={{
          height: SIDEBAR_TOKENS.spacing.itemHeight,
          paddingLeft: paddingLeft,
          backgroundColor: isSelected
            ? SIDEBAR_TOKENS.colors.bgSelected
            : 'transparent',
          cursor: 'pointer',
          borderRadius: 4,
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = SIDEBAR_TOKENS.colors.bgHover
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = 'transparent'
          }
        }}
      >
        {/* Chevron */}
        {canExpand && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleLayerExpanded(layer.id)
            }}
            className="p-1 flex-shrink-0 transition-transform"
            style={{
              width: SIDEBAR_TOKENS.spacing.chevronSize,
              height: SIDEBAR_TOKENS.spacing.chevronSize,
              border: 'none',
              background: 'transparent',
              padding: 2,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: `transform ${SIDEBAR_TOKENS.animation.transition}ms ${SIDEBAR_TOKENS.animation.easing}`,
            }}
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            <ChevronRightIcon
              size={14}
              className="text-gray-500"
            />
          </button>
        )}
        {!canExpand && (
          <div style={{ width: SIDEBAR_TOKENS.spacing.chevronSize, flexShrink: 0 }} />
        )}

        {/* Layer Icon */}
        <div
          style={{
            width: SIDEBAR_TOKENS.spacing.iconSize,
            height: SIDEBAR_TOKENS.spacing.iconSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 4,
            color: SIDEBAR_TOKENS.colors.iconDefault,
            flexShrink: 0,
          }}
        >
          {getIconForLayerType(layer.type, 14)}
        </div>

        {/* Layer Name */}
        {isRenaming ? (
          <input
            autoFocus
            type="text"
            value={editValue}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              marginLeft: 6,
              padding: '2px 4px',
              fontSize: SIDEBAR_TOKENS.typography.itemLabel.fontSize,
              fontWeight: SIDEBAR_TOKENS.typography.itemLabel.fontWeight,
              color: SIDEBAR_TOKENS.colors.textPrimary,
              border: `1px solid ${SIDEBAR_TOKENS.colors.activePage}`,
              borderRadius: 2,
              background: 'white',
              fontFamily: 'inherit',
            }}
          />
        ) : (
          <span
            style={{
              flex: 1,
              marginLeft: 6,
              fontSize: SIDEBAR_TOKENS.typography.itemLabel.fontSize,
              fontWeight: isSelected
                ? SIDEBAR_TOKENS.typography.itemLabelSelected.fontWeight
                : SIDEBAR_TOKENS.typography.itemLabel.fontWeight,
              color: layer.visible
                ? SIDEBAR_TOKENS.colors.textPrimary
                : SIDEBAR_TOKENS.colors.textMuted,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={layer.name}
          >
            {layer.name}
          </span>
        )}

        {/* Action Icons (hover) */}
        {!isRenaming && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              marginRight: 4,
              opacity: 0,
              transition: `opacity ${SIDEBAR_TOKENS.animation.transition}ms`,
            }}
            className="group-hover:opacity-100"
          >
            {/* Visibility Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                // TODO: implement visibility toggle
              }}
              style={{
                width: 16,
                height: 16,
                border: 'none',
                background: 'transparent',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: SIDEBAR_TOKENS.colors.iconHover,
              }}
              title={layer.visible ? 'Hide' : 'Show'}
            >
              {layer.visible ? (
                <EyeIcon size={14} />
              ) : (
                <EyeOffIcon size={14} />
              )}
            </button>

            {/* Lock Toggle */}
            {layer.locked && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  // TODO: implement lock toggle
                }}
                style={{
                  width: 16,
                  height: 16,
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: SIDEBAR_TOKENS.colors.iconHover,
                }}
                title="Unlock"
              >
                <LockIcon size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
