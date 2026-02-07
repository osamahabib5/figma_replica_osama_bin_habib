import type { LayerNode } from '@/types/layer'

/**
 * Find a node by ID in the tree
 */
export function findNodeById(
  nodes: LayerNode[],
  id: string
): LayerNode | undefined {
  for (const node of nodes) {
    if (node.id === id) {
      return node
    }
    if (node.children.length > 0) {
      const found = findNodeById(node.children, id)
      if (found) {
        return found
      }
    }
  }
  return undefined
}

/**
 * Find the parent node of a given node ID
 */
export function findParentNode(
  nodes: LayerNode[],
  targetId: string,
  parent?: LayerNode
): LayerNode | undefined {
  for (const node of nodes) {
    if (node.id === targetId) {
      return parent
    }
    if (node.children.length > 0) {
      const found = findParentNode(node.children, targetId, node)
      if (found) {
        return found
      }
    }
  }
  return undefined
}

/**
 * Get all descendants of a node (flattened)
 */
export function getDescendants(node: LayerNode): LayerNode[] {
  const descendants: LayerNode[] = []
  function traverse(n: LayerNode) {
    if (n.children.length > 0) {
      descendants.push(...n.children)
      for (const child of n.children) {
        traverse(child)
      }
    }
  }
  traverse(node)
  return descendants
}

/**
 * Get all ancestors of a node (from root to immediate parent)
 */
export function getAncestors(
  nodes: LayerNode[],
  targetId: string
): LayerNode[] {
  const ancestors: LayerNode[] = []

  function findPath(nodes: LayerNode[], id: string): boolean {
    for (const node of nodes) {
      if (node.id === id) {
        return true
      }
      if (node.children.length > 0 && findPath(node.children, id)) {
        ancestors.push(node)
        return true
      }
    }
    return false
  }

  findPath(nodes, targetId)
  return ancestors.reverse()
}

/**
 * Get the depth of a node in the tree
 */
export function getNodeDepth(
  nodes: LayerNode[],
  targetId: string,
  currentDepth = 0
): number {
  for (const node of nodes) {
    if (node.id === targetId) {
      return currentDepth
    }
    if (node.children.length > 0) {
      const depth = getNodeDepth(node.children, targetId, currentDepth + 1)
      if (depth >= 0) {
        return depth
      }
    }
  }
  return -1
}

/**
 * Get all visible layers (considering parent visibility)
 */
export function getVisibleLayers(
  nodes: LayerNode[],
  parentVisible = true
): LayerNode[] {
  const visible: LayerNode[] = []

  function traverse(nodes: LayerNode[], isParentVisible: boolean) {
    for (const node of nodes) {
      const isVisible = isParentVisible && node.visible
      if (isVisible) {
        visible.push(node)
      }
      if (node.children.length > 0) {
        traverse(node.children, isVisible)
      }
    }
  }

  traverse(nodes, parentVisible)
  return visible
}

/**
 * Get all selectable layers (not locked, visible parents)
 */
export function getSelectableLayers(
  nodes: LayerNode[],
  parentLocked = false,
  parentVisible = true
): LayerNode[] {
  const selectable: LayerNode[] = []

  function traverse(
    nodes: LayerNode[],
    isParentLocked: boolean,
    isParentVisible: boolean
  ) {
    for (const node of nodes) {
      const isLocked = isParentLocked || node.locked
      const isVisible = isParentVisible && node.visible
      const isSelectable = !isLocked && isVisible

      if (isSelectable) {
        selectable.push(node)
      }

      if (node.children.length > 0) {
        traverse(node.children, isLocked, isVisible)
      }
    }
  }

  traverse(nodes, parentLocked, parentVisible)
  return selectable
}

/**
 * Get layers between two points (inclusive) for range selection
 */
export function getLayersBetween(
  nodes: LayerNode[],
  startId: string,
  endId: string
): string[] {
  const flattened = flattenTree(nodes)
  const startIdx = flattened.findIndex((n) => n.id === startId)
  const endIdx = flattened.findIndex((n) => n.id === endId)

  if (startIdx === -1 || endIdx === -1) {
    return []
  }

  const [min, max] = startIdx <= endIdx ? [startIdx, endIdx] : [endIdx, startIdx]
  return flattened.slice(min, max + 1).map((n) => n.id)
}

