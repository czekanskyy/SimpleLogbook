'use client'

import { useRef, useState } from 'react'
import Papa from 'papaparse'
import { importFlights } from '@/app/lib/actions'
import { parseTime } from '@/app/lib/utils'
import { Upload } from 'lucide-react'
import { useUI } from '@/app/context/UIContext'

export default function CSVImport() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const { t } = useUI()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const flights = results.data.map((row: any) => {
            // Helper to safely parse time or return 0
            const toMin = (val: string) => val ? parseTime(val) : 0
            const toInt = (val: string) => val ? parseInt(val) : 0

            return {
              date: new Date(row['Date'] || row['date']),
              departurePlace: row['Dep'] || row['departurePlace'],
              departureTime: row['Dep Time'] || row['departureTime'],
              arrivalPlace: row['Arr'] || row['arrivalPlace'],
              arrivalTime: row['Arr Time'] || row['arrivalTime'],
              aircraftModel: row['Model'] || row['aircraftModel'],
              aircraftReg: row['Reg'] || row['aircraftReg'],
              singlePilotSE: toMin(row['SE'] || row['singlePilotSE']),
              singlePilotME: toMin(row['ME'] || row['singlePilotME']),
              multiPilot: toMin(row['MP'] || row['multiPilot']),
              nightTime: toMin(row['Night'] || row['nightTime']),
              ifrTime: toMin(row['IFR'] || row['ifrTime']),
              picTime: toMin(row['PIC'] || row['picTime']),
              copilotTime: toMin(row['COP'] || row['copilotTime']),
              dualTime: toMin(row['Dual'] || row['dualTime']),
              instructorTime: toMin(row['Instr'] || row['instructorTime']),
              picName: row['PIC Name'] || row['picName'] || 'SELF',
              landingsDay: toInt(row['Ldg Day'] || row['landingsDay']),
              landingsNight: toInt(row['Ldg Night'] || row['landingsNight']),
              remarks: row['Remarks'] || row['remarks'] || ''
            }
          })

          await importFlights(flights)
          alert(`Successfully imported ${flights.length} flights`)
          if (fileInputRef.current) fileInputRef.current.value = ''
        } catch (error) {
          console.error('Import failed:', error)
          alert('Failed to import flights')
        } finally {
          setUploading(false)
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
        disabled={uploading}
      />
      <button 
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm
          ${uploading 
            ? 'bg-blue-600/50 text-white cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800'
          }`}
        title={t.importCsv}
      >
        <Upload size={16} />
        <span className="hidden sm:inline">{uploading ? 'Importing...' : t.importCsv}</span>
      </button>
    </>
  )
}
