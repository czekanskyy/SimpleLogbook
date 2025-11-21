'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language } from '@/app/lib/i18n'

interface UIContextType {
  language: Language
  setLanguage: (lang: Language) => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
  t: typeof translations['pl']
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pl')
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load from localStorage
    const storedLang = localStorage.getItem('language') as Language
    if (storedLang) setLanguageState(storedLang)

    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (storedTheme) {
      setThemeState(storedTheme)
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
       setThemeState('dark')
       document.documentElement.classList.add('dark')
    }
    
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    console.log('Toggling theme to:', newTheme)
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
      console.log('Added dark class')
    } else {
      document.documentElement.classList.remove('dark')
      console.log('Removed dark class')
    }
  }

  const t = translations[language]

  return (
    <UIContext.Provider value={{ language, setLanguage, theme, toggleTheme, t }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}
