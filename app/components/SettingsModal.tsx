'use client'

import { useState, useTransition } from 'react'
import { X, Settings, Moon, Sun, Globe, List } from 'lucide-react'
import { useUI } from '@/app/context/UIContext'
import { updateSettings } from '@/app/lib/actions'

interface SettingsModalProps {
  rowsPerPage: number
}

export default function SettingsModal({ rowsPerPage }: SettingsModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme, language, setLanguage, t } = useUI()
  const [isPending, startTransition] = useTransition()
  const [rows, setRows] = useState(rowsPerPage)

  const handleRowsChange = (newRows: number) => {
    setRows(newRows)
    startTransition(async () => {
      await updateSettings(newRows)
    })
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        title={t.settings}
      >
        <Settings size={20} />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-900/50 dark:bg-gray-900/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t.settings}</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Theme Toggle */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{t.appearance}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {theme === 'light' ? t.lightMode : t.darkMode}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              {t.toggle}
            </button>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                <Globe size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{t.language}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'en' ? 'English' : 'Polski'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setLanguage(language === 'en' ? 'pl' : 'en')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              {t.change}
            </button>
          </div>

          {/* Rows Per Page */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                <List size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{language === 'en' ? 'Rows per page' : 'Wiersze na stronę'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {rows} {language === 'en' ? 'rows' : 'wierszy'}
                </p>
              </div>
            </div>
            <input
              type="number"
              value={rows}
              onChange={(e) => handleRowsChange(Number(e.target.value))}
              disabled={isPending}
              min="1"
              max="100"
              className="w-20 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
