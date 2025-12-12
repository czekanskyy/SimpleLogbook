'use client'

import { useState, useEffect } from 'react'
import { createGliderFlight, updateGliderFlight, getUniqueGliderRegistrations, getUniqueGliderModels, getUniquePicNames, getGliderByRegistration, getUniqueDeparturePlaces, getUniqueArrivalPlaces } from '@/app/lib/actions'
import { parseTime, formatTime } from '@/app/lib/utils'
import { Plus, X, Sailboat, Clock, Settings, Send, Info, TowerControl, Signature, ClipboardPen } from 'lucide-react'
import { useUI } from '@/app/context/UIContext'
import AutocompleteInput from './AutocompleteInput'
import { GliderFlight } from '@prisma/client'

interface AddGliderEntryModalProps {
  isOpen?: boolean
  onClose?: () => void
  initialData?: GliderFlight | null
  hideTrigger?: boolean
}

export default function AddGliderEntryModal({ 
  isOpen: externalIsOpen, 
  onClose, 
  initialData,
  hideTrigger
}: AddGliderEntryModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  
  const [error, setError] = useState('')
  const [isSelf, setIsSelf] = useState(false)
  const [picName, setPicName] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [arrivalTime, setArrivalTime] = useState('')
  const [calculatedFlightTime, setCalculatedFlightTime] = useState('')
  const [gliderModel, setGliderModel] = useState('')
  const [gliderReg, setGliderReg] = useState('')
  const [departurePlace, setDeparturePlace] = useState('')
  const [arrivalPlace, setArrivalPlace] = useState('')
  const [launchMethod, setLaunchMethod] = useState('WINCH')
  const [pilotFunction, setPilotFunction] = useState('DUAL')
   
  // Autocomplete suggestions
  const [registrations, setRegistrations] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])
  const [picNames, setPicNames] = useState<string[]>([])
  const [places, setPlaces] = useState<string[]>([])
  
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
      setDepartureTime(initialData.departureTime)
      setArrivalTime(initialData.arrivalTime)
      setGliderModel(initialData.gliderModel)
      setGliderReg(initialData.gliderReg)
      setDeparturePlace(initialData.departurePlace)
      setArrivalPlace(initialData.arrivalPlace)
      setPicName(initialData.picName === 'SELF' ? 'SELF' : initialData.picName)
      setIsSelf(initialData.picName === 'SELF')
      setLaunchMethod(initialData.launchMethod)
      setPilotFunction(initialData.pilotFunction)
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
    setIsSelf(false)
    setPicName('')
    setGliderModel('')
    setGliderReg('')
    setDeparturePlace('')
    setArrivalPlace('')
    setDepartureTime('')
    setArrivalTime('')
    setCalculatedFlightTime('')
    setLaunchMethod('WINCH')
    setPilotFunction('DUAL')
  }
  
  // Auto-fill arrival place when departure place changes
  useEffect(() => {
    if (departurePlace && !arrivalPlace) {
      setArrivalPlace(departurePlace)
    }
  }, [departurePlace])
  
  // Calculate flight time whenever departure or arrival time changes
  useEffect(() => {
    if (departureTime && arrivalTime) {
      const [depHour, depMin] = departureTime.split(':').map(Number)
      const [arrHour, arrMin] = arrivalTime.split(':').map(Number)
      
      let depMinutes = depHour * 60 + depMin
      let arrMinutes = arrHour * 60 + arrMin
      
      // Handle midnight crossover (arrival next day)
      if (arrMinutes < depMinutes) {
        arrMinutes += 24 * 60
      }
      
      const diffMinutes = arrMinutes - depMinutes
      const hours = Math.floor(diffMinutes / 60)
      const minutes = diffMinutes % 60
      
      setCalculatedFlightTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)
    } else {
      setCalculatedFlightTime('')
    }
  }, [departureTime, arrivalTime])
  
  // Load autocomplete suggestions when modal opens
  useEffect(() => {
    async function loadSuggestions() {
      try {
        const [regs, mods, pics, deps, arrs] = await Promise.all([
          getUniqueGliderRegistrations(),
          getUniqueGliderModels(),
          getUniquePicNames(),
          getUniqueDeparturePlaces(),
          getUniqueArrivalPlaces()
        ])
        setRegistrations(regs)
        setModels(mods)
        setPicNames(pics)
        // Merge and deduplicate places
        const allPlaces = Array.from(new Set([...deps, ...arrs])).sort()
        setPlaces(allPlaces)
      } catch (err) {
        console.error('Error loading suggestions:', err)
      }
    }
    if (isOpen) {
      loadSuggestions()
    }
  }, [isOpen])
  
  // Auto-populate model when registration changes
  useEffect(() => {
    async function checkRegistration() {
      if (gliderReg.length >= 4) {
        try {
          const glider = await getGliderByRegistration(gliderReg)
          if (glider && glider.gliderModel) {
            setGliderModel(glider.gliderModel)
          }
        } catch (err) {
          console.error('Error fetching glider:', err)
        }
      }
    }
    checkRegistration()
  }, [gliderReg])
  
  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    
    const form = e.currentTarget
    const formData = new FormData(form)
    const rawData: any = Object.fromEntries(formData.entries())
    
    try {
      // Calculate total minutes from calculatedFlightTime
      let totalMinutes = 0
      if (calculatedFlightTime) {
        totalMinutes = parseTime(calculatedFlightTime)
      }
      
      // Validation: Required fields
      if (!rawData.date || !rawData.departurePlace || !rawData.departureTime || !rawData.arrivalPlace || !rawData.arrivalTime || !rawData.gliderReg || !rawData.gliderModel || (!isSelf && !rawData.picName)) {
        setError(t.valRequired || 'Required fields missing')
        return
      }

      // Validation: Date limits
      const flightDate = new Date(rawData.date)
      const minDate = new Date('1903-12-17')
      const today = new Date()
      today.setHours(23, 59, 59, 999)
      
      if (flightDate < minDate || flightDate > today) {
        setError(t.valDateLimit || 'Date must be between 17.12.1903 and today')
        return
      }

      // Calculate time fields based on pilot function
      let picTime = 0
      let dualTime = 0
      let instructorTime = 0
      
      if (rawData.pilotFunction === 'PIC') {
        picTime = totalMinutes
      } else if (rawData.pilotFunction === 'DUAL') {
        dualTime = totalMinutes
      } else if (rawData.pilotFunction === 'FI' || rawData.pilotFunction === 'FE') {
        instructorTime = totalMinutes
      }

      const flightData = {
        date: flightDate,
        departurePlace: rawData.departurePlace.toUpperCase(),
        departureTime: rawData.departureTime,
        arrivalPlace: rawData.arrivalPlace.toUpperCase(),
        arrivalTime: rawData.arrivalTime,
        gliderModel: rawData.gliderModel.toUpperCase(),
        gliderReg: rawData.gliderReg.toUpperCase(),
        launchMethod: rawData.launchMethod as 'WINCH' | 'AEROTOW' | 'SELF' | 'GRAVITY' | 'BUNGEE' | 'AUTOTOW',
        totalTime: totalMinutes,
        picName: isSelf ? 'SELF' : (rawData.picName || '').toUpperCase(),
        pilotFunction: rawData.pilotFunction as 'PIC' | 'DUAL' | 'FI' | 'FE',
        launches: parseInt(rawData.launches || '1'),
        picTime,
        dualTime,
        instructorTime,
        remarks: rawData.remarks || undefined,
      }
      
      if (initialData?.id) {
        await updateGliderFlight(initialData.id, flightData)
      } else {
        await createGliderFlight(flightData)
      }
      
      handleClose()
      form.reset()
    } catch (err) {
      console.error(err)
      setError('Error saving flight')
    }
  }

  if (!isOpen) {
    if (hideTrigger) return null
    return (
      <button
        onClick={() => setInternalIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        title={t.addGliderFlight}
      >
        <Plus size={16} />
        <span className="hidden sm:inline">{t.addGliderFlight}</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-900/50 dark:bg-gray-900/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col transition-all border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg shrink-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            {initialData ? t.editGliderFlight : t.addGliderFlight}
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
              <Info size={18} />
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
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t.launchMethod}</label>
                <select 
                  name="launchMethod" 
                  value={launchMethod}
                  onChange={(e) => setLaunchMethod(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[42px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="WINCH">{t.launchWinch}</option>
                  <option value="AEROTOW">{t.launchAerotow}</option>
                  <option value="SELF">{t.launchSelf}</option>
                  <option value="GRAVITY">{t.launchGravity}</option>
                  <option value="BUNGEE">{t.launchBungee}</option>
                  <option value="AUTOTOW">{t.launchAutotow}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Departure & Arrival */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <TowerControl size={18} />
              {t.departure} & {t.arrival}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Departure */}
              <div className="space-y-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase">{t.departure}</h4>
                <div className="space-y-3">
                  <AutocompleteInput
                    name="departurePlace"
                    value={departurePlace}
                    onChange={setDeparturePlace}
                    suggestions={places}
                    label={t.place}
                    required
                  />
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.time} (UTC)</label>
                    <input 
                      type="time" 
                      name="departureTime" 
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      required 
                      className="bg-white dark:bg-gray-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                    />
                  </div>
                </div>
              </div>

              {/* Arrival */}
              <div className="space-y-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase">{t.arrival}</h4>
                <div className="space-y-3">
                  <AutocompleteInput
                    name="arrivalPlace"
                    value={arrivalPlace}
                    onChange={setArrivalPlace}
                    suggestions={places}
                    label={t.place}
                    required
                  />
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.time} (UTC)</label>
                    <input 
                      type="time" 
                      name="arrivalTime" 
                      value={arrivalTime}
                      onChange={(e) => setArrivalTime(e.target.value)}
                      required 
                      className="bg-white dark:bg-gray-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                    />
                  </div>
                  {calculatedFlightTime && (
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-blue-600 dark:text-blue-400">{t.totalTime}</label>
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 text-sm rounded-lg p-2.5 font-mono font-semibold">
                        {calculatedFlightTime}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Glider */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Send size={18} />
              {t.glider}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AutocompleteInput
                name="gliderReg"
                value={gliderReg}
                onChange={setGliderReg}
                suggestions={registrations}
                label={t.registration}
                required
              />
              <AutocompleteInput
                name="gliderModel"
                value={gliderModel}
                onChange={setGliderModel}
                suggestions={models}
                label={t.gliderModel}
                required
              />
            </div>
          </div>

          {/* Pilot Information */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Signature size={18} />
              {t.picNameLabel}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.picNameLabel}</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.self}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newIsSelf = !isSelf
                        setIsSelf(newIsSelf)
                        if (newIsSelf) {
                          setPicName('SELF')
                          setPilotFunction('PIC')
                        } else {
                          setPicName('')
                          setPilotFunction('DUAL')
                        }
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                        isSelf ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isSelf ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <AutocompleteInput
                  name="picName"
                  value={isSelf ? 'SELF' : picName}
                  onChange={setPicName}
                  suggestions={picNames}
                  disabled={isSelf}
                  required={false}
                />
              </div>
              <div className="space-y-2">
                <div className="h-6 flex items-center">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.pilotFunction}</label>
                </div>
                <select 
                  name="pilotFunction" 
                  value={pilotFunction}
                  onChange={(e) => setPilotFunction(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[42px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="PIC">{t.pilotFuncPIC}</option>
                  <option value="DUAL">{t.pilotFuncDUAL}</option>
                  <option value="FI">{t.pilotFuncFI}</option>
                  <option value="FE">{t.pilotFuncFE}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Launches & Remarks */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <ClipboardPen size={18} />
              {t.launches}, {t.distance} & {t.remarks}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.launches}</label>
                <input 
                  type="number" 
                  name="launches" 
                  min="1" 
                  defaultValue={initialData?.launches || 1}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.distance}</label>
                <input 
                  type="number" 
                  name="distance" 
                  min="0" 
                  step="0.1"
                  defaultValue={initialData?.distance || ''}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.remarks}</label>
                <input 
                  name="remarks" 
                  defaultValue={initialData?.remarks || ''}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
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
