import React from 'react'
import type { LayerNode } from '@/types/layer'
import { PageItem } from './PageItem'
import { ChevronDown } from 'lucide-react'

interface PagesPanelProps {
  pages: LayerNode[]
}

export const PagesPanel: React.FC<PagesPanelProps> = ({ pages }) => {
  return (
    <div className="flex flex-col flex-shrink-0">
      {/* List with Active State Logic inside PageItem */}
      <div className="flex flex-col px-0 py-1">
        {pages.map((page) => (
          <PageItem key={page.id} page={page} />
        ))}
      </div>

      {/* The "Free Pages" banner would usually go here if it's the end of the section */}
    </div>
  )
}