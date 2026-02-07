import React, { useState, useRef, useEffect } from 'react'
import { useLayersStore } from '@state/layersStore'
import { LayerTree } from './LayerTree'
import { layersPanelStyles as styles } from './styles'
import ContextMenu, { MenuItem } from './ContextMenu'
import type { LayerNode } from '@/types/layer'

interface Tab {
  id: string
  name: string
}

const TABS: Tab[] = [
  { id: 'design', name: 'File' },
  { id: 'assets', name: 'Assets' },
]

export const LayersPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('design')
  const [searchQuery, setSearchQuery] = useState('')
  const [isResizing, setIsResizing] = useState(false)
  const [panelWidth, setPanelWidth] = useState(280)
  const panelRef = useRef<HTMLDivElement>(null)
  const resizeHandleRef = useRef<HTMLDivElement>(null)

  const {
    pages,
    currentPageId,
    setCurrentPage,
    deselectAll,
    isPanelCollapsed,
    setPanelCollapsed,
    collapseAll,
    expandAll,
    selectNode,
    toggleNodeVisibility,
    toggleNodeLockState,
    deleteNode,
    duplicateNode,
  } = useLayersStore()

  const currentPage = pages.find((p) => p.id === currentPageId)

  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
    items: MenuItem[]
    targetId?: string
  } | null>(null)

  const closeContextMenu = () => setContextMenu(null)

  useEffect(() => {
    if (!contextMenu) return
    const handleDown = () => closeContextMenu()
    document.addEventListener('mousedown', handleDown)
    return () => document.removeEventListener('mousedown', handleDown)
  }, [contextMenu])

  // Handle panel resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !panelRef.current) return

      const newWidth = e.clientX
      if (newWidth >= 200 && newWidth <= 600) {
        setPanelWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizing])

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        deselectAll()
      }
      // Shift + \ to toggle panel collapse
      if (e.shiftKey && e.key === '\\') {
        e.preventDefault()
        setPanelCollapsed(!isPanelCollapsed)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isPanelCollapsed, deselectAll, setPanelCollapsed])

  return (
    <div
      ref={panelRef}
      className={`${styles.panel} relative`}
      style={{
        width: `${panelWidth}px`,
        minWidth: '200px',
        maxWidth: '600px',
      }}
    >
      {/* Header with title and actions */}
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Layers</h2>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className={styles.headerAction}
            title="Expand all"
          >
            ⊕
          </button>
          <button
            onClick={collapseAll}
            className={styles.headerAction}
            title="Collapse all"
          >
            ⊖
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Design tab content */}
      {activeTab === 'design' && (
        <>
          {/* Search */}
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search layers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Pages + Layers */}
          <div className={styles.content}>
            {pages.length === 0 ? (
              <div className={styles.empty}>No pages</div>
            ) : (
              <>
                {/* Pages section */}
                {pages.length > 1 && (
                  <>
                    <div className={styles.pagesHeader}>Pages</div>
                    <div className={styles.pagesContainer}>
                      {pages.map((page) => (
                        <button
                          key={page.id}
                          onClick={() => {
                            setCurrentPage(page.id)
                            deselectAll()
                          }}
                          className={`${styles.pageItem} ${
                            currentPageId === page.id ? 'border-b-2 border-figma-accent' : ''
                          }`}
                        >
                          {page.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Layers tree */}
                {currentPage && currentPage.children.length > 0 ? (
                  <>
                    <LayerTree
                      nodes={currentPage.children}
                      onContextMenu={(e: React.MouseEvent, node: LayerNode) => {
                        e.preventDefault()
                        e.stopPropagation()

                        const items: MenuItem[] = [
                          {
                            id: 'toggle-visibility',
                            label: node.visible ? 'Hide' : 'Show',
                            onClick: () => toggleNodeVisibility(node.id),
                          },
                          {
                            id: 'toggle-lock',
                            label: node.locked ? 'Unlock' : 'Lock',
                            onClick: () => toggleNodeLockState(node.id),
                          },
                          { id: 'divider', label: '', disabled: true },
                          {
                            id: 'rename',
                            label: 'Rename',
                            shortcut: 'Enter',
                            onClick: () => selectNode(node.id),
                          },
                          { id: 'delete', label: 'Delete', shortcut: 'Del', onClick: () => deleteNode(node.id) },
                          { id: 'duplicate', label: 'Duplicate', onClick: () => duplicateNode(node.id) },
                          { id: 'divider', label: '', disabled: true },
                          { id: 'plugins', label: 'Plugins', disabled: true },
                        ]

                        setContextMenu({ x: e.clientX, y: e.clientY, items, targetId: node.id })
                      }}
                    />

                    {contextMenu && (
                      <ContextMenu
                        x={contextMenu.x}
                        y={contextMenu.y}
                        items={contextMenu.items}
                        onClose={closeContextMenu}
                      />
                    )}
                  </>
                ) : (
                  <div className={styles.empty}>No layers</div>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* Assets tab (stub) */}
      {activeTab === 'assets' && (
        <div className={styles.content}>
          <div className={styles.empty}>Assets tab (coming soon)</div>
        </div>
      )}

      {/* Resize handle */}
      <div
        ref={resizeHandleRef}
        onMouseDown={handleResizeStart}
        className={styles.resizeHandle}
      />
    </div>
  )
}
