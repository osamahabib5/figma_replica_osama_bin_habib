# Figma Layers Panel Replica — README

This repository implements a focused recreation of the Figma Layers Panel UI. The README below follows the requested standard and includes:

- The specific reference component chosen
- A list of external libraries and AI tools used
- A short Workflow Efficiency Report describing automations used

---

**Reference component / section chosen**

- Left Sidebar: "Pages & Layers" panel (the File tab in Figma). This includes the pages list, the hierarchical layers tree, expand/collapse behavior, visibility and lock toggles, inline rename, and resizable/collapsible panel behavior.

**External libraries and AI tools used**

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand (state management)
- Lucide React (icons)
- dnd-kit (installed for future drag/drop)
- PostCSS / Autoprefixer
- ESLint / Prettier
- AI assistance: GitHub Copilot and ChatGPT (used for scaffolding and iterative code suggestions)

**Workflow Efficiency Report (short)**

- Method 1 — Component scaffolding with AI: I used AI-assisted code generation (ChatGPT / GitHub Copilot) to scaffold recursive tree rendering and resize handlers. This saved time on boilerplate and allowed me to focus on higher-quality component design and edge-case handling.

- Method 2 — Centralized design tokens and small, high-quality components: Instead of many tiny, single-purpose files, I consolidated shared styles into `src/styles/tokens.ts` and reduced duplication by keeping the sidebar behavior inside a smaller set of focused components. This reduces overhead and improves maintainability.

---

If you need a more detailed developer guide or a different component extracted for review, tell me which piece to expand and I'll produce it.

