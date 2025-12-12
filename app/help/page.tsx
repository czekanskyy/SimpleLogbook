'use client'

import { useState } from 'react'
import { useUI } from '@/app/context/UIContext'
import { ArrowLeft, Book, Info, FileText, Scale, Menu, X, ChevronRight, Printer, Megaphone, HelpCircle, Settings, Plus, Download, Upload, Github, Plane, Sailboat, Monitor, User } from 'lucide-react'
import Link from 'next/link'

type Section = 'intro' | 'guide' | 'fields' | 'terms' | 'easa' | 'interface' | 'about'
type LogbookTab = 'aircraft' | 'glider' | 'simulator'

// Sub-tab component for selecting logbook type
function LogbookSubTabs({ activeTab, onTabChange, t }: { activeTab: LogbookTab, onTabChange: (tab: LogbookTab) => void, t: any }) {
  const tabs = [
    { id: 'aircraft', label: t.tabAircraft || 'Samolot', icon: Plane },
    { id: 'glider', label: t.tabGlider || 'Szybowiec', icon: Sailboat },
    { id: 'simulator', label: t.tabSimulator || 'Symulator', icon: Monitor },
  ]

  return (
    <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as LogbookTab)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
              ${isActive 
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
          >
            <Icon size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function HelpPage() {
  const { t } = useUI()
  const [activeSection, setActiveSection] = useState<Section>('intro')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [csvTab, setCsvTab] = useState<LogbookTab>('aircraft')
  const [fieldsTab, setFieldsTab] = useState<LogbookTab>('aircraft')
  const [easaTab, setEasaTab] = useState<LogbookTab>('aircraft')

  const sections = [
    { id: 'intro', icon: Info, label: t.help.nav.intro },
    { id: 'guide', icon: Book, label: t.help.nav.guide },
    { id: 'interface', icon: Settings, label: t.help.nav.interface },
    { id: 'fields', icon: FileText, label: t.help.nav.fields },
    { id: 'terms', icon: FileText, label: t.help.nav.terms },
    { id: 'easa', icon: Scale, label: t.help.nav.easa },
    { id: 'about', icon: Info, label: t.help.nav.about },
  ]

  const getIcon = (name: string) => {
    switch (name) {
      case 'Printer': return Printer
      case 'Megaphone': return Megaphone
      case 'HelpCircle': return HelpCircle
      case 'Settings': return Settings
      case 'Plus': return Plus
      case 'Download': return Download
      case 'Upload': return Upload
			case 'User': return User
      default: return Info
    }
  }

  // Helper to get CSV fields for a logbook type
  const getCsvFields = (tab: LogbookTab) => {
    const csv = t.help.guide.csv as any
    switch (tab) {
      case 'aircraft': return csv.aircraft?.fields || csv.fields || []
      case 'glider': return csv.glider?.fields || []
      case 'simulator': return csv.simulator?.fields || []
    }
  }

  const getCsvExample = (tab: LogbookTab) => {
    const csv = t.help.guide.csv as any
    switch (tab) {
      case 'aircraft': return csv.aircraft?.example || csv.example || ''
      case 'glider': return csv.glider?.example || ''
      case 'simulator': return csv.simulator?.example || ''
    }
  }

  // Helper to get field descriptions for a logbook type
  const getFieldDescriptions = (tab: LogbookTab) => {
    const fields = t.help.fields as any
    switch (tab) {
      case 'aircraft': return fields.aircraft || {}
      case 'glider': return fields.glider || {}
      case 'simulator': return fields.simulator || {}
    }
  }

  // Helper to get EASA regulations for a logbook type
  const getEasaRegulations = (tab: LogbookTab) => {
    const easa = t.help.easa as any
    switch (tab) {
      case 'aircraft': return easa.aircraft?.regulations || easa.regulations || []
      case 'glider': return easa.glider?.regulations || []
      case 'simulator': return easa.simulator?.regulations || []
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'intro':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t.help.intro.title}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.help.intro.desc}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {t.help.intro.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )
      case 'guide':
        return (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t.help.guide.title}</h2>
            
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{t.help.guide.addFlight.title}</h3>
              <ul className="space-y-3">
                {t.help.guide.addFlight.steps.map((step: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="border-t border-gray-200 dark:border-gray-700 my-6" />

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{t.help.guide.editDelete.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t.help.guide.editDelete.desc}
              </p>
            </section>

            <div className="border-t border-gray-200 dark:border-gray-700 my-6" />

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{t.help.guide.csv.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t.help.guide.csv.desc}
              </p>
              
              <LogbookSubTabs activeTab={csvTab} onTabChange={setCsvTab} t={t} />
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">{t.help.guide.csv.headerName || 'Field Name'}</th>
                      <th scope="col" className="px-6 py-3">{t.help.guide.csv.headerHeaders || 'Accepted Headers'}</th>
                      <th scope="col" className="px-6 py-3">{t.help.guide.csv.headerDesc || 'Description'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCsvFields(csvTab).map((field: any, index: number) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {field.name}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-blue-600 dark:text-blue-400">
                          {field.headers}
                        </td>
                        <td className="px-6 py-4">
                          {field.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {getCsvExample(csvTab) && (
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <p className="text-xs text-gray-400 mb-2 uppercase font-bold">{t.help.guide.csv.exampleLabel || 'Example CSV Content:'}</p>
                  <pre className="font-mono text-sm whitespace-pre">{getCsvExample(csvTab)}</pre>
                </div>
              )}
            </section>
          </div>
        )
      case 'interface':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t.help.interface.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {t.help.interface.buttons.map((btn: any, index: number) => {
                const Icon = getIcon(btn.icon)
                return (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">{btn.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{btn.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      case 'fields':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t.help.fields.title}</h2>
            
            <LogbookSubTabs activeTab={fieldsTab} onTabChange={setFieldsTab} t={t} />
            
            <div className="grid gap-4">
              {Object.entries(getFieldDescriptions(fieldsTab)).map(([key, value]) => {
                if (key === 'title') return null
                return (
                  <div key={key} className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase mb-1">{key}</h4>
                    <p className="text-gray-700 dark:text-gray-300">{value as string}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )
      case 'terms':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t.help.terms.title}</h2>
            <div className="space-y-4">
              {t.help.terms.items.map((item: any, index: number) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="sm:w-32 shrink-0">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-sm">
                      {item.term}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{item.def}</p>
                </div>
              ))}
            </div>
          </div>
        )
      case 'easa':
        return (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t.help.easa.title}</h2>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {t.help.easa.intro}
            </p>

            <LogbookSubTabs activeTab={easaTab} onTabChange={setEasaTab} t={t} />

            <div className="space-y-8">
              {getEasaRegulations(easaTab).map((reg: any, index: number) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{reg.title}</h3>
                  <div className="pl-4 border-l-4 border-gray-300 dark:border-gray-600 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-r-lg">
                    "{reg.text}"
                  </div>
                  {reg.comment && (
                    <div className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                      <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
                      <span>{reg.comment}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      case 'about':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t.help.about.title}</h2>
            
            <div className="bg-white/50 dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 text-center space-y-6">
              <div className="flex justify-center">
                <img src="/favicon.ico" alt="eLogbook Logo" className="w-20 h-20 rounded-xl shadow-lg" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">eLogbook</h3>
                <p className="text-gray-500 dark:text-gray-400">{t.help.about.version}</p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <p className="text-gray-700 dark:text-gray-300 font-medium">{t.help.about.author}</p>
                
                <a 
                  href="mailto:contact@czekanski.dev"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {t.help.about.email}
                </a>

                <a 
                  href="https://github.com/czekanskyy/SimpleLogbook" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Github size={18} />
                  GitHub Repository
                </a>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                  {t.help.about.disclaimer}
                </p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => window.history.back()} className="p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">{t.help.title}</h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-10 h-[calc(100vh-65px)] md:h-screen w-full md:w-80 
        bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300 ease-in-out md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          <div className="hidden md:flex items-center gap-3 mb-8">
            <button onClick={() => window.history.back()} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.help.title}</h1>
          </div>

          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id as Section)
                    setIsSidebarOpen(false)
                  }}
                  className={`
                    w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-800' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'} />
                    <span className="font-medium">{section.label}</span>
                  </div>
                  {isActive && <ChevronRight size={16} />}
                </button>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto h-[calc(100vh-65px)] md:h-screen scroll-smooth">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
