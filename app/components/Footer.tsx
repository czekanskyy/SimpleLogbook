'use client'

import { useUI } from '@/app/context/UIContext'
import { Github } from 'lucide-react'

export default function Footer() {
  const { t } = useUI()

  return (
    <footer className="w-full py-6 mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <span>&copy; {new Date().getFullYear()} {t.footer.copyright}</span>
          <span className="hidden md:inline text-gray-300 dark:text-gray-700">|</span>
          <div className="flex items-center gap-1">
            <span>{t.footer.madeBy}</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">Dominik Czekański</span>
          </div>
        </div>

        <a
          href="https://github.com/czekanskyy/SimpleLogbook"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Github size={16} />
          <span>{t.footer.github}</span>
        </a>
      </div>
    </footer>
  )
}
