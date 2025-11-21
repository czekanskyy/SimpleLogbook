'use client'

import { Flight } from '@prisma/client'
import { formatTime } from '@/app/lib/utils'
import { useSearchParams, useRouter } from 'next/navigation'
import { useUI } from '@/app/context/UIContext'

interface LogbookTableProps {
  flights: Flight[]
  page: number
  totalPages: number
  pageTotals: any
  previousTotals: any
  lifetimeTotals: any
  rowsPerPage: number
}

export default function LogbookTable({ 
  flights, 
  page, 
  totalPages, 
  pageTotals, 
  previousTotals, 
  lifetimeTotals,
  rowsPerPage
}: LogbookTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useUI()

  // Fill up to rowsPerPage rows
  const filledFlights = [...flights]
  while (filledFlights.length < rowsPerPage) {
    filledFlights.push({ id: `empty-${filledFlights.length}` } as Flight)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="w-full space-y-4">
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filledFlights.filter(f => f.id && !f.id.startsWith('empty')).map((flight) => (
          <div key={flight.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">{flight.date ? new Date(flight.date).toLocaleDateString('en-GB') : '-'}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{flight.aircraftModel} ({flight.aircraftReg})</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-blue-600 dark:text-blue-500">{formatTime(flight.totalTime)}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{flight.picName}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <span className="text-gray-500 dark:text-gray-400 block">Route</span>
                <span className="text-gray-900 dark:text-white">{flight.departurePlace} → {flight.arrivalPlace}</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <span className="text-gray-500 dark:text-gray-400 block">Times</span>
                <span className="text-gray-900 dark:text-white">{flight.departureTime} - {flight.arrivalTime}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs text-center">
               <div className="bg-gray-50 dark:bg-gray-700 p-1 rounded">
                 <span className="block text-gray-500 dark:text-gray-400 text-[10px]">PIC</span>
                 <span className="text-gray-900 dark:text-white">{formatTime(flight.picTime)}</span>
               </div>
               <div className="bg-gray-50 dark:bg-gray-700 p-1 rounded">
                 <span className="block text-gray-500 dark:text-gray-400 text-[10px]">Dual</span>
                 <span className="text-gray-900 dark:text-white">{formatTime(flight.dualTime)}</span>
               </div>
               <div className="bg-gray-50 dark:bg-gray-700 p-1 rounded">
                 <span className="block text-gray-500 dark:text-gray-400 text-[10px]">Ldg</span>
                 <span className="text-gray-900 dark:text-white">{flight.landingsDay}/{flight.landingsNight}</span>
               </div>
            </div>
            
            {flight.remarks && (
              <div className="text-xs text-gray-500 dark:text-gray-400 italic border-t border-gray-200 dark:border-gray-700 pt-2">
                "{flight.remarks}"
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="min-w-full text-xs text-left border-collapse text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
            <tr>
              <th className="p-4 border border-gray-200 dark:border-gray-600 font-semibold align-middle whitespace-nowrap" rowSpan={3}>{t.date}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-semibold align-middle whitespace-nowrap" colSpan={2}>{t.departure}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-semibold align-middle whitespace-nowrap" colSpan={2}>{t.arrival}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-semibold align-middle whitespace-nowrap" colSpan={2}>{t.aircraft}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-semibold align-middle whitespace-nowrap" colSpan={3}>{t.singlePilotTime}</th>
              <th className="p-4 border border-gray-200 dark:border-gray-600 font-semibold align-middle whitespace-nowrap" rowSpan={3}>{t.totalTime}</th>
              <th className="p-4 border border-gray-200 dark:border-gray-600 font-semibold align-middle whitespace-nowrap" rowSpan={3}>{t.picName}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-semibold align-middle whitespace-nowrap" colSpan={2}>{t.landings}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-semibold align-middle whitespace-nowrap" colSpan={2}>{t.operationalCondition}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-semibold align-middle whitespace-nowrap" colSpan={4}>{t.pilotFunctionTime}</th>
              <th className="p-4 border border-gray-200 dark:border-gray-600 font-semibold align-middle whitespace-nowrap" rowSpan={3}>{t.remarks}</th>
            </tr>
            <tr>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.place}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.time}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.place}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.time}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.model}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.reg}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" colSpan={2}>{t.singlePilot}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.multiPilot}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.day}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.night}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.night}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.ifr}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.pic}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.cop}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.dual}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap" rowSpan={2}>{t.instr}</th>
            </tr>
            <tr>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap">{t.se}</th>
              <th className="p-3 border border-gray-200 dark:border-gray-600 font-medium whitespace-nowrap">{t.me}</th>
            </tr>
          </thead>
          <tbody>
            {filledFlights.map((flight, index) => (
              <tr key={flight.id} className={`border-b border-gray-200 dark:border-gray-700 h-10 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'} hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors`}>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.date ? new Date(flight.date).toLocaleDateString('en-GB') : ''}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.departurePlace}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.departureTime}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.arrivalPlace}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.arrivalTime}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.aircraftModel}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-center">{flight.aircraftReg}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{formatTime(flight.singlePilotSE)}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{formatTime(flight.singlePilotME)}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{formatTime(flight.multiPilot)}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 font-bold text-blue-600 dark:text-blue-500 text-right">{formatTime(flight.totalTime)}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-left pl-3">{flight.picName}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{flight.landingsDay || ''}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{flight.landingsNight || ''}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{formatTime(flight.nightTime)}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{formatTime(flight.ifrTime)}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{formatTime(flight.picTime)}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{formatTime(flight.copilotTime)}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{formatTime(flight.dualTime)}</td>
                <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-right">{formatTime(flight.instructorTime)}</td>
                <td className="p-2 text-gray-500 dark:text-gray-400 truncate max-w-[150px]">{flight.remarks}</td>
              </tr>
            ))}
            
            {/* Page Totals */}
            <tr className="bg-gray-100 dark:bg-gray-700 font-semibold text-gray-900 dark:text-white h-10 border-t-2 border-gray-300 dark:border-gray-500">
              <td colSpan={7} className="p-2 border-r border-gray-300 dark:border-gray-600 text-center">{t.totalThisPage}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right">{formatTime(pageTotals.singlePilotSE)}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right">{formatTime(pageTotals.singlePilotME)}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right">{formatTime(pageTotals.multiPilot)}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 text-right">{formatTime(pageTotals.totalTime)}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600"></td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right">{pageTotals.landingsDay}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right">{pageTotals.landingsNight}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right">{formatTime(pageTotals.nightTime)}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right">{formatTime(pageTotals.ifrTime)}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right">{formatTime(pageTotals.picTime)}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right">{formatTime(pageTotals.copilotTime)}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right">{formatTime(pageTotals.dualTime)}</td>
              <td className="p-2 border-r border-gray-300 dark:border-gray-600 text-right">{formatTime(pageTotals.instructorTime)}</td>
              <td className="p-2"></td>
            </tr>

            {/* Previous Totals */}
            <tr className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 h-10 border-b border-gray-200 dark:border-gray-700">
              <td colSpan={7} className="p-2 border-r border-gray-200 dark:border-gray-700 text-center">{t.totalPreviousPages}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.singlePilotSE)}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.singlePilotME)}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.multiPilot)}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.totalTime)}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700"></td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{previousTotals.landingsDay}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{previousTotals.landingsNight}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.nightTime)}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.ifrTime)}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.picTime)}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.copilotTime)}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.dualTime)}</td>
              <td className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">{formatTime(previousTotals.instructorTime)}</td>
              <td className="p-2"></td>
            </tr>

            {/* Grand Totals */}
            <tr className="bg-gray-200 dark:bg-gray-900 font-bold text-gray-900 dark:text-white h-12 border-t-2 border-gray-400 dark:border-gray-500">
              <td colSpan={7} className="p-2 border-r border-gray-400 dark:border-gray-600 text-center">{t.totalLifetime}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{formatTime(previousTotals.singlePilotSE + pageTotals.singlePilotSE)}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{formatTime(previousTotals.singlePilotME + pageTotals.singlePilotME)}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{formatTime(previousTotals.multiPilot + pageTotals.multiPilot)}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-blue-700 dark:text-blue-400 text-right">{formatTime(previousTotals.totalTime + pageTotals.totalTime)}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600"></td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{previousTotals.landingsDay + pageTotals.landingsDay}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{previousTotals.landingsNight + pageTotals.landingsNight}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{formatTime(previousTotals.nightTime + pageTotals.nightTime)}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{formatTime(previousTotals.ifrTime + pageTotals.ifrTime)}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{formatTime(previousTotals.picTime + pageTotals.picTime)}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{formatTime(previousTotals.copilotTime + pageTotals.copilotTime)}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{formatTime(previousTotals.dualTime + pageTotals.dualTime)}</td>
              <td className="p-2 border-r border-gray-400 dark:border-gray-600 text-right">{formatTime(previousTotals.instructorTime + pageTotals.instructorTime)}</td>
              <td className="p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <button 
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
        >
          {t.previous}
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">{t.page} {page} {t.of} {totalPages || 1}</span>
        <button 
          disabled={page >= totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
        >
          {t.next}
        </button>
      </div>
    </div>
  )
}
