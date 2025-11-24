'use client'

import { useRef, useState } from 'react'
import Papa from 'papaparse'
import { importFlights } from '@/app/lib/actions'
import { parseTime } from '@/app/lib/utils'
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useUI } from '@/app/context/UIContext'

type ImportStatus = 'idle' | 'parsing' | 'uploading' | 'complete' | 'error'

export default function CSVImport() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<ImportStatus>('idle')
  const [stats, setStats] = useState({ total: 0, success: 0, skipped: 0 })
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { t } = useUI()

  const resetState = () => {
    setStatus('idle')
    setStats({ total: 0, success: 0, skipped: 0 })
    setErrorMessage('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setStatus('parsing')
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      error: (err) => {
        console.error('CSV Parse Error:', err)
        setStatus('error')
        setErrorMessage(`Failed to parse CSV: ${err.message}`)
      },
      complete: async (results) => {
        try {
          if (results.errors.length > 0) {
            console.warn('CSV Parse Warnings:', results.errors)
          }

          let skippedCount = 0
          const flights = results.data.map((row: any) => {
            // Helper to get value from multiple possible keys
            const getValue = (keys: string[]) => {
              for (const key of keys) {
                if (row[key] !== undefined && row[key] !== null && row[key] !== '') {
                  return row[key]
                }
              }
              return undefined
            }

            // Helper to safely parse time or return 0
            const toMin = (keys: string[]) => {
              const val = getValue(keys)
              return val ? parseTime(val) : 0
            }
            
            const toInt = (keys: string[]) => {
              const val = getValue(keys)
              return val ? parseInt(val) : 0
            }

            const dateStr = getValue(['Date', 'date', 'Data'])
            const departurePlace = getValue(['Departure Place', 'Dep', 'departurePlace', 'Departure', 'From', 'Place of Departure'])
            const departureTime = getValue(['Departure Time', 'Dep Time', 'departureTime', 'Time of Departure', 'Off Block'])
            const arrivalPlace = getValue(['Arrival Place', 'Arr', 'arrivalPlace', 'Arrival', 'To', 'Place of Arrival'])
            const arrivalTime = getValue(['Arrival Time', 'Arr Time', 'arrivalTime', 'Time of Arrival', 'On Block'])
            const aircraftModel = getValue(['Aircraft Model', 'Model', 'aircraftModel', 'Type', 'Aircraft Type', 'Aircraft'])
            const aircraftReg = getValue(['Aircraft Reg', 'Reg', 'aircraftReg', 'Registration', 'Ident'])

            // Required fields validation
            if (!dateStr || !departurePlace || !arrivalPlace || !aircraftModel || !aircraftReg) {
              skippedCount++
              return null
            }

            return {
              date: new Date(dateStr),
              departurePlace,
              departureTime: departureTime || '00:00',
              arrivalPlace,
              arrivalTime: arrivalTime || '00:00',
              aircraftModel,
              aircraftReg,
              singlePilotSE: toMin(['Single Pilot SE', 'SE', 'singlePilotSE']),
              singlePilotME: toMin(['Single Pilot ME', 'ME', 'singlePilotME']),
              multiPilot: toMin(['Multi Pilot', 'MP', 'multiPilot']),
              totalTime: toMin(['Total Time', 'Total', 'totalTime', 'Total Flight Time']),
              nightTime: toMin(['Night Time', 'Night', 'nightTime']),
              ifrTime: toMin(['IFR Time', 'IFR', 'ifrTime']),
              picTime: toMin(['PIC Time', 'PIC', 'picTime', 'Pilot in Command']),
              copilotTime: toMin(['Copilot Time', 'COP', 'copilotTime', 'Co-Pilot']),
              dualTime: toMin(['Dual Time', 'Dual', 'dualTime', 'Dual Received']),
              instructorTime: toMin(['Instructor Time', 'Instr', 'instructorTime', 'Instructor']),
              picName: getValue(['PIC Name', 'picName', 'Name of PIC']) || 'SELF',
              landingsDay: toInt(['Landings Day', 'Ldg Day', 'landingsDay']),
              landingsNight: toInt(['Landings Night', 'Ldg Night', 'landingsNight']),
              remarks: getValue(['Remarks', 'remarks', 'Notes']) || ''
            }
          }).filter((f): f is NonNullable<typeof f> => f !== null)

          if (flights.length === 0) {
            setStatus('error')
            setErrorMessage('No valid flights found in CSV. Please check column headers.')
            return
          }

          setStatus('uploading')
          await importFlights(flights)
          
          setStats({
            total: results.data.length,
            success: flights.length,
            skipped: skippedCount
          })
          setStatus('complete')
          
        } catch (error) {
          console.error('Import failed:', error)
          setStatus('error')
          setErrorMessage('Failed to import flights. Check console for details.')
        }
      }
    })
  }

  return (
    <>
      <input 
        type="file" 
        accept=".csv" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileUpload}
        disabled={status === 'parsing' || status === 'uploading'}
      />
      
      <button 
        onClick={() => fileInputRef.current?.click()}
        disabled={status === 'parsing' || status === 'uploading'}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm
          ${status === 'parsing' || status === 'uploading'
            ? 'bg-blue-600/50 text-white cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800'
          }`}
        title={t.importCsv}
      >
        {status === 'parsing' || status === 'uploading' ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Upload size={16} />
        )}
        <span className="hidden sm:inline">
          {status === 'parsing' || status === 'uploading' ? 'Processing...' : t.importCsv}
        </span>
      </button>

      {/* Import Status Modal */}
      {status !== 'idle' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full p-6 relative">
            {status !== 'parsing' && status !== 'uploading' && (
              <button 
                onClick={resetState}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={20} />
              </button>
            )}

            <div className="text-center space-y-4">
              {(status === 'parsing' || status === 'uploading') && (
                <>
                  <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {status === 'parsing' ? 'Reading CSV...' : 'Importing Flights...'}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Please wait while we process your file.
                  </p>
                </>
              )}

              {status === 'complete' && (
                <>
                  <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Import Successful
                  </h3>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Total Rows:</span>
                      <span className="font-medium text-slate-900 dark:text-white">{stats.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Imported:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{stats.success}</span>
                    </div>
                    {stats.skipped > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Skipped (Invalid):</span>
                        <span className="font-medium text-amber-600 dark:text-amber-400">{stats.skipped}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={resetState}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </>
              )}

              {status === 'error' && (
                <>
                  <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Import Failed
                  </h3>
                  <p className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    {errorMessage}
                  </p>
                  <button
                    onClick={resetState}
                    className="w-full py-2 px-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
