'use client'

import { GliderFlight } from '@prisma/client'
import { formatTime } from '@/app/lib/utils'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useUI } from '@/app/context/UIContext'
import { Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface GliderLogbookTableProps {
  flights: GliderFlight[]
  page: number
  totalPages: number
  pageTotals: { totalTime: number; launches: number; picTime: number; dualTime: number; instructorTime: number }
  previousTotals: { totalTime: number; launches: number; picTime: number; dualTime: number; instructorTime: number }
  lifetimeTotals: { totalTime: number | null; launches: number | null }
  rowsPerPage: number
  onEdit?: (flight: GliderFlight) => void
  onDelete?: (id: string) => void
}

function MobileGliderCard({ flight, onEdit, onDelete, t }: { flight: GliderFlight, onEdit?: (f: GliderFlight) => void, onDelete?: (id: string) => void, t: any }) {
  const [showDetails, setShowDetails] = useState(false)

  const getLaunchMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      'WINCH': t.launchWinch || 'Winch',
      'AEROTOW': t.launchAerotow || 'Aerotow',
      'SELF': t.launchSelf || 'Self-launch',
      'GRAVITY': t.launchGravity || 'Gravity',
      'BUNGEE': t.launchBungee || 'Bungee',
      'AUTOTOW': t.launchAutotow || 'Autotow',
    }
    return labels[method] || method
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-bold text-gray-900 dark:text-white">{flight.date ? new Date(flight.date).toLocaleDateString('en-CA').replace(/-/g, '.') : '-'}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{flight.gliderModel} ({flight.gliderReg})</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-blue-600 dark:text-blue-500">{formatTime(flight.totalTime)}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{getLaunchMethodLabel(flight.launchMethod)}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
          <span className="text-gray-500 dark:text-gray-400 block">{t.departure}</span>
          <span className="text-gray-900 dark:text-white">{flight.departurePlace} ({flight.departureTime})</span>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
          <span className="text-gray-500 dark:text-gray-400 block">{t.arrival}</span>
          <span className="text-gray-900 dark:text-white">{flight.arrivalPlace} ({flight.arrivalTime})</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-xs text-center">
        <div className="bg-gray-50 dark:bg-gray-700 p-1 rounded">
          <span className="block text-gray-500 dark:text-gray-400 text-[10px]">{t.launches}</span>
          <span className="text-gray-900 dark:text-white">{flight.launches}</span>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-1 rounded">
          <span className="block text-gray-500 dark:text-gray-400 text-[10px]">PIC</span>
          <span className="text-gray-900 dark:text-white">{formatTime((flight as any).picTime || 0)}</span>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-1 rounded">
          <span className="block text-gray-500 dark:text-gray-400 text-[10px]">{t.dualTimeGlider || 'Dual'}</span>
          <span className="text-gray-900 dark:text-white">{formatTime((flight as any).dualTime || 0)}</span>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-1 rounded">
          <span className="block text-gray-500 dark:text-gray-400 text-[10px]">{t.instructorTimeGlider || 'Instr'}</span>
          <span className="text-gray-900 dark:text-white">{formatTime((flight as any).instructorTime || 0)}</span>
        </div>
      </div>

      {showDetails && (
        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700 animate-in slide-in-from-top-1">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
              <span className="text-gray-500 dark:text-gray-400 block">{t.picName}</span>
              <span className="text-gray-900 dark:text-white">{flight.picName}</span>
            </div>
            {(flight as any).distance && (
              <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <span className="text-gray-500 dark:text-gray-400 block">{t.distance || 'Distance'}</span>
                <span className="text-gray-900 dark:text-white">{(flight as any).distance} km</span>
              </div>
            )}
          </div>
          {flight.remarks && (
            <div className="text-xs text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-700 p-2 rounded">
              "{flight.remarks}"
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
          <button onClick={() => onEdit?.(flight)} className="p-1 text-blue-600 hover:bg-blue-50 rounded dark:text-blue-400 dark:hover:bg-gray-700"><Edit2 size={16} /></button>
          <button onClick={() => onDelete?.(flight.id)} className="p-1 text-red-600 hover:bg-red-50 rounded dark:text-red-400 dark:hover:bg-gray-700"><Trash2 size={16} /></button>
        </div>
      </div>
    </div>
  )
}

export default function GliderLogbookTable({ 
  flights, 
  page, 
  totalPages, 
  pageTotals, 
  previousTotals, 
  lifetimeTotals,
  rowsPerPage,
  onEdit,
  onDelete
}: GliderLogbookTableProps) {
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

  const filledFlights = [...flights]
  while (filledFlights.length < rowsPerPage) {
    filledFlights.push({ id: `empty-${filledFlights.length}` } as GliderFlight)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const getLaunchMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      'WINCH': t.launchWinch || 'Winch',
      'AEROTOW': t.launchAerotow || 'Aerotow',
      'SELF': t.launchSelf || 'Self-launch',
      'GRAVITY': t.launchGravity || 'Gravity',
      'BUNGEE': t.launchBungee || 'Bungee',
      'AUTOTOW': t.launchAutotow || 'Autotow',
    }
    return labels[method] || method
  }

  // Calculate page totals for pilot function times
  const calculatedPageTotals = flights.reduce((acc, f) => ({
    totalTime: acc.totalTime + (f.totalTime || 0),
    launches: acc.launches + (f.launches || 0),
    picTime: acc.picTime + ((f as any).picTime || 0),
    dualTime: acc.dualTime + ((f as any).dualTime || 0),
    instructorTime: acc.instructorTime + ((f as any).instructorTime || 0),
  }), { totalTime: 0, launches: 0, picTime: 0, dualTime: 0, instructorTime: 0 })

  return (
    <div className="w-full space-y-4">
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filledFlights.filter(f => f.id && !f.id.startsWith('empty')).map((flight) => (
          <MobileGliderCard key={flight.id} flight={flight} onEdit={onEdit} onDelete={onDelete} t={t} />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="w-full text-xs text-left border-collapse text-gray-500 dark:text-gray-400" style={{ minWidth: '1400px' }}>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
            <tr>
              <th rowSpan={2} className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[100px]">{t.date}</th>
              <th colSpan={2} className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[250px]">{t.departure}</th>
              <th colSpan={2} className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[250px]">{t.arrival}</th>
              <th colSpan={2} className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[300px]">{t.glider}</th>
              <th rowSpan={2} className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[100px]">{t.launchMethod}</th>
              <th rowSpan={2} className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[100px]">{t.landings}</th>
              <th rowSpan={2} className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[100px]">{t.totalTime}</th>
              <th rowSpan={2} className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[150px]">{t.picName}</th>
              <th colSpan={3} className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[300px]">{t.pilotFunctionTime || t.pilotFunction}</th>
              <th rowSpan={2} className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[100px]">{t.distance}</th>
              <th rowSpan={2} className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[250px]">{t.remarksTask || t.remarks}</th>
              <th rowSpan={2} className="p-3 border border-gray-200 dark:border-gray-600 font-semibold min-w-[100px]">{t.actions}</th>
            </tr>
            <tr>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium min-w-[150px]">{t.place}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium min-w-[100px]">{t.time}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium min-w-[150px]">{t.place}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium min-w-[100px]">{t.time}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium min-w-[200px]">{t.model}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium min-w-[100px]">{t.reg}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium min-w-[100px]">{t.pic}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium min-w-[100px]">{t.dualTimeGlider || 'DUAL'}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium min-w-[100px]">{t.instructorTimeGlider || 'INSTR'}</th>
            </tr>
          </thead>
          <tbody>
            {filledFlights.map((flight, index) => (
              <tr key={flight.id} className={`border-b border-gray-200 dark:border-gray-700 h-10 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'} hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors`}>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.date ? new Date(flight.date).toLocaleDateString('en-CA').replace(/-/g, '.') : ''}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.departurePlace}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.departureTime}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.arrivalPlace}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.arrivalTime}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.gliderModel}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.gliderReg}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.launchMethod ? getLaunchMethodLabel(flight.launchMethod) : ''}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{flight.launches || ''}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white text-right">{formatTime(flight.totalTime)}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-left pl-3">{flight.picName}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{formatTime((flight as any).picTime || 0)}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{formatTime((flight as any).dualTime || 0)}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{formatTime((flight as any).instructorTime || 0)}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{(flight as any).distance || ''}</td>
                <td className="p-2 text-gray-500 dark:text-gray-400 truncate max-w-[150px] border-r border-gray-200 dark:border-gray-700">{flight.remarks}</td>
                <td className="p-2 text-center">
                  {!flight.id.startsWith('empty') && (
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => onEdit?.(flight)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400"><Edit2 size={14} /></button>
                      <button onClick={() => onDelete?.(flight.id)} className="text-red-600 hover:text-red-800 dark:text-red-400"><Trash2 size={14} /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            
            {/* Page Totals */}
            <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-gray-900 dark:text-white h-10 border-t-2 border-gray-300 dark:border-gray-500">
              <td colSpan={9} className="p-2 border-r border-gray-300 dark:border-gray-600 text-center">{t.totalThisPage}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right font-bold">{formatTime(calculatedPageTotals.totalTime)}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600"></td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right">{formatTime(calculatedPageTotals.picTime)}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right">{formatTime(calculatedPageTotals.dualTime)}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right">{formatTime(calculatedPageTotals.instructorTime)}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600"></td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600"></td>
              <td className="p-2"></td>
            </tr>

            {/* Previous Totals */}
            <tr className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 h-10">
              <td colSpan={9} className="p-2 border-r border-gray-200 dark:border-gray-700 text-center">{t.totalPreviousPages}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.totalTime)}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700"></td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.picTime || 0)}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.dualTime || 0)}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.instructorTime || 0)}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700"></td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700"></td>
              <td className="p-2"></td>
            </tr>

            {/* Grand Totals */}
            <tr className="bg-gray-200 dark:bg-gray-900 font-bold text-gray-900 dark:text-white h-12 border-t-2 border-gray-400 dark:border-gray-500">
              <td colSpan={9} className="p-2 border-r border-gray-400 dark:border-gray-600 text-center">{t.totalLifetime}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{formatTime(previousTotals.totalTime + calculatedPageTotals.totalTime)}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600"></td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{formatTime((previousTotals.picTime || 0) + calculatedPageTotals.picTime)}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{formatTime((previousTotals.dualTime || 0) + calculatedPageTotals.dualTime)}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{formatTime((previousTotals.instructorTime || 0) + calculatedPageTotals.instructorTime)}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600"></td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600"></td>
              <td className="p-2"></td>
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
