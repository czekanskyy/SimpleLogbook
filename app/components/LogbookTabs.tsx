'use client'

import Link from 'next/link'
import { Plane, Send, Monitor, Home } from 'lucide-react'
import { useUI } from '@/app/context/UIContext'

export type LogbookType = 'home' | 'aircraft' | 'glider' | 'simulator'

export default function LogbookTabs({ activeTab }: { activeTab: LogbookType }) {
  const { t } = useUI()

  const tabs = [
    { id: 'home' as LogbookType, label: 'Home', icon: Home, href: '/' },
    { id: 'aircraft' as LogbookType, label: t.tabAircraft, icon: Plane, href: '/aircraft' },
    { id: 'glider' as LogbookType, label: t.tabGlider, icon: Send, href: '/glider' },
    { id: 'simulator' as LogbookType, label: t.tabSimulator, icon: Monitor, href: '/sim' },
  ]

  return (
    <div className="flex flex-wrap gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg md:w-max sticky top-0 md:rounded-t-none border md:border-t-0 border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <Link
            key={tab.id}
            href={tab.href as any}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
              ${isActive 
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
              }
            `}
          >
            <Icon size={18} />
            <span className="hidden sm:inline">{tab.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
