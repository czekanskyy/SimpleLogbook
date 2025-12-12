'use client'

import Link from 'next/link'
import { Plane, Send, Monitor, Settings, HelpCircle, Megaphone } from 'lucide-react'
import { useState } from 'react'
import { useUI } from '@/app/context/UIContext'
import SettingsModal from '@/app/components/SettingsModal'
import ChangelogModal from '@/app/components/ChangelogModal'
import ProfileModal from '@/app/components/ProfileModal'

export default function Home() {
  const { user, t } = useUI()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isChangelogOpen, setIsChangelogOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 relative">
      {/* Top Right Utility Buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={() => setIsChangelogOpen(true)}
          className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          title={t.changelog}
        >
          <Megaphone size={24} />
        </button>
        
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          title={t.settings}
        >
          <Settings size={24} />
        </button>

				         {user?.role === 'ADMIN' && (
          <a
            href="/admin"
            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            title="Admin Panel"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </a>
        )}

        {user && (
          <button
            onClick={() => setIsProfileOpen(true)}
            className="p-1 ml-2 transition-transform hover:scale-105"
            title="Profile"
          >
            <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ${
              user.avatarColor === 'blue' ? 'bg-blue-500' :
              user.avatarColor === 'red' ? 'bg-red-500' :
              user.avatarColor === 'green' ? 'bg-green-500' :
              user.avatarColor === 'yellow' ? 'bg-yellow-500' :
              user.avatarColor === 'purple' ? 'bg-purple-500' :
              user.avatarColor === 'pink' ? 'bg-pink-500' :
              user.avatarColor === 'indigo' ? 'bg-indigo-500' :
              user.avatarColor === 'cyan' ? 'bg-cyan-500' :
              user.avatarColor === 'orange' ? 'bg-orange-500' :
              'bg-blue-500'
            }`}>
              {(user.name?.[0] || user.email?.[0] || "U").toUpperCase()}
            </div>
          </button>
        )}
      </div>

      <div className="w-full max-w-4xl space-y-12 animate-fadeIn mt-16 md:mt-0">
        
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t.hubTitle || 'eLogbook'}
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            {t.hubSubtitle || 'Select your logbook type to continue'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/aircraft"
            className="group relative flex flex-col items-center justify-start p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-4 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Plane size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.hubAircraftTitle || 'Aircraft'}</h2>
            <p className="text-center text-gray-500 dark:text-gray-400">
              {t.hubAircraftDesc || 'Airplane pilot logbook (EASA FCL.050)'}
            </p>
          </Link>

          <Link
            href="/glider"
            className="group relative flex flex-col items-center justify-start p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-linear-to-br from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-4 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Send size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.hubGliderTitle || 'Glider'}</h2>
            <p className="text-center text-gray-500 dark:text-gray-400">
              {t.hubGliderDesc || 'Sailplane pilot logbook (SFCL.050)'}
            </p>
          </Link>

          <Link
            href="/sim"
            className="group relative flex flex-col items-center justify-start p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-linear-to-br from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-4 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Monitor size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.hubSimulatorTitle || 'Simulator'}</h2>
            <p className="text-center text-gray-500 dark:text-gray-400">
              {t.hubSimulatorDesc || 'FSTD Session Log'}
            </p>
          </Link>
        </div>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

      <ChangelogModal
        isOpen={isChangelogOpen}
        onClose={() => setIsChangelogOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </main>
  )
}
