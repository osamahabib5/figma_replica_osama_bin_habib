import React from 'react'
import type { LayerNode } from '@/types/layer'
import { LayerTree } from './LayerTree'
import { SIDEBAR_TOKENS } from '@styles/tokens'

interface LayersPanelProps {
  layers: LayerNode[]
  onRename?: (id: string, newName: string) => void
}

export const LayersPanel: React.FC<LayersPanelProps> = ({ layers, onRename }) => {
  return (
    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div
        style={{
          padding: `${SIDEBAR_TOKENS.spacing.sectionGap}px ${SIDEBAR_TOKENS.spacing.paddingX}px`,
          fontSize: SIDEBAR_TOKENS.typography.sectionTitle.fontSize,
          fontWeight: SIDEBAR_TOKENS.typography.sectionTitle.fontWeight,
          letterSpacing: SIDEBAR_TOKENS.typography.sectionTitle.letterSpacing,
          textTransform: SIDEBAR_TOKENS.typography.sectionTitle.textTransform,
          color: SIDEBAR_TOKENS.typography.sectionTitle.color,
          borderBottom: `1px solid ${SIDEBAR_TOKENS.colors.divider}`,
          flexShrink: 0,
        }}
      >
        Layers
      </div>

      {/* Scrollable Layers Tree */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: `6px ${SIDEBAR_TOKENS.spacing.paddingX}px`,
        }}
      >
        {layers.length > 0 ? (
          <LayerTree layers={layers} onRename={onRename} />
        ) : (
          <div
            style={{
              fontSize: 12,
              color: SIDEBAR_TOKENS.colors.textMuted,
              padding: 12,
              textAlign: 'center',
            }}
          >
            No layers
          </div>
        )}
      </div>
    </div>
  )
}
