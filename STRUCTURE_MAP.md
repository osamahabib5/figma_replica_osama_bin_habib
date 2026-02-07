# Project Structure & File Map

## Directory Tree

```
figma_replica_veritaai/
│
├── 📁 src/                              # Source code root
│   │
│   ├── 🎨 App.tsx                       # Main app with demo data
│   │   └── Contains: 2 pages, nested layers, demo interactions
│   │
│   ├── 🚀 main.tsx                      # React entry point
│   │   └── Mounts App to #root
│   │
│   ├── 🎯 index.css                     # Global styles
│   │   ├── CSS Variables (colors, spacing, fonts)
│   │   ├── Scrollbar styling
│   │   └── Keyframes (animations)
│   │
│   ├── 📁 components/                   # React components
│   │   └── 📁 LayersPanel/              # Main panel component
│   │       ├── LayersPanel.tsx          # Panel layout (header, tabs, content)
│   │       ├── LayerTree.tsx            # Recursive tree renderer
│   │       ├── LayerRow.tsx             # Single layer row
│   │       ├── icons.tsx                # CVG icons (14 icons)
│   │       └── styles.ts                # Style constants
│   │
│   ├── 📁 state/                        # State management
│   │   └── layersStore.ts               # Zustand store
│   │       ├── Selection methods
│   │       ├── Tree mutation methods
│   │       └── Panel control methods
│   │
│   ├── 📁 types/                        # TypeScript definitions
│   │   └── layer.ts                     # LayerNode, SelectionState
│   │
│   └── 📁 utils/                        # Utility functions
│       └── treeHelpers.ts               # 25+ tree operations
│           ├── Traversal (findNodeById, getDescendants, etc.)
│           ├── Queries (getNodeDepth, flattenTree, etc.)
│           └── Mutations (updateVisibility, toggleExpanded, etc.)
│
├── 📄 index.html                        # HTML entry
├── 📄 package.json                      # Dependencies & scripts
├── 📄 tsconfig.json                     # TypeScript configuration
├── 📄 tsconfig.node.json                # Vite TypeScript config
├── 📄 vite.config.ts                    # Vite build config
├── 📄 tailwind.config.ts                # Tailwind theme & tokens
├── 📄 postcss.config.js                 # PostCSS plugins
├── 📄 .eslintrc.cjs                     # ESLint rules
├── 📄 .prettierrc                       # Prettier format rules
├── 📄 .gitignore                        # Git exclusions
│
└── 📚 Documentation/
    ├── README.md                        # Project overview
    ├── QUICKSTART.md                    # 5-minute setup
    ├── PROJECT_SUMMARY.md               # This file
    ├── ARCHITECTURE.md                  # Design deep-dive
    ├── FEATURES.md                      # Pixel-perfect checklist
    └── DEVELOPMENT.md                   # Developer guide
```

---

## Component Hierarchy

```
App
  ├── LayersPanel (280px, resizable)
  │   ├── Header
  │   │   ├── Title: "Layers"
  │   │   ├── Button: Expand All (⊕)
  │   │   └── Button: Collapse All (⊖)
  │   │
  │   ├── Tabs
  │   │   ├── Design Tab (ACTIVE)
  │   │   └── Assets Tab
  │   │
  │   ├── Design Tab Content
  │   │   ├── Search Input
  │   │   │
  │   │   ├── Pages Section (if multiple)
  │   │   │   └── Pages List
  │   │   │       └── Page Items (clickable)
  │   │   │
  │   │   └── Layers Tree
  │   │       ├── LayerRow
  │   │       │   ├── Chevron (16x4px)
  │   │       │   ├── Icon (16x16px)
  │   │       │   ├── Name (text)
  │   │       │   ├── Visibility Button (eye)
  │   │       │   └── Lock Button (lock)
  │   │       │
  │   │       └── LayerTree (nested)
  │   │           └── LayerRow (children)
  │   │               └── LayerTree (if expanded)
  │   │
  │   └── Resize Handle (right edge)
  │
  └── Canvas Area (demo)
      ├── Title
      ├── Instructions
      └── Interaction Legend
```

---

## Data Flow

