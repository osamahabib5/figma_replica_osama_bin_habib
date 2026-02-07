export const layersPanelStyles = {
  // Panel
  panel: 'flex flex-col h-full bg-figma-bg border-r border-figma-border',
  panelCollapsed: 'hidden',

  // Header
  header: 'flex items-center justify-between h-10 px-3 border-b border-figma-border bg-figma-bg-secondary',
  headerTitle: 'text-figma-sm font-semibold text-figma-text-primary',
  headerAction: 'text-figma-xs text-figma-text-secondary hover:text-figma-text-primary cursor-pointer transition-colors',

  // Tabs
  tabs: 'flex border-b border-figma-border bg-figma-bg',
  tab: 'flex-1 h-8 flex items-center justify-center text-figma-xs font-medium text-figma-text-secondary hover:text-figma-text-primary cursor-default transition-colors border-b-2 border-transparent',
  tabActive: 'text-figma-accent border-b-2 border-figma-accent',

  // Content
  content: 'flex-1 overflow-y-auto overflow-x-hidden',
  contentScroll: 'scroll-smooth',

  // Search
  search: 'h-8 px-2 py-1 border-b border-figma-border bg-figma-bg',
  searchInput: 'w-full h-6 px-2 rounded text-figma-xs bg-figma-bg-secondary border border-figma-border text-figma-text-primary placeholder-figma-text-disabled focus:outline-none focus:border-figma-accent focus:ring-1 focus:ring-figma-accent',

  // Pages section
  pagesHeader: 'h-7 px-3 flex items-center text-figma-xs font-semibold text-figma-text-secondary uppercase tracking-wide',
  pagesContainer: 'flex flex-col',
  pageItem: 'h-7 px-3 flex items-center text-figma-sm text-figma-text-primary hover:bg-figma-bg-hover cursor-default transition-colors border-b-2 border-transparent',

  // Empty state
  empty: 'flex items-center justify-center h-full text-figma-text-secondary text-figma-sm',

  // Resize handle
  resizeHandle: 'absolute top-0 right-0 w-1 h-full hover:bg-figma-accent cursor-col-resize group',

  // Selection indicator
  selectionBar: 'absolute left-0 top-0 bottom-0 w-0.5 bg-figma-accent',
}
