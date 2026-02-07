import { create } from 'zustand'

interface SidebarStore {
  sidebarWidth: number
  setSidebarWidth: (width: number) => void

  selectedLayerId: string | null
  selectLayer: (id: string) => void

  renamingId: string | null
  renameLayer: (id: string) => void
  finishRename: () => void

  expandedIds: Set<string>
  toggleLayerExpanded: (id: string) => void

  activePageId: string
  setActivePage: (id: string) => void
}

export const useSidebarStore = create<SidebarStore>((set, get) => ({
  sidebarWidth: 240,
  setSidebarWidth: (width) => {
    const clamped = Math.max(180, Math.min(360, width))
    set({ sidebarWidth: clamped })
  },

  selectedLayerId: null,
  selectLayer: (id) => set({ selectedLayerId: id }),

  renamingId: null,
  renameLayer: (id) => set({ renamingId: id }),
  finishRename: () => set({ renamingId: null }),

  expandedIds: new Set(['page-1', 'frame-hero', 'group-header']),
  toggleLayerExpanded: (id) => {
    const current = get().expandedIds
    const next = new Set(current)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    set({ expandedIds: next })
  },

  activePageId: 'page-1',
  setActivePage: (id) => set({ activePageId: id }),
}))
