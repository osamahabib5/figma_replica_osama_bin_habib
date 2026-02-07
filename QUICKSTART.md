# Quick Setup Guide

## Prerequisites

- **Node.js** 16+ (check: `node --version`)
- **npm** 7+ (installed with Node.js)
- **Git** (for version control)

## Installation (5 Minutes)

### Step 1: Install Dependencies
```bash
cd d:\job_projects\figma_replica_veritaai
npm install
```

**Expected output:**
```
added 200+ packages in 45s
```

### Step 2: Start Development Server
```bash
npm run dev
```

**Expected output:**
```
  VITE v5.0.8  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Browser automatically opens at `http://localhost:5173/`

### Step 3: Explore the Panel

You're now viewing the Figma Layers Panel replica!

**Try These Interactions:**
1. Click a layer → Single select
2. Ctrl+Click (Cmd on Mac) → Multi-select
3. Shift+Click → Range select
4. Click eye icon → Hide/show
5. Click lock icon → Lock/unlock
6. Click chevron → Expand/collapse
7. Drag right edge → Resize panel
8. Press Esc → Clear selection

---

## Verify Installation

### To ensure everything works:

```bash
# Check TypeScript (should show no errors)
npm run lint

# Build for production (creates dist folder)
npm run build

# Preview production build
npm run preview
```

If all commands succeed, you're ready to develop! ✅

---

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (auto-reload) |
| `npm run build` | Create optimized build |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `npm run format` | Auto-format code |

---

## File Structure Overview

```
project/
├── src/                        # Source code
│   ├── components/             # React components
│   │   └── LayersPanel/        # Main panel component
│   ├── state/                  # Zustand store
│   ├── types/                  # TypeScript types
│   ├── utils/                  # Tree utilities
│   ├── App.tsx                 # Demo app
│   └── index.css               # Global styles
├── index.html                  # HTML entry
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind theme
├── vite.config.ts              # Vite config
├── README.md                   # Project overview
├── ARCHITECTURE.md             # Design deep-dive
└── FEATURES.md                 # Feature list
```

---

## Next Steps

### Learn the Codebase
1. Read [README.md](./README.md) – Overview & scope
2. Read [ARCHITECTURE.md](./ARCHITECTURE.md) – Design decisions
3. Read [FEATURES.md](./FEATURES.md) – Pixel-perfect details
4. Read [DEVELOPMENT.md](./DEVELOPMENT.md) – Dev guide

### Make Changes
1. Edit components in `src/components/`
2. Dev server auto-reloads on save
3. Check `npm run lint` for issues
4. Run `npm run build` to verify production build

### Deploy (Optional)
```bash
npm run build
# Upload dist/ folder to hosting (Vercel, Netlify, etc.)
```

---

## Troubleshooting

### Port 5173 already in use
```bash
# Use different port
npm run dev -- --port 3000
```

### Dependencies not installing
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Hot reload not working
```bash
# Restart dev server
npm run dev
# Hard refresh browser (Ctrl+Shift+R)
```

### TypeScript errors
```bash
# Check all files for errors
npm run lint

# Auto-fix formatting
npm run format
```

---

## Browser DevTools Tips

### React Component Inspector
1. Install React DevTools extension
2. Open DevTools → Components tab
3. Inspect LayerRow, LayersPanel components
4. Check props and hooks

### Zustand State Inspection
```javascript
// In browser console:
useLayersStore.getState()  // View current state
useLayersStore.subscribe(state => {
  console.log('State changed:', state)
})
```

### Network/Performance
1. DevTools → Network tab
2. Hard reload (Ctrl+Shift+R)
3. Check all files load (no 404s)
4. Performance tab: Check FCP, LCP

---

## Project Statistics

| Metric | Value |
|--------|-------|
| Lines of Code | ~2,000 |
| Components | 5 |
| Type Definitions | 15+ |
| Utility Functions | 25+ |
| CSS Variables | 20+ |
| Bundle Size | ~80KB (gzipped) |
| Build Time | ~2 seconds |
| Dev Server Start | < 1 second |

---

## Key Technologies

- **React 18** – UI framework
- **TypeScript** – Type safety
- **Vite** – Build tool
- **Zustand** – State management
- **Tailwind CSS** – Styling
- **Custom SVG Icons** – Vector graphics

---

## Support & Resources

- **React** → [react.dev](https://react.dev)
- **TypeScript** → [typescriptlang.org](https://www.typescriptlang.org)
- **Zustand** → [zustand-demo.vercel.app](https://zustand-demo.vercel.app)
- **Tailwind** → [tailwindcss.com](https://tailwindcss.com)
- **Vite** → [vitejs.dev](https://vitejs.dev)

---

## Success Checklist

- ✅ Node 16+ installed
- ✅ `npm install` completed
- ✅ `npm run dev` running
- ✅ Browser shows Layers Panel
- ✅ Click layer → selection works
- ✅ Eye icon → visibility works
- ✅ All interactions responsive

**You're all set! Happy coding! 🚀**

---

**Questions?** Check the documentation files above.
