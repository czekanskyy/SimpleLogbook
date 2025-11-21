'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language } from '@/app/lib/i18n'
import { Settings } from '@prisma/client'

export interface UserProfile {
  name?: string | null
  email?: string | null
  image?: string | null
  avatarColor?: string | null
  role?: string
}

interface UIContextType {
  language: Language
  setLanguage: (lang: Language) => void
  theme: 'light' | 'dark'
  toggleTheme: () => void
  t: typeof translations['pl']
  user?: UserProfile
  settings: Settings
}

const UIContext = createContext<UIContextType | undefined>(undefined)

interface UIProviderProps {
  children: ReactNode
  initialSettings?: Settings | null
  user?: UserProfile
}

export function UIProvider({ children, initialSettings, user }: UIProviderProps) {
  const defaultSettings: Settings = {
    id: 'default',
    userId: 'guest',
    language: 'pl',
    rowsPerPage: 14,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const [settings, setSettings] = useState<Settings>(initialSettings || defaultSettings)
  const [language, setLanguageState] = useState<Language>((initialSettings?.language as Language) || 'pl')
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings)
      setLanguageState(initialSettings.language as Language)
    } else {
        const storedLang = localStorage.getItem('language') as Language
        if (storedLang) {
            setLanguageState(storedLang)
            setSettings(prev => ({ ...prev, language: storedLang }))
        }
    }

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
  }, [initialSettings])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setSettings(prev => ({ ...prev, language: lang }))
    if (!user) {
        localStorage.setItem('language', lang)
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const t = translations[language]

  return (
    <UIContext.Provider value={{ language, setLanguage, theme, toggleTheme, t, user, settings }}>
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
