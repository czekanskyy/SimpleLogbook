'use client'

import { useState, useEffect } from 'react'
import { useUI } from '../context/UIContext'
import { updateSettings } from '../lib/actions'
import { deleteAllFlights } from '../lib/actions'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, setLanguage } = useUI()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [rows, setRows] = useState(settings.rowsPerPage)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    // Check current theme
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
  }, [isOpen])

  if (!isOpen) return null

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (value > 0 && value <= 100) {
      setRows(value)
      // Update settings without awaiting to avoid React event pooling issues
      updateSettings({ rowsPerPage: value })
        .then(() => {
          // optional success handling, e.g., toast.success('Liczba wierszy zapisana')
        })
        .catch((err) => {
          console.error('Failed to update rows per page:', err)
          alert('Nie udało się zapisać liczby wierszy.')
        })
    }
  }

  const handleLanguageChange = async (lang: 'en' | 'pl') => {
    await updateSettings({ language: lang })
    setLanguage(lang)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }

  const handleDeleteAll = async () => {
    if (!deletePassword) {
      setDeleteError(settings.language === 'pl' ? 'Wprowadź hasło' : 'Enter password')
      return
    }

    setDeleteError('')
    
    try {
      const result = await deleteAllFlights(deletePassword)
      
      if (result.success) {
        setIsDeleting(false)
        setDeletePassword('')
        onClose()
        // Page will refresh due to revalidatePath
      } else {
        setDeleteError(
          result.error === 'Incorrect password' 
            ? (settings.language === 'pl' ? 'Nieprawidłowe hasło' : 'Incorrect password')
            : (settings.language === 'pl' ? 'Nie udało się usunąć wpisów' : 'Failed to delete entries')
        )
      }
    } catch (err) {
      setDeleteError(settings.language === 'pl' ? 'Nie udało się usunąć wpisów' : 'Failed to delete entries')
    }
  }

  const cancelDelete = () => {
    setIsDeleting(false)
    setDeletePassword('')
    setDeleteError('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {settings.language === 'pl' ? 'Ustawienia' : 'Settings'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Appearance */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              {settings.language === 'pl' ? 'Wygląd' : 'Appearance'}
            </h4>
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  {theme === 'light' ? (
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {theme === 'light' 
                      ? (settings.language === 'pl' ? 'Tryb Jasny' : 'Light Mode')
                      : (settings.language === 'pl' ? 'Tryb Ciemny' : 'Dark Mode')
                    }
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {settings.language === 'pl' ? 'Przełącz motyw' : 'Toggle theme'}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                {settings.language === 'pl' ? 'Przełącz' : 'Toggle'}
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              {settings.language === 'pl' ? 'Preferencje' : 'Preferences'}
            </h4>
            <div className="space-y-4">
              {/* Language */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {settings.language === 'pl' ? 'Język' : 'Language'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {settings.language === 'en' ? 'English' : 'Polski'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      settings.language === 'en'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => handleLanguageChange('pl')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      settings.language === 'pl'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    PL
                  </button>
                </div>
              </div>

              {/* Rows per page */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {settings.language === 'pl' ? 'Wiersze na stronę' : 'Rows per page'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {rows} {settings.language === 'pl' ? 'wierszy' : 'rows'}
                    </p>
                  </div>
                </div>
                <input
                  type="number"
                  value={rows}
                  onChange={handleRowsChange}
                  min="1"
                  max="100"
                  className="w-20 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {settings.language === 'pl' ? 'Strefa Niebezpieczna' : 'Danger Zone'}
            </h4>
            <div className="p-4 rounded-lg border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 space-y-3">
              {!isDeleting ? (
                <div className="space-y-3">
                  <p className="font-bold text-red-900 dark:text-red-100 text-lg">
                    {settings.language === 'pl' ? 'Usuń wszystkie wpisy' : 'Delete all entries'}
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                    {settings.language === 'pl' ? 'Uwaga! To działanie jest nieodwracalne!' : 'Warning! This action is irreversible!'}
                  </p>
                  <button
                    onClick={() => setIsDeleting(true)}
                    className="w-full px-4 py-3 text-sm font-bold text-white bg-red-600 border border-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    {settings.language === 'pl' ? 'Usuń Wszystkie' : 'Delete All'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-red-900 dark:text-red-100">
                    {settings.language === 'pl' 
                      ? 'Wprowadź swoje hasło aby potwierdzić usunięcie wszystkich lotów'
                      : 'Enter your password to confirm deletion of all flights'}
                  </p>
                  <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDeleteAll()}
                    placeholder={settings.language === 'pl' ? 'Hasło' : 'Password'}
                    className="w-full px-3 py-2 border border-red-300 dark:border-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    autoFocus
                  />
                  {deleteError && (
                    <p className="text-sm text-red-700 dark:text-red-300 font-medium">{deleteError}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={cancelDelete}
                      className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                      {settings.language === 'pl' ? 'Anuluj' : 'Cancel'}
                    </button>
                    <button
                      onClick={handleDeleteAll}
                      disabled={!deletePassword}
                      className="flex-1 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {settings.language === 'pl' ? 'Potwierdź Usunięcie' : 'Confirm Delete'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