### ⚙️ Toolbar (Center-Bottom)
- **Drawing Tools** — Move, Frame, Rectangle, Pen, with dropdown submenus
- **Text & Comments** — Quick text insertion and comment tools
- **Hand Tool** — Pan and navigate the canvas (Figma-style)
- **Dev Mode Toggle** — Switch between design modes instantly
- **Active Tool Highlighting** — Blue background for selected tool
- **Keyboard Shortcuts** — V, F, R, P, T, H, Shift+I, C
- **Rounded Pill Design** — Modern dark theme (#1e1e1e background)

### 🔍 Right Sidebar (Inspector Panel)
- **Design Panel Header** — Shows current selection info with Share button
- **Page/Selection Info** — View properties of selected layers
- **Variables Section** — Manage design variables and tokens
- **Styles Section** — Predefined typography styles (Header 1, Header 2, Body)
- **Color Styles** — Reusable color palette with expandable sections
- **Export Section** — Configure asset export settings
- **Responsive Layout** — 240px fixed width matching left sidebar
- **Dark Theme** — #2c2c2c background for consistency

### 🎯 Canvas Area (Center)
- **Light Gray Background** — #e5e5e5 professional editing area
- **Zoom Controls** — Top-right corner UI with +/− buttons, percentage display, and reset
- **Keyboard Zoom** — Ctrl+Plus/Minus (Cmd on Mac) for quick zoom
- **Mouse Wheel Zoom** — Hold Ctrl/Cmd and scroll to zoom smoothly
- **Zoom Range** — Support from 10% to 400% scaling
- **Non-Scaling UI** — Sidebars and toolbar remain fixed during zoom
- **Smooth Scaling** — 150ms transition for visual polish

### 🖱️ Custom Cursor
- **Custom Icon** — Branded hand pointer throughout the app
- **Loaded from** — `public/cursor.png` (user-provided image)
- **Responsive** — Updates based on element hover state

### 💡 Help & Guidance
- **Help Icon** — Question mark (?) button in bottom-right corner
- **Visual Reference** — Instructions in center panel for interaction hints

## 🚀 Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager

### Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/osamahabib5/figma-replica-veritaai.git
cd figma-replica-veritaai

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# The app will open at http://localhost:5173
```

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready for deployment.

## ⌨️ Keyboard Shortcuts & Controls

### Navigation & Selection
| Action | Keyboard |
|--------|----------|
| Select Layer | Click |
| Multi-Select | Ctrl/Cmd + Click |
| Range Select | Shift + Click |
| Clear Selection | Esc |
| Next Layer | ↓ |
| Previous Layer | ↑ |

### Zoom Controls
| Action | Keyboard / Mouse |
|--------|-----------------|
| Zoom In | Ctrl+Plus or Ctrl+Scroll (up) |
| Zoom Out | Ctrl+Minus or Ctrl+Scroll (down) |
| Reset Zoom | Ctrl+0 |
| Pan (Mac) | Cmd+Plus / Cmd+Minus / Cmd+0 |

### Toolbar Tools
| Tool | Shortcut |
|------|----------|
| Move | V |
| Frame | F |
| Rectangle | R |
| Pen | P |
| Text | T |
| Hand | H |
| Resources | Shift+I |
| Comments | C |

### Layer Interactions
| Action | Method |
|--------|--------|
| Toggle Visibility | Click Eye Icon |
| Toggle Lock | Click Lock Icon |
| Expand/Collapse | Click Chevron |
| Rename Layer | Double-Click, then Enter/Escape |

## 📁 Project Structure

```
src/
├── components/
│   ├── Sidebar/                    # Left sidebar (Pages + Layers)
│   │   ├── Sidebar.tsx             # Main container (240px default, resizable)
│   │   ├── ResizeHandle.tsx        # Draggable resize handle
│   │   ├── PagesPanel.tsx          # Pages section with navigation
│   │   ├── PageItem.tsx            # Individual page button
│   │   ├── LayersPanel.tsx         # Layers section (scrollable)
│   │   ├── LayerItem.tsx           # Single layer with interactions
│   │   └── LayerTree.tsx           # Recursive tree renderer
│   ├── RightSidebar/               # Right sidebar (Inspector)
│   │   └── RightSidebar.tsx        # Inspector panel with design properties
│   ├── Toolbar/                    # Floating toolbar
│   │   └── Toolbar.tsx             # Tool buttons + mode toggle (Lucide icons)
│   └── LayersPanel/                # Legacy dark theme components
│       └── icons.tsx               # Custom SVG icon exports
├── state/
│   ├── useSidebarStore.ts          # Zustand store (sidebar state)
│   ├── layersStore.ts              # Zustand store (layers state)
│   └── useZoomStore.ts             # Zustand store (zoom management)
├── types/
│   └── layer.ts                    # TypeScript interfaces
├── utils/
│   └── treeHelpers.ts              # Tree traversal utilities
├── styles/
│   ├── tokens.ts                   # Design tokens (colors, spacing, etc.)
│   └── index.css                   # Global styles + CSS variables
├── images/
│   └── cursor.png                  # Custom cursor icon
├── App.tsx                         # Main app component with zoom
└── main.tsx                        # React entry point

public/
├── cursor.png                      # Public cursor asset
└── index.html                      # HTML entry point

Configuration:
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript config with path aliases
├── vite.config.ts                  # Vite build configuration
├── tailwind.config.ts              # Tailwind CSS config
├── postcss.config.js               # PostCSS plugins
└── .gitignore                      # Git ignore rules
```

## 🛠️ Technology Stack

- **React 18** — Latest UI library with hooks
- **TypeScript 5** — Full type safety and strict mode
- **Zustand** — Lightweight, performant state management
- **Tailwind CSS 3** — Utility-first styling framework
- **Vite 5** — Lightning-fast build tool and dev server
- **Lucide React** — Icon library for toolbar
- **PostCSS** — CSS processing and autoprefixing
- **ESLint & Prettier** — Code quality and formatting

## 🎨 Design System

All colors, typography, and spacing are centralized in design tokens:

### Color Palette
```typescript
// Sidebar backgrounds
--color-bg: #2c2c2c          // Dark sidebar background
--color-bg-hover: #333333    // Hover state
--color-bg-selected: #393939 // Selected item

// Canvas background
Canvas background: #e5e5e5   // Light editing area

// Text colors
--color-text-primary: #e6e6e6    // Main text
--color-text-secondary: #bfc7cc  // Secondary text
--color-accent: #18a0fb          // Accent (blue highlight)
```

### Spacing System
```typescript
spacing: {
  itemHeight: 28,           // Layer row height
  indentPerLevel: 16,       // Nesting depth indent
  iconSize: 16,             // Icon dimensions
  padding: 6,               // Default padding
}
```

### Animation
```typescript
animation: {
  transition: 150,          // Transition duration (ms)
  easing: 'cubic-bezier(0.2, 0, 0.38, 0.9)'  // Smooth easing
}
```

## 🧠 State Management

### Zustand Stores

**`useSidebarStore`** — Sidebar UI state
```typescript
{
  sidebarWidth: number              // Current width (240–360px)
  selectedLayerId: string | null    // Currently selected layer
  renamingId: string | null         // Layer being renamed
  expandedIds: Set<string>         // Open/closed layer groups
  activePageId: string             // Current page
}
```

**`layersStore`** — Layers data
```typescript
{
  pages: LayerNode[]               // All pages
  currentPage: LayerNode | null    // Active page
  // Methods: addLayer, deleteLayer, duplicateLayer, etc.
}
```

**`useZoomStore`** — Canvas zoom level
```typescript
{
  zoom: number                     // Current zoom (0.1 to 4)
  zoomIn / zoomOut / resetZoom    // Zoom control methods
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/figma-replica-veritaai.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow existing code style
   - Keep components focused and small
   - Add TypeScript types
   - Test interactions thoroughly

4. **Commit with clear messages**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/amazing-feature
   ```

### Code Standards

- **TypeScript**: All code must be typed
- **Components**: Max ~150 lines per component
- **Imports**: Use path aliases (@components, @state, @styles)
- **Formatting**: Run `npm run format` before committing
- **Linting**: Ensure `npm run lint` passes

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Vite Guide](https://vitejs.dev/guide/)
- [Lucide React Icons](https://lucide.dev)

## 🐛 Known Issues & Limitations

1. **No Drag-and-Drop** — dnd-kit is installed but layer reordering isn't implemented
2. **No Backend Sync** — Layer state is client-side only
3. **No Undo/Redo** — Planned for future releases
4. **Limited Animation** — Some complex Figma animations not replicated
5. **No Component Editing** — Component inspection only, not editable

## 🔮 Future Enhancements

- [ ] Drag-and-drop layer reordering
- [ ] Undo/Redo stack management
- [ ] Right-click context menu actions
- [ ] Component editing and variant support
- [ ] Assets library panel
- [ ] Collaboration features (cursors, awareness)
- [ ] Keyboard shortcut customization
- [ ] Theme customization (Light/Dark toggle)
- [ ] Export functionality
- [ ] Search/filter layers

---

## 👨‍💻 Questions?

Found a bug or have a feature request? Open an [issue](https://github.com/YOUR_USERNAME/figma-replica-veritaai/issues) on GitHub!

**Last Updated:** February 7, 2026
5. Click lock icon → Verify locked state (cannot select)
6. Click chevron → Verify expand/collapse animation
7. Drag panel resize handle → Verify smooth resizing
8. Press Esc → Verify selection clear

## 📚 References

- [Figma Layers Panel](https://help.figma.com/hc/en-us/articles/360039832054-Inspect-panels)
- [Zustand Docs](https://zustand-demo.vercel.app/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React 18 Docs](https://react.dev/)

---

**Built with intentional use of advanced tooling and AI assistance to accelerate development while maintaining production-quality code.**

**Submission Date:** February 6, 2026
