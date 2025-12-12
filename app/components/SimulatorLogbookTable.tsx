'use client'

import { SimulatorSession } from '@prisma/client'
import { formatTime } from '@/app/lib/utils'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useUI } from '@/app/context/UIContext'
import { Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface SimulatorLogbookTableProps {
  sessions: SimulatorSession[]
  page: number
  totalPages: number
  pageTotals: { totalTime: number }
  previousTotals: { totalTime: number }
  lifetimeTotals: { totalTime: number | null }
  rowsPerPage: number
  onEdit?: (session: SimulatorSession) => void
  onDelete?: (id: string) => void
}

function MobileSimulatorCard({ session, onEdit, onDelete, t }: { session: SimulatorSession, onEdit?: (s: SimulatorSession) => void, onDelete?: (id: string) => void, t: any }) {
  const [showDetails, setShowDetails] = useState(false)

  const getFstdTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'FFS': 'FFS',
      'FNPT_I': 'FNPT I',
      'FNPT_II': 'FNPT II',
      'FTD': 'FTD',
      'BITD': 'BITD',
    }
    return labels[type] || type
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-bold text-gray-900 dark:text-white">{session.date ? new Date(session.date).toLocaleDateString('en-CA').replace(/-/g, '.') : '-'}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{getFstdTypeLabel(session.fstdType)}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-blue-600 dark:text-blue-500">{formatTime(session.totalTime)}</div>
        </div>
      </div>
      
      {session.exercise && (
        <div className="text-xs bg-gray-50 dark:bg-gray-700 p-2 rounded">
          <span className="text-gray-500 dark:text-gray-400">{t.exercise}: </span>
          <span className="text-gray-900 dark:text-white">{session.exercise}</span>
        </div>
      )}

      {showDetails && (
        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700 animate-in slide-in-from-top-1">
          {session.remarks && (
            <div className="text-xs text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-700 p-2 rounded">
              "{session.remarks}"
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {showDetails ? <><ChevronUp size={14} /> Hide</> : <><ChevronDown size={14} /> Details</>}
        </button>
        <div className="flex gap-2">
          <button onClick={() => onEdit?.(session)} className="p-1 text-blue-600 hover:bg-blue-50 rounded dark:text-blue-400 dark:hover:bg-gray-700"><Edit2 size={16} /></button>
          <button onClick={() => onDelete?.(session.id)} className="p-1 text-red-600 hover:bg-red-50 rounded dark:text-red-400 dark:hover:bg-gray-700"><Trash2 size={16} /></button>
        </div>
      </div>
    </div>
  )
}

export default function SimulatorLogbookTable({ 
  sessions, 
  page, 
  totalPages, 
  pageTotals, 
  previousTotals, 
  lifetimeTotals,
  rowsPerPage,
  onEdit,
  onDelete
}: SimulatorLogbookTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { t } = useUI()
  const [jumpPage, setJumpPage] = useState('')

  const handleJumpPage = (e: React.FormEvent) => {
    e.preventDefault()
    const p = parseInt(jumpPage)
    if (p >= 1 && p <= totalPages) {
      handlePageChange(p)
      setJumpPage('')
    }
  }

  const filledSessions = [...sessions]
  while (filledSessions.length < rowsPerPage) {
    filledSessions.push({ id: `empty-${filledSessions.length}` } as SimulatorSession)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const getFstdTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'FFS': 'FFS',
      'FNPT_I': 'FNPT I',
      'FNPT_II': 'FNPT II',
      'FTD': 'FTD',
      'BITD': 'BITD',
    }
    return labels[type] || type
  }

  // Calculate page totals (excluding sessions marked as excludeFromTotal)
  const calculatedPageTotals = sessions.reduce((acc, s) => {
    if ((s as any).excludeFromTotal) {
      return acc
    }
    return {
      totalTime: acc.totalTime + (s.totalTime || 0),
    }
  }, { totalTime: 0 })

  return (
    <div className="w-full space-y-4">
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filledSessions.filter(s => s.id && !s.id.startsWith('empty')).map((session) => (
          <MobileSimulatorCard key={session.id} session={session} onEdit={onEdit} onDelete={onDelete} t={t} />
        ))}
      </div>

      {/* Desktop Table View - Simplified layout as requested */}
      <div className="hidden md:block w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="w-full text-xs text-left border-collapse text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
            <tr>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[100px]">{t.date}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[300px]">{t.fstdType}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[300px]">{t.exercise}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[100px]">{t.sessionTime}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[250px]">{t.exerciseRemarks || t.remarks}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[100px]">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filledSessions.map((session, index) => {
              const isExcluded = (session as any).excludeFromTotal || false
              const textColor = isExcluded 
                ? 'text-gray-400 dark:text-gray-500' 
                : 'text-gray-900 dark:text-white'
              
              return (
              <tr key={session.id} className={`border-b border-gray-200 dark:border-gray-700 h-10 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'} hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors`}>
                <td className={`p-2 border-r border-gray-200 dark:border-gray-700 ${textColor} text-center`}>{session.date ? new Date(session.date).toLocaleDateString('en-CA').replace(/-/g, '.') : ''}</td>
                <td className={`p-2 border-r border-gray-200 dark:border-gray-700 ${textColor} text-center`}>{session.fstdType ? getFstdTypeLabel(session.fstdType) : ''}</td>
                <td className={`p-2 border-r border-gray-200 dark:border-gray-700 ${textColor}`}>{session.exercise || ''}</td>
                <td className={`p-2 border-r border-gray-200 dark:border-gray-700 font-bold ${textColor} text-right`}>{formatTime(session.totalTime)}</td>
                <td className={`p-2 ${isExcluded ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'} truncate max-w-[200px] border-r border-gray-200 dark:border-gray-700`}>{session.remarks}</td>
                <td className="p-2 text-center">
                  {!session.id.startsWith('empty') && (
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => onEdit?.(session)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400"><Edit2 size={14} /></button>
                      <button onClick={() => onDelete?.(session.id)} className="text-red-600 hover:text-red-800 dark:text-red-400"><Trash2 size={14} /></button>
                    </div>
                  )}
                </td>
              </tr>
            )})}
            
            {/* Page Totals */}
            <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-gray-900 dark:text-white h-10 border-t-2 border-gray-300 dark:border-gray-500">
              <td colSpan={3} className="p-2 border-r border-gray-300 dark:border-gray-600 text-center">{t.totalThisPage}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right font-bold">{formatTime(calculatedPageTotals.totalTime)}</td>
              <td colSpan={2} className="p-2"></td>
            </tr>

            {/* Previous Totals */}
            <tr className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 h-10">
              <td colSpan={3} className="p-2 border-r border-gray-200 dark:border-gray-700 text-center">{t.totalPreviousPages}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.totalTime)}</td>
              <td colSpan={2} className="p-2"></td>
            </tr>

            {/* Grand Totals */}
            <tr className="bg-gray-200 dark:bg-gray-900 font-bold text-gray-900 dark:text-white h-12 border-t-2 border-gray-400 dark:border-gray-500">
              <td colSpan={3} className="p-2 border-r border-gray-400 dark:border-gray-600 text-center">{t.totalLifetime}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{formatTime(previousTotals.totalTime + calculatedPageTotals.totalTime)}</td>
              <td colSpan={2} className="p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <button 
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          {t.previous}
        </button>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700 dark:text-gray-300">{t.page} {page} {t.of} {totalPages || 1}</span>
          <form onSubmit={handleJumpPage} className="flex items-center gap-2">
            <input 
              type="number" min="1" max={totalPages} value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              placeholder="#"
              className="w-12 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
            />
            <button type="submit" className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600">{t.go}</button>
          </form>
        </div>

        <button 
          disabled={page >= totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          {t.next}
        </button>
      </div>
    </div>
  )
}