/**
 * Flatten tree to a single-level array (in order)
 */
export function flattenTree(nodes: LayerNode[]): LayerNode[] {
  const flattened: LayerNode[] = []

  function traverse(nodes: LayerNode[]) {
    for (const node of nodes) {
      flattened.push(node)
      if (node.children.length > 0) {
        traverse(node.children)
      }
    }
  }

  traverse(nodes)
  return flattened
}

/**
 * Update visibility of a node and optionally its children
 */
export function updateNodeVisibility(
  nodes: LayerNode[],
  id: string,
  visible: boolean,
  recursive = false
): LayerNode[] {
  return nodes.map((node) => {
    if (node.id === id) {
      const updated = { ...node, visible }
      if (recursive && node.children.length > 0) {
        updated.children = updateChildrenVisibility(node.children, visible)
      }
      return updated
    }
    if (node.children.length > 0) {
      return {
        ...node,
        children: updateNodeVisibility(node.children, id, visible, recursive),
      }
    }
    return node
  })
}

/**
 * Helper to update visibility of all children
 */
function updateChildrenVisibility(nodes: LayerNode[], visible: boolean): LayerNode[] {
  return nodes.map((node) => ({
    ...node,
    visible,
    children: node.children.length > 0 ? updateChildrenVisibility(node.children, visible) : [],
  }))
}

/**
 * Update lock state of a node
 */
export function updateNodeLockState(
  nodes: LayerNode[],
  id: string,
  locked: boolean
): LayerNode[] {
  return nodes.map((node) => {
    if (node.id === id) {
      return { ...node, locked }
    }
    if (node.children.length > 0) {
      return {
        ...node,
        children: updateNodeLockState(node.children, id, locked),
      }
    }
    return node
  })
}

/**
 * Toggle expanded state of a node
 */
export function toggleNodeExpanded(
  nodes: LayerNode[],
  id: string
): LayerNode[] {
  return nodes.map((node) => {
    if (node.id === id) {
      return { ...node, expanded: !node.expanded }
    }
    if (node.children.length > 0) {
      return {
        ...node,
        children: toggleNodeExpanded(node.children, id),
      }
    }
    return node
  })
}

/**
 * Collapse all nodes
 */
export function collapseAll(nodes: LayerNode[]): LayerNode[] {
  return nodes.map((node) => ({
    ...node,
    expanded: false,
    children: node.children.length > 0 ? collapseAll(node.children) : [],
  }))
}

/**
 * Expand all nodes
 */
export function expandAll(nodes: LayerNode[]): LayerNode[] {
  return nodes.map((node) => ({
    ...node,
    expanded: true,
    children: node.children.length > 0 ? expandAll(node.children) : [],
  }))
}

/**
 * Generate a new unique id based on existing id
 */
function generateId(base = 'node') {
  return `${base}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Deep clone a node and assign new ids to the clone and all descendants
 */
function cloneNodeWithNewIds(node: LayerNode): LayerNode {
  return {
    ...node,
    id: generateId(node.id),
    children: node.children.map(cloneNodeWithNewIds),
  }
}

/**
 * Delete a node (and its descendants) from the tree
 */
export function deleteNode(nodes: LayerNode[], id: string): LayerNode[] {
  const result: LayerNode[] = []

  for (const node of nodes) {
    if (node.id === id) continue
    if (node.children.length > 0) {
      result.push({ ...node, children: deleteNode(node.children, id) })
    } else {
      result.push(node)
    }
  }

  return result
}

/**
 * Duplicate a node in place (insert cloned node after the original)
 */
export function duplicateNode(nodes: LayerNode[], id: string): LayerNode[] {
  const result: LayerNode[] = []

  for (const node of nodes) {
    if (node.id === id) {
      result.push(node)
      const clone = cloneNodeWithNewIds(node)
      result.push(clone)
    } else if (node.children.length > 0) {
      const newChildren = duplicateNode(node.children, id)
      result.push({ ...node, children: newChildren })
    } else {
      result.push(node)
    }
  }

  return result
}
