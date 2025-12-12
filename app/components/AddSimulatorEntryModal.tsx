'use client'

import { useState, useEffect } from 'react'
import { createSimulatorSession, updateSimulatorSession } from '@/app/lib/actions'
import { parseTime, formatTime } from '@/app/lib/utils'
import { Plus, X, Monitor, Clock, ClipboardPen } from 'lucide-react'
import { useUI } from '@/app/context/UIContext'
import { SimulatorSession } from '@prisma/client'

interface AddSimulatorEntryModalProps {
  isOpen?: boolean
  onClose?: () => void
  initialData?: SimulatorSession | null
  hideTrigger?: boolean
}

export default function AddSimulatorEntryModal({ 
  isOpen: externalIsOpen, 
  onClose, 
  initialData,
  hideTrigger
}: AddSimulatorEntryModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  
  const [error, setError] = useState('')
  const [fstdType, setFstdType] = useState('')
  const [sessionTime, setSessionTime] = useState('')
  const [excludeFromTotal, setExcludeFromTotal] = useState(false)
  
  const { t } = useUI()
  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  // Initialize form with initialData if provided
  useEffect(() => {
    if (initialData) {
      setFstdType(initialData.fstdType)
      setSessionTime(formatTime(initialData.totalTime))
      setExcludeFromTotal((initialData as any).excludeFromTotal || false)
    }
  }, [initialData])

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      setInternalIsOpen(false)
    }
    // Reset form state
    setError('')
    setFstdType('')
    setSessionTime('')
    setExcludeFromTotal(false)
  }
  
  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    
    const form = e.currentTarget
    const formData = new FormData(form)
    const rawData: any = Object.fromEntries(formData.entries())
    
    try {
      // Calculate total minutes from session time
      let totalMinutes = 0
      if (sessionTime) {
        totalMinutes = parseTime(sessionTime)
      }
      
      // Validation: Required fields
      if (!rawData.date || !rawData.fstdType || !sessionTime) {
        setError('Required fields: Date, FSTD Type, Session Time')
        return
      }

      // Validation: Date limits
      const sessionDate = new Date(rawData.date)
      const minDate = new Date('1960-01-01')
      const today = new Date()
      today.setHours(23, 59, 59, 999)
      
      if (sessionDate < minDate || sessionDate > today) {
        setError('Date must be between 1960 and today')
        return
      }

      const sessionData = {
        date: sessionDate,
        fstdType: rawData.fstdType,
        totalTime: totalMinutes,
        exercise: rawData.exercise || undefined,
        remarks: rawData.remarks || undefined,
        excludeFromTotal: excludeFromTotal,
      }
      
      if (initialData?.id) {
        await updateSimulatorSession(initialData.id, sessionData)
      } else {
        await createSimulatorSession(sessionData)
      }
      
      handleClose()
      form.reset()
    } catch (err) {
      console.error(err)
      setError('Error saving session')
    }
  }

  if (!isOpen) {
    if (hideTrigger) return null
    return (
      <button
        onClick={() => setInternalIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        title={t.addSimulatorSession}
      >
        <Plus size={16} />
        <span className="hidden sm:inline">{t.addSimulatorSession}</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-900/50 dark:bg-gray-900/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transition-all border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg shrink-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            {initialData ? t.editSimulatorSession : t.addSimulatorSession}
          </h2>
          <button onClick={handleClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          {error && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Clock size={18} />
              {t.details}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t.date}</label>
                <input 
                  type="date" 
                  name="date" 
                  required 
                  defaultValue={initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : ''}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
              </div>
              <div className="space-y-1">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t.sessionTime}</label>
                <input 
                  type="text" 
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                  placeholder="HH:MM"
                  pattern="[0-9]{1,2}:[0-9]{2}"
                  required 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                />
              </div>
            </div>
          </div>

          {/* FSTD Information */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Monitor size={18} />
              {t.simulator}
            </h3>
            <div className="space-y-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t.fstdType}</label>
              <input 
                type="text"
                name="fstdType" 
                value={fstdType}
                onChange={(e) => setFstdType(e.target.value)}
                required
                placeholder="e.g., FFS, FNPT II, FTD..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.exercise}</label>
              <textarea 
                name="exercise" 
                rows={2}
                defaultValue={initialData?.exercise || ''}
                placeholder="Describe the exercise performed..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
              />
            </div>
          </div>

          {/* Remarks */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ClipboardPen size={18} />
              {t.additionalRemarks}
            </h3>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.remarks}</label>
              <input 
                name="remarks" 
                defaultValue={initialData?.remarks || ''}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
              />
            </div>
          </div>

          {/* Exclude from total toggle */}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={excludeFromTotal}
                onChange={(e) => setExcludeFromTotal(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{t.excludeFromTotal || 'Exclude from total time'}</span>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
            <button type="button" onClick={handleClose} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              {t.cancel}
            </button>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              {t.saveEntry}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
