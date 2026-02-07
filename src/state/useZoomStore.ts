import { create } from 'zustand'

interface ZoomStore {
  zoom: number
  setZoom: (zoom: number) => void
  zoomIn: () => void
  zoomOut: () => void
  resetZoom: () => void
}

export const useZoomStore = create<ZoomStore>((set, get) => ({
  zoom: 1,
  
  setZoom: (zoom: number) => {
    // Clamp zoom between 10% and 400%
    const clamped = Math.max(0.1, Math.min(4, zoom))
    set({ zoom: clamped })
  },

  zoomIn: () => {
    const current = get().zoom
    const next = current * 1.2 // 20% increment
    get().setZoom(next)
  },

  zoomOut: () => {
    const current = get().zoom
    const next = current / 1.2 // 20% decrement
    get().setZoom(next)
  },

  resetZoom: () => {
    set({ zoom: 1 })
  },
}))
