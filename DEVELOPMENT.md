# Development Guide

Quick reference for developers working on this project.

## Getting Started

### First-Time Setup
```bash
# Install dependencies (Node 16+ required)
npm install

# Start dev server
npm run dev

# The app opens at http://localhost:5173
```

### Build & Deploy
```bash
# Create optimized build
npm run build

# Preview production build locally
npm run preview

# Check code quality
npm run lint
npm run format
```

## Project Structure at a Glance

```
src/
├── components/LayersPanel/    # UI components (what users see)
├── state/layersStore.ts       # State management (Zustand)
├── types/layer.ts             # TypeScript interfaces
├── utils/treeHelpers.ts       # Pure tree functions
├── App.tsx                    # Demo/main component
├── main.tsx                   # React entry point
└── index.css                  # Global styles
```

## Common Tasks

### Add a New Layer Property

1. **Update type** (`src/types/layer.ts`):
   ```typescript
   export interface LayerNode {
     // ... existing fields
     newProperty: string
   }
   ```

2. **Update store** (`src/state/layersStore.ts`):
   ```typescript
   updateNewProperty: (nodeId, value) => {
     // Implementation
   }
   ```

3. **Update demo data** (`src/App.tsx`):
   ```typescript
   const DEMO_PAGES = [{
     // ... existing fields
     newProperty: 'value'
   }]
   ```

### Add a New Icon Type

1. **Add icon** (`src/components/LayersPanel/icons.tsx`):
   ```typescript
   export const NewIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
     <svg>...</svg>
   )
   ```

2. **Update factory** in same file:
   ```typescript
   case 'new-type':
     return <NewIcon size={size} className={className} />
   ```

### Add Keyboard Shortcut

1. **Add to LayersPanel** (`src/components/LayersPanel/LayersPanel.tsx`):
   ```typescript
   useEffect(() => {
     const handleKeyDown = (e: KeyboardEvent) => {
       if (e.key === 'YourKey') {
         e.preventDefault()
         // Do something
       }
     }
     document.addEventListener('keydown', handleKeyDown)
     return () => document.removeEventListener('keydown', handleKeyDown)
   }, [dependency])
   ```

### Style Changes

1. **Update design token** (`src/index.css`):
   ```css
   :root {
     --color-custom: #newcolor;
   }
   ```

2. **Or update Tailwind** (`tailwind.config.ts`):
   ```typescript
   colors: {
     'custom': '#newcolor'
   }
   ```

3. **Use in component**:
   ```tsx
   className="text-custom bg-custom-bg"
   ```

## Testing During Development

### Manual Testing Checklist
- [ ] Single click selects one layer
- [ ] Ctrl+click multi-selects
- [ ] Shift+click range-selects
- [ ] Esc clears selection
- [ ] Eye icon toggles visibility
- [ ] Lock icon toggles lock state
- [ ] Chevron rotates and expands/collapses
- [ ] Panel resizes smoothly
- [ ] Keyboard navigation (↑↓→←)
- [ ] No console errors

### Debug Tips

**Zustand Store State:**
```javascript
// In browser console
useLayersStore.getState() // See current state
useLayersStore.subscribe(state => console.log(state)) // Watch changes
```

**React DevTools:**
- Install React DevTools extension
- Check component re-renders (highlight updates)
- Inspect props and state

**Performance:**
- Open DevTools → Lighthouse
- Check Largest Contentful Paint (LCP)
- Check Cumulative Layout Shift (CLS)

## Code Style Rules

### TypeScript
- Use strict mode (enabled by default)
- Prefer explicit types over inference
- Use interfaces for object shapes
- Use `unknown` instead of `any`

### Components
- Keep components under 150 lines
- Use hooks for logic (not classes)
- Memoize expensive calculations
- Extract styles to `styles.ts`

### State Management
- Keep Zustand store logic pure
- Use immutable updates (spread operator)
- Avoid circular dependencies
- Subscribe selectively (not entire store)

### File Organization
```
ComponentName.tsx          # Main component
useComponentStore.ts       # Store (if any)
componentHelpers.ts        # Utilities
componentStyles.ts         # Style constants
index.ts                   # Exports (optional)
```

## Troubleshooting

### Build fails with "Cannot find module"
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run build
```

### TypeScript errors
```bash
# Check all files
npm run lint

# Fix automatically
npm run format
```

### Vite hot reload not working
- Check terminal for errors
- Restart dev server: `npm run dev`
- Clear browser cache (hard refresh: Ctrl+Shift+R)

### Tailwind classes not applying
- Check class name matches config
- Restart Vite dev server
- Verify file is in `content` paths (check `tailwind.config.ts`)

### State not updating
- Check Zustand method is called correctly
- Verify immutability (use spread operator)
- Check component is subscribed to store
- Use DevTools to inspect state changes

## Performance Checklist

Before committing:
- [ ] No unused imports
- [ ] No `console.log()` statements
- [ ] No inline function definitions in render
- [ ] No unnecessary re-renders (check React DevTools)
- [ ] Bundle size reasonable (< 100KB gzipped)

## Git Workflow

### Commit Message Format
```
feat: Add new feature
fix: Resolve issue
refactor: Improve code structure
docs: Update documentation
style: Format code
perf: Optimize performance
test: Add tests
chore: Update dependencies
```

### Before Push
```bash
npm run lint
npm run format
npm run build
```

## Resources

- [React 18 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Docs](https://zustand-demo.vercel.app/)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev/guide/)

## Questions?

Refer to:
1. `README.md` – Overview & features
2. `ARCHITECTURE.md` – Deep dive into design decisions
3. Code comments – Implementation details
4. TypeScript types – Expected data shapes

---

**Happy coding! 🚀**
