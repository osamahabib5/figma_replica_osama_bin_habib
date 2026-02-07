import React from 'react'
import type { LayerNode } from '@/types/layer'
import { useSidebarStore } from '@state/useSidebarStore'
import { SIDEBAR_TOKENS } from '@styles/tokens'

interface PageItemProps {
  page: LayerNode
}

export const PageItem: React.FC<PageItemProps> = ({ page }) => {
  const { activePageId, setActivePage } = useSidebarStore()
  const isActive = activePageId === page.id

  return (
    <button
      onClick={() => setActivePage(page.id)}
      style={{
        position: 'relative',
        width: '100%',
        height: SIDEBAR_TOKENS.spacing.itemHeight,
        backgroundColor: isActive
          ? SIDEBAR_TOKENS.colors.bgSelected
          : 'transparent',
        color: SIDEBAR_TOKENS.colors.textPrimary,
        fontSize: SIDEBAR_TOKENS.typography.itemLabel.fontSize,
        fontWeight: isActive ? 500 : 400,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        border: 'none',
        borderRadius: 4,
        transition: `background-color ${SIDEBAR_TOKENS.animation.transition}ms ${SIDEBAR_TOKENS.animation.easing}`,
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = SIDEBAR_TOKENS.colors.bgHover
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
      title={page.name}
    >
      <span
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {page.name}
      </span>
      {isActive && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: 2,
            width: '100%',
            backgroundColor: SIDEBAR_TOKENS.colors.activePage,
          }}
        />
      )}
    </button>
  )
}
