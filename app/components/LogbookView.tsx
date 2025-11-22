'use client'

import { useState, useMemo } from 'react'
import { Flight } from '@prisma/client'
import LogbookTable from '@/app/components/LogbookTable'
import AddEntryModal from '@/app/components/AddEntryModal'
import CSVImport from '@/app/components/CSVImport'
import SettingsModal from '@/app/components/SettingsModal'
import HelpModal from '@/app/components/HelpModal'
import ProfileModal from '@/app/components/ProfileModal'
import { deleteFlight } from '@/app/lib/actions'
import { useUI } from '@/app/context/UIContext'
import { Download } from 'lucide-react'

interface LogbookViewProps {
  flights: Flight[]
  page: number
  totalPages: number
  pageTotals: any
  previousTotals: any
  lifetimeTotals: any
  rowsPerPage: number
  year?: number
}

export default function LogbookView({
  flights,
  page,
  totalPages,
  pageTotals,
  previousTotals,
  lifetimeTotals,
  rowsPerPage,
  year
}: LogbookViewProps) {
  const { user, t } = useUI()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null)

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this flight?')) {
      await deleteFlight(id)
    }
  }

  const handleExport = () => {
    window.location.href = '/api/export'
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-300">
      <div className="w-full space-y-6">
        <header className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              SimpleLogbook
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">EASA PART FCL.050 COMPLIANT</p>
          </div>
          
          <div className="flex items-center gap-4">
            <AddEntryModal />
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
              title={t.importCsv} // Reusing importCsv label or adding new one? Let's use a generic one or add exportCsv
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <CSVImport />
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
            <HelpModal />
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
              title="Settings"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {user?.role === 'ADMIN' && (
              <a
                href="/admin"
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
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
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                title="Profile"
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
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
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <LogbookTable 
            flights={flights}
            page={page}
            totalPages={totalPages}
            pageTotals={pageTotals}
            previousTotals={previousTotals}
            lifetimeTotals={lifetimeTotals}
            rowsPerPage={rowsPerPage}
            onEdit={setEditingFlight}
            onDelete={handleDelete}
          />
        </div>
      </div>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
      
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
      
      <AddEntryModal
        isOpen={!!editingFlight}
        onClose={() => setEditingFlight(null)}
        initialData={editingFlight}
      />
    </main>
  )
}