```
User Interaction
   ↓
Component (LayerRow, LayersPanel)
   ↓
Event Handler (onClick, onMouseDown, etc.)
   ↓
Zustand Action (selectNode, toggleNodeExpanded, etc.)
   ↓
Util Helper (tree operation like updateNodeVisibility)
   ↓
Zustand Store Update (set { ... })
   ↓
React Re-render (subscribed component)
   ↓
Visual Update (UI reflects new state)
```

---

## State Structure

```
useLayersStore = {
  // Data
  pages: LayerNode[]
  currentPageId: string
  
  // Selection
  selectedIds: Set<string>
  focusedId?: string
  
  // UI
  expandedIds: Set<string>
  collapsedPanelWidth: number
  isPanelCollapsed: boolean
  
  // Methods (12+)
  setPages()
  selectNode()
  multiSelect()
  rangeSelect()
  toggleNodeExpanded()
  toggleNodeVisibility()
  toggleNodeLockState()
  // ... and more
}
```

---

## Tree Structure (LayerNode)

```
LayerNode {
  id: string              // "frame-hero"
  name: string            // "Hero Section"
  type: LayerType         // "frame" | "group" | "text" | ...
  visible: boolean        // true
  locked: boolean         // false
  expanded: boolean       // true
  parent?: string         // "page-1"
  children: LayerNode[]   // nested array
    [
      {
        id: "group-header"
        name: "Header"
        children: [...]
      }
    ]
}
```

---

## Key File Relationships

```
App.tsx
  ├─ uses → useLayersStore (Zustand)
  │         uses → layersStore.ts
  │
  └─ renders → LayersPanel.tsx
              ├─ uses → useLayersStore
              ├─ renders → LayerTree.tsx
              │           └─ renders → LayerRow.tsx
              │               ├─ uses → icons.tsx
              │               └─ uses → useLayersStore
              └─ uses → styles.ts

treeHelpers.ts
  ├─ used by → layersStore.ts (state mutations)
  └─ used by → LayerRow.tsx (indirect via store)

layer.ts (types)
  ├─ imported by → App.tsx
  ├─ imported by → LayersPanel.tsx
  ├─ imported by → LayerRow.tsx
  ├─ imported by → layersStore.ts
  ├─ imported by → treeHelpers.ts
  └─ shared across all components
```

---

## File Size Estimates

```
Configuration Files:
  package.json                ~400 bytes
  tsconfig.json               ~1KB
  vite.config.ts              ~800 bytes
  tailwind.config.ts          ~1.5KB
  postcss.config.js           ~200 bytes
  .eslintrc.cjs               ~800 bytes

Source Files:
  src/App.tsx                 ~2KB
  src/main.tsx                ~300 bytes
  src/index.css               ~2KB
  
  LayersPanel.tsx             ~3KB
  LayerTree.tsx               ~600 bytes
  LayerRow.tsx                ~2.5KB
  icons.tsx                   ~4KB
  styles.ts                   ~1KB
  
  layersStore.ts              ~3KB
  layer.ts                    ~600 bytes
  treeHelpers.ts              ~5KB

Documentation:
  README.md                   ~8KB
  ARCHITECTURE.md             ~15KB
  FEATURES.md                 ~10KB
  DEVELOPMENT.md              ~6KB
  QUICKSTART.md               ~4KB
  PROJECT_SUMMARY.md          ~8KB

Total Source: ~35KB
Total Docs: ~51KB
Total (without node_modules): ~150KB
```

---

## Build Output

```
npm run build
  ↓
Vite compilation
  ├─ TypeScript → JavaScript (tsc)
  ├─ CSS processing (Tailwind + PostCSS)
  ├─ Asset optimization
  └─ Code splitting
  ↓
dist/
  ├── index.html              (~1KB)
  ├── assets/
  │   ├── index-XXXXX.js      (~50KB minified + gzipped)
  │   └── index-XXXXX.css     (~15KB minified + gzipped)
  └── vite.svg                (~1KB)

Total Bundle: ~80KB (gzipped)
```

---

## Component Size Reference

```
LayersPanel.tsx         ~3KB (main panel layout)
LayerRow.tsx            ~2.5KB (single row logic)
LayerTree.tsx           ~600 bytes (recursive renderer)
icons.tsx               ~4KB (14 SVG icons)
layersStore.ts          ~3KB (15+ Zustand methods)
treeHelpers.ts          ~5KB (25+ utility functions)
App.tsx                 ~2KB (demo data + setup)
```

