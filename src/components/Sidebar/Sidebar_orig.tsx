import React, { useRef, useState } from 'react'
import type { LayerNode } from '@/types/layer'
import { useSidebarStore } from '@state/useSidebarStore'
import { SIDEBAR_TOKENS } from '@styles/tokens'
import { PagesPanel } from './PagesPanel'
import { LayersPanel } from './LayersPanel'
import { ResizeHandle } from './ResizeHandle'

interface SidebarProps {
  pages: LayerNode[]
}

export const Sidebar: React.FC<SidebarProps> = ({ pages }) => {
  const { sidebarWidth, activePageId } = useSidebarStore()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const currentPage = pages.find((p) => p.id === activePageId)
  const currentLayers = currentPage?.children || []

  const handleRenameLayer = (id: string, newName: string) => {
    // TODO: Implement layer rename in global state
    console.log(`Renamed layer ${id} to ${newName}`)
  }

  // Collapsed sidebar - just show toggle button
  if (isCollapsed) {
    return (
      <div
        style={{
          width: '48px',
          backgroundColor: '#1a1a1a',
          borderRight: `1px solid #2a2a2a`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '12px 0',
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => setIsCollapsed(false)}
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#2a2a2a',
            border: 'none',
            borderRadius: '4px',
            // cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#e6e6e6',
            fontSize: '18px',
            transition: 'background-color 200ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#3a3a3a'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2a2a2a'
          }}
          title="Show sidebar"
        >
          ▶
        </button>
      </div>
    )
  }

  return (
    <div
      ref={sidebarRef}
      className="flex flex-col h-full relative flex-shrink-0"
      style={{
        width: `${sidebarWidth}px`,
        backgroundColor: '#1a1a1a',
        borderRight: `1px solid #2a2a2a`,
        overflow: 'hidden',
        minWidth: '180px',
      }}
    >
      {/* Header with toggle button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 8px',
          borderBottom: '1px solid #2a2a2a',
          flexShrink: 0,
        }}
      >
        <div style={{ color: '#e6e6e6', fontSize: '12px', fontWeight: 'bold' }}>
          Sidebar
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: 'transparent',
            border: 'none',
            // cursor: 'pointer',
            color: '#e6e6e6',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 200ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2a2a2a'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
          title="Hide sidebar"
        >
          ◀
        </button>
      </div>

      {/* Pages Section */}
      <PagesPanel pages={pages} />

      {/* Layers Section */}
      <LayersPanel layers={currentLayers} onRename={handleRenameLayer} />

      {/* Resize Handle */}
      <ResizeHandle />
    </div>
  )
}
