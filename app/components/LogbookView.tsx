'use client'

import { Flight } from '@prisma/client'
import LogbookTable from '@/app/components/LogbookTable'
import AddEntryModal from '@/app/components/AddEntryModal'
import CSVImport from '@/app/components/CSVImport'
import SettingsModal from '@/app/components/SettingsModal'
import HelpModal from '@/app/components/HelpModal'
import { useUI } from '@/app/context/UIContext'

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
  const { t } = useUI()

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              SimpleLogbook
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">EASA PART FCL.050 COMPLIANT</p>
          </div>
          
          <div className="flex items-center gap-4">
            <AddEntryModal />
            <CSVImport />
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
            <HelpModal />
            <SettingsModal rowsPerPage={rowsPerPage} />
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
          />
        </div>
      </div>
    </main>
  )
}