All components are **under 150 LOC** (best practice).

---

## Development Commands Map

```
npm install
  └─ Installs: React, Zustand, Tailwind, Vite, ESLint, Prettier
     Creates: node_modules/ (500MB)

npm run dev
  └─ Starts Vite dev server (HMR enabled)
     Watches: src/ files for changes
     Opens: http://localhost:5173

npm run build
  └─ Creates production build in dist/
     Output: ~80KB gzipped

npm run lint
  └─ Checks code quality with ESLint
     Reports: Style violations, type errors

npm run format
  └─ Auto-formats code with Prettier
     Updates: All .ts, .tsx files
```

---

## Key Paths & Imports

```
// Absolute path imports (configured in tsconfig.json)
import { useLayersStore } from '@state/layersStore'
import { LayerRow } from '@components/LayersPanel/LayerRow'
import { LayerNode } from '@types/layer'
import { findNodeById } from '@utils/treeHelpers'

// Relative imports
import { ChevronRightIcon } from './icons'
import { layersPanelStyles as styles } from './styles'
```

---

## Feature Implementation Map

```
Feature                     | File                  | Method
─────────────────────────── | ───────────────────── | ──────────────
Single Selection            | LayerRow.tsx          | handleMouseDown()
Multi-select (Ctrl+Click)   | layersStore.ts        | multiSelect()
Range Selection (Shift+)    | layersStore.ts        | rangeSelect()
Expand/Collapse             | LayersPanel.tsx       | toggleNodeExpanded()
Visibility Toggle           | LayersPanel.tsx       | toggleNodeVisibility()
Lock Toggle                 | LayersPanel.tsx       | toggleNodeLockState()
Keyboard Navigation (↑↓)    | LayerRow.tsx          | useEffect()
Panel Resizing              | LayersPanel.tsx       | handleMouseMove()
Page Navigation             | LayersPanel.tsx       | onClick handler
Icon Display                | LayerRow.tsx          | getIconForLayerType()
Indentation                 | LayerRow.tsx          | style padding-left
Hover States                | LayerRow.tsx          | CSS classes
Search (stub)               | LayersPanel.tsx       | Input field
```

---

## Testing Strategy Map

```
Unit Tests (ready to add):
  • treeHelpers.find/getDescendants
  • layersStore.selectNode/multiSelect
  • renderLayerRow component

Integration Tests (ready to add):
  • App selection flow
  • Panel resize interactions
  • Keyboard navigation

Visual Regression (ready for):
  • Screenshot comparison
  • Color/spacing verification
  • Animation timing
```

---

## Deployment Paths

```
Option 1: Vercel
  vercel deploy
  → Auto-builds from vite.config.ts
  → Optimized for Vite + React

Option 2: Netlify
  netlify deploy --prod --dir=dist

Option 3: Self-hosted
  npm run build
  serve dist  (or upload to web server)
```

---

## Quick Reference

| What | Where | How |
|------|-------|-----|
| **Colors** | src/index.css | CSS variables (--color-*) |
| **Spacing** | tailwind.config.ts | Tailwind theme.spacing |
| **Fonts** | tailwind.config.ts | theme.fontSize |
| **Store** | src/state/layersStore.ts | useLayersStore() hook |
| **Types** | src/types/layer.ts | Import LayerNode |
| **Utils** | src/utils/treeHelpers.ts | Tree operations |
| **Icons** | src/components/LayersPanel/icons.tsx | SVG components |
| **Styles** | src/components/LayersPanel/styles.ts | CSS class constants |

---

## Quick Debugging

```javascript
// In browser console:

// Check store state
useLayersStore.getState()

// Watch state changes
useLayersStore.subscribe(console.log)

// Check selected IDs
useLayersStore.getState().selectedIds

// Check current page
useLayersStore.getState().pages
```

---

**This file is a visual map of the entire project structure and relationships.**

Use it for:
- Understanding component relationships
- Locating specific features
- Following data flow
- Navigating the codebase
- Onboarding new developers

---

*Last Updated: February 6, 2026*
