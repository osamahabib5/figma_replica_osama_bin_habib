import React from 'react'
import type { LayerNode } from '@/types/layer'
import { PageItem } from './PageItem'
import { SIDEBAR_TOKENS } from '@styles/tokens'

interface PagesPanelProps {
  pages: LayerNode[]
}

export const PagesPanel: React.FC<PagesPanelProps> = ({ pages }) => {
  return (
    <div style={{ flexShrink: 0 }}>
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
          marginBottom: SIDEBAR_TOKENS.spacing.sectionGap,
        }}
      >
        Pages
      </div>

      {/* Pages List */}
      <div
        style={{
          padding: `6px ${SIDEBAR_TOKENS.spacing.paddingX}px`,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {pages.map((page) => (
          <PageItem key={page.id} page={page} />
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          backgroundColor: SIDEBAR_TOKENS.colors.divider,
          margin: `${SIDEBAR_TOKENS.spacing.sectionGap}px 0`,
        }}
      />
    </div>
  )
}
