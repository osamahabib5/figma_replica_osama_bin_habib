import React, { useRef, useEffect } from 'react'
import { useSidebarStore } from '@state/useSidebarStore'
import { SIDEBAR_TOKENS } from '@styles/tokens'

export const ResizeHandle: React.FC = () => {
  const { sidebarWidth, setSidebarWidth } = useSidebarStore()
  const [isResizing, setIsResizing] = React.useState(false)
  const handleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = e.clientX
      setSidebarWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, setSidebarWidth])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  return (
    <div
      ref={handleRef}
      onMouseDown={handleMouseDown}
      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 group"
      style={{
        backgroundColor: 'transparent',
        transition: isResizing ? 'none' : `background-color ${SIDEBAR_TOKENS.animation.transition}ms`,
      }}
      title="Drag to resize sidebar"
      role="slider"
      aria-label="Sidebar resize handle"
      aria-valuemin={SIDEBAR_TOKENS.width.min}
      aria-valuemax={SIDEBAR_TOKENS.width.max}
      aria-valuenow={sidebarWidth}
    />
  )
}
