'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Flight } from '@prisma/client'
import LogbookTable from '@/app/components/LogbookTable'
import AddEntryModal from '@/app/components/AddEntryModal'
import CSVImport from '@/app/components/CSVImport'
import SettingsModal from '@/app/components/SettingsModal'
import ChangelogModal from '@/app/components/ChangelogModal'
import ProfileModal from '@/app/components/ProfileModal'
import DeleteConfirmationModal from '@/app/components/DeleteConfirmationModal'
import { deleteFlight } from '@/app/lib/actions'
import { useUI } from '@/app/context/UIContext'
import { Download, Plus, Printer, HelpCircle, Megaphone, Menu, X } from 'lucide-react'

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
  const [isChangelogOpen, setIsChangelogOpen] = useState(false)
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null)
  const [isAddingFlight, setIsAddingFlight] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleDeleteClick = (id: string) => {
    setDeleteId(id)
  }

  const handleConfirmDelete = async () => {
    if (deleteId) {
      await deleteFlight(deleteId)
      setDeleteId(null)
    }
  }

  const handleExport = () => {
    window.location.href = '/api/export'
  }

  const handlePrint = () => {
    const params = new URLSearchParams()
    if (year) params.set('year', year.toString())
    window.open(`/print?${params.toString()}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-300">
      <div className="w-full space-y-6">
        <header className="sticky md:static top-0 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="w-full md:w-auto flex justify-between items-center">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  SimpleLogbook
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">EASA PART FCL.050 COMPLIANT</p>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setIsAddingFlight(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 whitespace-nowrap"
                title={t.addFlight}
              >
                <Plus size={16} />
                <span className="hidden sm:inline">{t.addFlight}</span>
              </button>
              <CSVImport />
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-800 whitespace-nowrap"
                title={t.exportCsv}
              >
                <Download size={16} />
                <span className="hidden sm:inline">{t.exportCsv}</span>
              </button>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
              
              <button
                onClick={handlePrint}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                title={t.printLogbook || 'Print Logbook'}
              >
                <Printer size={24} />
              </button>

              <button
                onClick={() => setIsChangelogOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                title={t.changelog}
              >
                <Megaphone size={24} />
              </button>

              <Link
                href="/help"
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                title={t.help.title}
              >
                <HelpCircle size={24} />
              </Link>

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
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3 animate-in slide-in-from-top-2 duration-200">
              
              {/* Add Flight - Full Width */}
              <button
                onClick={() => {
                  setIsAddingFlight(true)
                  setIsMobileMenuOpen(false)
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold text-sm shadow-sm"
              >
                <Plus size={18} />
                <span>{t.addFlight}</span>
              </button>

              {/* Import / Export - 50/50 */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <CSVImport />
                </div>
                <button
                  onClick={handleExport}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors font-semibold text-sm shadow-sm"
                >
                  <Download size={18} />
                  <span>{t.exportCsv}</span>
                </button>
              </div>

              {/* Grid Buttons */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={handlePrint}
                  className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Printer size={22} className="mb-1" />
                  <span className="text-[10px] font-medium text-center leading-tight">{t.printLogbook || 'Print'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsChangelogOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Megaphone size={22} className="mb-1" />
                  <span className="text-[10px] font-medium text-center leading-tight">{t.changelog}</span>
                </button>

                <Link
                  href="/help"
                  className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <HelpCircle size={22} className="mb-1" />
                  <span className="text-[10px] font-medium text-center leading-tight">{t.help.title}</span>
                </Link>

                <button
                  onClick={() => {
                    setIsSettingsOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[10px] font-medium text-center leading-tight">{t.settings}</span>
                </button>
              </div>

              {user && (
                <button
                  onClick={() => {
                    setIsProfileOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
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
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name || user.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">View Profile</p>
                  </div>
                </button>
              )}
            </div>
          )}
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
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      <AddEntryModal 
        isOpen={isAddingFlight} 
        onClose={() => setIsAddingFlight(false)} 
        hideTrigger
      />

      {editingFlight && (
        <AddEntryModal 
          isOpen={true} 
          onClose={() => setEditingFlight(null)} 
          initialData={editingFlight}
        />
      )}

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

      <DeleteConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />
    </main>
  )
}
