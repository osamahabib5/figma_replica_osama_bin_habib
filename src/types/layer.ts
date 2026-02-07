export type LayerType = 'frame' | 'group' | 'text' | 'rectangle' | 'shape' | 'image' | 'component'

export interface LayerNode {
  id: string
  name: string
  type: LayerType
  visible: boolean
  locked: boolean
  expanded: boolean
  children: LayerNode[]
  parent?: string
}

export interface SelectionState {
  selectedIds: Set<string>
  lastSelectedId?: string
  focusedId?: string
}

export type SortableItemType = 'page' | 'layer'
