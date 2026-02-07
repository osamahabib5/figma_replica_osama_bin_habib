import { useEffect } from 'react'
import { Sidebar } from '@components/Sidebar/Sidebar'
import { RightSidebar } from '@components/RightSidebar/RightSidebar'
import { Toolbar } from '@components/Toolbar/Toolbar'
import { useLayersStore } from '@state/layersStore'
import { useZoomStore } from '@state/useZoomStore'
import type { LayerNode } from '@/types/layer'

/**
 * Demo data with realistic Figma-like structure
 */
const DEMO_PAGES: LayerNode[] = [
  {
    id: 'page-1',
    name: 'File',
    type: 'frame',
    visible: true,
    locked: false,
    expanded: true,
    parent: undefined,
    children: [
      {
        id: 'frame-hero',
        name: 'Hero Section',
        type: 'frame',
        visible: true,
        locked: false,
        expanded: true,
        parent: 'page-1',
        children: [
          {
            id: 'group-header',
            name: 'Header',
            type: 'group',
            visible: true,
            locked: false,
            expanded: true,
            parent: 'frame-hero',
            children: [
              {
                id: 'text-title',
                name: 'Title',
                type: 'text',
                visible: true,
                locked: false,
                expanded: false,
                parent: 'group-header',
                children: [],
              },
              {
                id: 'text-subtitle',
                name: 'Subtitle',
                type: 'text',
                visible: true,
                locked: false,
                expanded: false,
                parent: 'group-header',
                children: [],
              },
            ],
          },
          {
            id: 'component-button',
            name: 'CTA Button',
            type: 'component',
            visible: true,
            locked: false,
            expanded: false,
            parent: 'frame-hero',
            children: [],
          },
          {
            id: 'image-banner',
            name: 'Banner Image',
            type: 'image',
            visible: true,
            locked: true,
            expanded: false,
            parent: 'frame-hero',
            children: [],
          },
        ],
      },
      {
        id: 'frame-features',
        name: 'Features Section',
        type: 'frame',
        visible: true,
        locked: false,
        expanded: true,
        parent: 'page-1',
        children: [
          {
            id: 'group-feature-1',
            name: 'Feature Card 1',
            type: 'group',
            visible: true,
            locked: false,
            expanded: false,
            parent: 'frame-features',
            children: [
              {
                id: 'rect-bg',
                name: 'Background',
                type: 'rectangle',
                visible: true,
                locked: false,
                expanded: false,
                parent: 'group-feature-1',
                children: [],
              },
              {
                id: 'icon-feature',
                name: 'Icon',
                type: 'shape',
                visible: false,
                locked: false,
                expanded: false,
                parent: 'group-feature-1',
                children: [],
              },
            ],
          },
          {
            id: 'group-feature-2',
            name: 'Feature Card 2',
            type: 'group',
            visible: true,
            locked: false,
            expanded: false,
            parent: 'frame-features',
            children: [
              {
                id: 'rect-bg-2',
                name: 'Background',
                type: 'rectangle',
                visible: true,
                locked: false,
                expanded: false,
                parent: 'group-feature-2',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 'frame-footer',
        name: 'Footer',
        type: 'frame',
        visible: true,
        locked: false,
        expanded: true,
        parent: 'page-1',
        children: [
          {
            id: 'text-copyright',
            name: 'Copyright',
            type: 'text',
            visible: true,
            locked: true,
            expanded: false,
            parent: 'frame-footer',
            children: [],
          },
          {
            id: 'group-links',
            name: 'Links',
            type: 'group',
            visible: true,
            locked: false,
            expanded: false,
            parent: 'frame-footer',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 'page-2',
    name: 'Assets',
    type: 'frame',
    visible: true,
    locked: false,
    expanded: true,
    parent: undefined,
    children: [
      {
        id: 'component-btn-primary',
        name: 'Button / Primary',
        type: 'component',
        visible: true,
        locked: false,
        expanded: false,
        parent: 'page-2',
        children: [],
      },
      {
        id: 'component-btn-secondary',
        name: 'Button / Secondary',
        type: 'component',
        visible: true,
        locked: false,
        expanded: false,
        parent: 'page-2',
        children: [],
      },
      {
        id: 'component-input',
        name: 'Input Field',
        type: 'component',
        visible: true,
        locked: false,
        expanded: false,
        parent: 'page-2',
        children: [],
      },
    ],
  },
]

export default function App() {
  const { setPages, setCurrentPage } = useLayersStore()
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoomStore()

  // Initialize with demo data
  useEffect(() => {
    setPages(DEMO_PAGES)
    setCurrentPage('page-1')
  }, [])

  // Handle keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform)
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey

      if (ctrlKey && e.key === '+') {
        e.preventDefault()
        zoomIn()
      } else if (ctrlKey && (e.key === '-' || e.key === '_')) {
        e.preventDefault()
        zoomOut()
      } else if (ctrlKey && e.key === '0') {
        e.preventDefault()
        resetZoom()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [zoomIn, zoomOut, resetZoom])

  // Handle mouse wheel zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform)
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey

      if (ctrlKey) {
        e.preventDefault()
        if (e.deltaY < 0) {
          zoomIn()
        } else {
          zoomOut()
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [zoomIn, zoomOut])

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main content area */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar with Pages + Layers */}
        <Sidebar pages={DEMO_PAGES} />

        {/* Canvas area (mock) */}
        <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#e5e5e5' }}>
          {/* Zoomable content container */}
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: 'transform 150ms ease-in-out',
            }}
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Figma Layers Panel Replica</h1>
              <p className="text-gray-600 mb-6">Select layers in the panel to see interactions</p>
              <div className="space-y-2 text-left inline-block p-4 rounded" style={{ backgroundColor: '#f5f5f5' }}>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Click</span> - Select layer
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Ctrl/Cmd + Click</span> - Multi-select
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Shift + Click</span> - Range select
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Eye icon</span> - Toggle visibility
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Lock icon</span> - Toggle lock
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Chevron</span> - Expand/collapse
                </p>
              </div>
            </div>
          </div>

          {/* Toolbar at center-bottom (fixed positioned) */}
          <Toolbar />

          {/* Zoom controls at top-right */}
          <div
            style={{
              position: 'fixed',
              top: 16,
              right: 260, // Account for right sidebar (240px + 20px gap)
              zIndex: 30,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '8px 12px',
              borderRadius: 6,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <button
              onClick={zoomOut}
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f0f0f0',
                border: '1px solid #d0d0d0',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 16,
                transition: 'background-color 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              title="Zoom out (Ctrl+Minus)"
            >
              −
            </button>
            <div style={{ width: 50, textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#333333' }}>
              {Math.round(zoom * 100)}%
            </div>
            <button
              onClick={zoomIn}
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f0f0f0',
                border: '1px solid #d0d0d0',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 16,
                transition: 'background-color 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              title="Zoom in (Ctrl+Plus)"
            >
              +
            </button>
            <div style={{ width: 1, height: 24, backgroundColor: '#d0d0d0' }} />
            <button
              onClick={resetZoom}
              style={{
                padding: '4px 8px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #d0d0d0',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                color: '#333333',
                transition: 'background-color 150ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
              title="Reset zoom (Ctrl+0)"
            >
              Reset
            </button>
          </div>

          {/* Help icon at bottom-right */}
          <button
            className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg hover:opacity-80 transition-opacity"
            style={{ backgroundColor: '#333333' }}
            title="Help"
            aria-label="Help"
          >
            ?
          </button>
        </div>

        {/* Right inspector sidebar */}
        <RightSidebar />
      </div>
    </div>
  )
}
