import { useState, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface Props {
  tabs: Tab[]
  defaultTab?: string
}

export default function Tabs({ tabs, defaultTab }: Props) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id)
  const activeTab = tabs.find((t) => t.id === active)

  return (
    <div>
      <div className="flex border-b-3 border-manga-ink overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              'px-4 py-2.5 font-heading font-bold text-sm uppercase tracking-wider transition-all whitespace-nowrap',
              'border-b-3 -mb-[3px]',
              active === tab.id
                ? 'border-manga-red text-manga-red bg-white'
                : 'border-transparent text-manga-gray hover:text-manga-ink'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4">
        {activeTab?.content}
      </div>
    </div>
  )
}
