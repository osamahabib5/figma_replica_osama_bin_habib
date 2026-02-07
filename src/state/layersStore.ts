import { create } from 'zustand'
import type { LayerNode } from '@/types/layer'
import {
  toggleNodeExpanded,
  updateNodeVisibility,
  updateNodeLockState,
  collapseAll,
  expandAll,
  getLayersBetween,
  deleteNode,
  duplicateNode,
} from '@utils/treeHelpers'

interface LayersStore {
  pages: LayerNode[]
  currentPageId: string
  selectedIds: Set<string>
  focusedId?: string
  expandedIds: Set<string>
  collapsedPanelWidth: number
  isPanelCollapsed: boolean

  // Page operations
  setPages: (pages: LayerNode[]) => void
  setCurrentPage: (pageId: string) => void

  // Selection operations
  selectNode: (id: string) => void
  multiSelect: (id: string) => void
  rangeSelect: (id: string) => void
  deselectAll: () => void
  isSelected: (id: string) => boolean
  getSelectedIds: () => string[]

  // Focus operations
  setFocusedNode: (id?: string) => void
  getFocusedId: () => string | undefined

  // Tree operations
  toggleNodeExpanded: (nodeId: string) => void
  collapseAll: () => void
  expandAll: () => void
  toggleNodeVisibility: (nodeId: string) => void
  toggleNodeLockState: (nodeId: string) => void
  deleteNode: (nodeId: string) => void
  duplicateNode: (nodeId: string) => void

  // Panel operations
  setPanelCollapsed: (collapsed: boolean) => void
  setCollapsedPanelWidth: (width: number) => void
}

export const useLayersStore = create<LayersStore>((set, get) => ({
  pages: [],
  currentPageId: 'page-1',
  selectedIds: new Set(),
  focusedId: undefined,
  expandedIds: new Set(),
  collapsedPanelWidth: 280,
  isPanelCollapsed: false,

  setPages: (pages) => set({ pages }),
  setCurrentPage: (pageId) => set({ currentPageId: pageId }),

  selectNode: (id) =>
    set({
      selectedIds: new Set([id]),
      focusedId: id,
    }),

  multiSelect: (id) => {
    const current = get().selectedIds
    const newSelection = new Set(current)

    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }

    set({
      selectedIds: newSelection,
      focusedId: id,
    })
  },

  rangeSelect: (id) => {
    const { selectedIds, focusedId, pages, currentPageId } = get()
    const currentPage = pages.find((p) => p.id === currentPageId)

    if (!currentPage || !focusedId) {
      set({ selectedIds: new Set([id]), focusedId: id })
      return
    }

    const ids = getLayersBetween(currentPage.children, focusedId, id)
    set({
      selectedIds: new Set(ids),
      focusedId: id,
    })
  },

  deselectAll: () => set({ selectedIds: new Set(), focusedId: undefined }),

  isSelected: (id) => get().selectedIds.has(id),

  getSelectedIds: () => Array.from(get().selectedIds),

  setFocusedNode: (id) => set({ focusedId: id }),

  getFocusedId: () => get().focusedId,

  toggleNodeExpanded: (nodeId) => {
    const { pages, currentPageId } = get()
    const currentPage = pages.find((p) => p.id === currentPageId)

    if (!currentPage) return

    const updatedChildren = toggleNodeExpanded(currentPage.children, nodeId)
    const updatedPage = { ...currentPage, children: updatedChildren }
    const updatedPages = pages.map((p) => (p.id === currentPageId ? updatedPage : p))

    set({ pages: updatedPages })
  },

  collapseAll: () => {
    const { pages, currentPageId } = get()
    const currentPage = pages.find((p) => p.id === currentPageId)

    if (!currentPage) return

    const updatedChildren = collapseAll(currentPage.children)
    const updatedPage = { ...currentPage, children: updatedChildren }
    const updatedPages = pages.map((p) => (p.id === currentPageId ? updatedPage : p))

    set({ pages: updatedPages })
  },

  expandAll: () => {
    const { pages, currentPageId } = get()
    const currentPage = pages.find((p) => p.id === currentPageId)

    if (!currentPage) return

    const updatedChildren = expandAll(currentPage.children)
    const updatedPage = { ...currentPage, children: updatedChildren }
    const updatedPages = pages.map((p) => (p.id === currentPageId ? updatedPage : p))

    set({ pages: updatedPages })
  },

  toggleNodeVisibility: (nodeId) => {
    const { pages, currentPageId } = get()
    const currentPage = pages.find((p) => p.id === currentPageId)

    if (!currentPage) return

    const node = currentPage.children.find((n) => n.id === nodeId)
    if (!node) return

    const updatedChildren = updateNodeVisibility(
      currentPage.children,
      nodeId,
      !node.visible,
      true
    )
    const updatedPage = { ...currentPage, children: updatedChildren }
    const updatedPages = pages.map((p) => (p.id === currentPageId ? updatedPage : p))

    set({ pages: updatedPages })
  },

  toggleNodeLockState: (nodeId) => {
    const { pages, currentPageId } = get()
    const currentPage = pages.find((p) => p.id === currentPageId)

    if (!currentPage) return

    const node = currentPage.children.find((n) => n.id === nodeId)
    if (!node) return

    const updatedChildren = updateNodeLockState(currentPage.children, nodeId, !node.locked)
    const updatedPage = { ...currentPage, children: updatedChildren }
    const updatedPages = pages.map((p) => (p.id === currentPageId ? updatedPage : p))

    set({ pages: updatedPages })
  },

  deleteNode: (nodeId: string) => {
    const { pages, currentPageId } = get()
    const currentPage = pages.find((p) => p.id === currentPageId)

    if (!currentPage) return

    const updatedChildren = deleteNode(currentPage.children, nodeId)
    const updatedPage = { ...currentPage, children: updatedChildren }
    const updatedPages = pages.map((p) => (p.id === currentPageId ? updatedPage : p))

    set({ pages: updatedPages })
  },

  duplicateNode: (nodeId: string) => {
    const { pages, currentPageId } = get()
    const currentPage = pages.find((p) => p.id === currentPageId)

    if (!currentPage) return

    const updatedChildren = duplicateNode(currentPage.children, nodeId)
    const updatedPage = { ...currentPage, children: updatedChildren }
    const updatedPages = pages.map((p) => (p.id === currentPageId ? updatedPage : p))

    set({ pages: updatedPages })
  },

  setPanelCollapsed: (collapsed) => set({ isPanelCollapsed: collapsed }),
  setCollapsedPanelWidth: (width) => set({ collapsedPanelWidth: width }),
}))
