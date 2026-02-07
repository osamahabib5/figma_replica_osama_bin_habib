import React, { useState, useRef, useEffect } from 'react'

export type MenuItem = {
  id: string
  label: string
  shortcut?: string
  disabled?: boolean
  onClick?: () => void
  submenu?: MenuItem[]
}

interface ContextMenuProps {
  x: number
  y: number
  items: MenuItem[]
  onClose: () => void
}

const MenuItemRow: React.FC<{ item: MenuItem; onClose: () => void }> = ({ item, onClose }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (item.disabled) return
    item.onClick?.()
    onClose()
  }

  return (
    <div
      className={`flex items-center justify-between px-3 py-2 text-sm cursor-default select-none ${
        item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-figma-bg-hover'
      }`}
      onClick={handleClick}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="text-figma-text-primary">{item.label}</div>
      <div className="flex items-center gap-2">
        {item.shortcut && <div className="text-figma-text-secondary text-xs">{item.shortcut}</div>}
        {item.submenu && <div className="text-figma-text-secondary">›</div>}
      </div>

      {item.submenu && open && (
        <div className="absolute left-full top-0 ml-1 w-48 bg-figma-bg border border-figma-border rounded shadow-lg z-50">
          {item.submenu.map((s) => (
            <div
              key={s.id}
              className={`px-3 py-2 text-sm ${s.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-figma-bg-hover'}`}
              onClick={() => {
                if (s.disabled) return
                s.onClick?.()
                onClose()
              }}
            >
              {s.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState({ left: x, top: y })

  useEffect(() => {
    const el = menuRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    let left = x
    let top = y

    if (rect.right > window.innerWidth) {
      left = Math.max(8, x - rect.width)
    }
    if (rect.bottom > window.innerHeight) {
      top = Math.max(8, y - rect.height)
    }

    setPos({ left, top })
  }, [x, y, items])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      ref={menuRef}
      style={{ left: pos.left, top: pos.top }}
      className="fixed z-50 w-56 bg-figma-bg border border-figma-border rounded shadow-lg overflow-hidden"
      onContextMenu={(e) => e.preventDefault()}
      role="menu"
    >
      {items.map((item) => (
        <React.Fragment key={item.id}>
          {item.id === 'divider' ? (
            <div className="h-px bg-figma-border my-1" />
          ) : (
            <MenuItemRow item={item} onClose={onClose} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ContextMenu
