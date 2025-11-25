'use client'

import { useState } from 'react'
import { X, Megaphone, ChevronDown } from 'lucide-react'
import { useUI } from '@/app/context/UIContext'
import { changelog } from '@/app/lib/changelog'

interface ChangelogModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChangelogModal({ isOpen, onClose }: ChangelogModalProps) {
  const [expandedVersion, setExpandedVersion] = useState('1.0.4')
  const { t } = useUI()

  const toggleVersion = (version: string) => {
    setExpandedVersion(expandedVersion === version ? '' : version)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-purple-500 to-purple-600">
          <div className="flex items-center gap-3">
            <Megaphone className="text-white" size={28} />
            <h2 className="text-2xl font-bold text-white">{t.changelogTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Content - Accordion */}
        <div className="overflow-y-auto p-6 space-y-4">
          {changelog.map((entry) => (
            <div
              key={entry.version}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleVersion(entry.version)}
                className="w-full p-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors flex justify-between items-center text-left"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t.changelogVersion} {entry.version}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.changelogReleased}: {entry.date}
                  </p>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-gray-600 dark:text-gray-400 transition-transform ${
                    expandedVersion === entry.version ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Accordion Content */}
              {expandedVersion === entry.version && (
                <div className="p-4 bg-white dark:bg-gray-800">
                  <ul className="space-y-2">
                    {entry.changes.map((change, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-purple-500 mt-1">•</span>
                        <span>{(t as any)[change]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <button
            onClick={onClose}
            className="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold"
          >
            {t.closeHelp}
          </button>
        </div>
      </div>
    </div>
  )
}
