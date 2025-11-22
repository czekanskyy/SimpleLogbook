'use client'

import { useState, useEffect } from 'react'
import { createFlight, updateFlight, getUniqueAircraftRegistrations, getUniqueAircraftModels, getUniquePicNames, getAircraftByRegistration, getUniqueDeparturePlaces, getUniqueArrivalPlaces } from '@/app/lib/actions'
import { parseTime, formatTime } from '@/app/lib/utils'
import { Plus, X, Plane, Clock, Settings, Timer } from 'lucide-react'
import { useUI } from '@/app/context/UIContext'
import AutocompleteInput from './AutocompleteInput'
import { Flight } from '@prisma/client'

interface AddEntryModalProps {
  isOpen?: boolean
  onClose?: () => void
  initialData?: Flight | null
}

export default function AddEntryModal({ 
  isOpen: externalIsOpen, 
  onClose, 
  initialData 
}: AddEntryModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  
  const [error, setError] = useState('')
  const [isSelf, setIsSelf] = useState(false)
  const [picName, setPicName] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [arrivalTime, setArrivalTime] = useState('')
  const [calculatedFlightTime, setCalculatedFlightTime] = useState('')
  const [aircraftModel, setAircraftModel] = useState('')
  const [aircraftReg, setAircraftReg] = useState('')
  const [departurePlace, setDeparturePlace] = useState('')
  const [arrivalPlace, setArrivalPlace] = useState('')
  
  // Autocomplete suggestions
  const [registrations, setRegistrations] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])
  const [picNames, setPicNames] = useState<string[]>([])
  const [departurePlaces, setDeparturePlaces] = useState<string[]>([])
  const [arrivalPlaces, setArrivalPlaces] = useState<string[]>([])
  
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
      setAircraftModel(initialData.aircraftModel)
      setAircraftReg(initialData.aircraftReg)
      setDeparturePlace(initialData.departurePlace)
      setArrivalPlace(initialData.arrivalPlace)
      setPicName(initialData.picName === 'SELF' ? 'SELF' : initialData.picName)
      setIsSelf(initialData.picName === 'SELF')
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
    setAircraftModel('')
    setAircraftReg('')
    setDeparturePlace('')
    setArrivalPlace('')
    setDepartureTime('')
    setArrivalTime('')
    setCalculatedFlightTime('')
  }
  
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
          getUniqueAircraftRegistrations(),
          getUniqueAircraftModels(),
          getUniquePicNames(),
          getUniqueDeparturePlaces(),
          getUniqueArrivalPlaces()
        ])
        setRegistrations(regs)
        setModels(mods)
        setPicNames(pics)
        setDeparturePlaces(deps)
        setArrivalPlaces(arrs)
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
      if (aircraftReg.length >= 4) {
        try {
          const aircraft = await getAircraftByRegistration(aircraftReg)
          if (aircraft && aircraft.aircraftModel) {
            setAircraftModel(aircraft.aircraftModel)
          }
        } catch (err) {
          console.error('Error fetching aircraft:', err)
        }
      }
    }
    checkRegistration()
  }, [aircraftReg])
  
  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    
    const form = e.currentTarget
    const formData = new FormData(form)
    const rawData: any = Object.fromEntries(formData.entries())
    
    // Helper to parse HH:MM to minutes
    const toMin = (str: string) => parseTime(str)
    
    try {
      // Calculate total minutes from calculatedFlightTime
      let totalMinutes = 0
      if (calculatedFlightTime) {
        totalMinutes = parseTime(calculatedFlightTime)
      }
      
      // Validation: Check if category times match total time
      const se = toMin(rawData.singlePilotSE)
      const me = toMin(rawData.singlePilotME)
      const mp = toMin(rawData.multiPilot)
      
      if (se + me + mp !== totalMinutes) {
        setError(`Total time (${formatTime(totalMinutes)}) does not match sum of SE, ME, and MP times (${formatTime(se + me + mp)})`)
        return
      }

      const flightData = {
        date: new Date(rawData.date),
        departurePlace: rawData.departurePlace.toUpperCase(),
        departureTime: rawData.departureTime,
        arrivalPlace: rawData.arrivalPlace.toUpperCase(),
        arrivalTime: rawData.arrivalTime,
        aircraftModel: rawData.aircraftModel.toUpperCase(),
        aircraftReg: rawData.aircraftReg.toUpperCase(),
        singlePilotSE: se,
        singlePilotME: me,
        multiPilot: mp,
        nightTime: toMin(rawData.nightTime),
        ifrTime: toMin(rawData.ifrTime),
        picTime: toMin(rawData.picTime),
        copilotTime: toMin(rawData.copilotTime),
        dualTime: toMin(rawData.dualTime),
        instructorTime: toMin(rawData.instructorTime),
        picName: isSelf ? 'SELF' : (rawData.picName || '').toUpperCase(),
        landingsDay: parseInt(rawData.landingsDay || '0'),
        landingsNight: parseInt(rawData.landingsNight || '0'),
        remarks: rawData.remarks,
        totalTime: totalMinutes
      }
      
      if (initialData?.id) {
        await updateFlight(initialData.id, flightData)
      } else {
        await createFlight(flightData)
      }
      
      handleClose()
      form.reset()
    } catch (err) {
      console.error(err)
      setError('Error saving flight')
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setInternalIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm shadow-sm focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        title={t.addFlight}
      >
        <Plus size={16} />
        <span className="hidden sm:inline">{t.addFlight}</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-900/50 dark:bg-gray-900/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col transition-all border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 rounded-t-lg flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{initialData ? t.editFlight : t.addFlight}</h2>
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
              <Settings size={18} />
              {t.details}
            </h3>
            <div className="grid grid-cols-1 gap-4">
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
            </div>
          </div>

          {/* Departure & Arrival */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Plane size={18} />
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
                    suggestions={departurePlaces}
                    label={t.place}
                    required
                    maxLength={4}
                  />
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.time}</label>
                    <input 
                      type="time" 
                      name="departureTime" 
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      required 
                      className="bg-white dark:bg-gray-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
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
                    suggestions={arrivalPlaces}
                    label={t.place}
                    required
                    maxLength={4}
                  />
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.time}</label>
                    <input 
                      type="time" 
                      name="arrivalTime" 
                      value={arrivalTime}
                      onChange={(e) => setArrivalTime(e.target.value)}
                      required 
                      className="bg-white dark:bg-gray-800 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
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

          {/* Aircraft */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Plane size={18} className="rotate-45" />
              {t.aircraft}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AutocompleteInput
                name="aircraftReg"
                value={aircraftReg}
                onChange={setAircraftReg}
                suggestions={registrations}
                label={t.registration}
                required
              />
              <AutocompleteInput
                name="aircraftModel"
                value={aircraftModel}
                onChange={setAircraftModel}
                suggestions={models}
                label={t.aircraftModel}
                required
              />
            </div>
          </div>

          {/* Pilot Information */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Settings size={18} />
              {t.picNameLabel}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.picNameLabel}</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.self}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSelf(!isSelf)
                        if (!isSelf) setPicName('SELF')
                        else setPicName('')
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
            </div>
          </div>

          {/* Flight Times */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Clock size={18} />
              {t.times}
            </h3>
            
            {/* Flight Time (SE, ME, MP) */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Timer size={16} />
                {t.singlePilotTime}
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'singlePilotSE', label: 'SE' },
                  { name: 'singlePilotME', label: 'ME' },
                  { name: 'multiPilot', label: 'MP' },
                ].map((field) => (
                  <div key={field.name} className="space-y-1 relative">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-medium text-gray-900 dark:text-white uppercase">{field.label}</label>
                      {calculatedFlightTime && (
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.querySelector(`input[name="${field.name}"]`) as HTMLInputElement
                            if (input) {
                              input.value = calculatedFlightTime
                              // Trigger change event if needed, but for uncontrolled input setting value is enough for submission
                            }
                          }}
                          className="text-[10px] text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                        >
                          Fill
                        </button>
                      )}
                    </div>
                    <input 
                      name={field.name} 
                      placeholder="00:00" 
                      pattern="[0-9]{1,2}:[0-9]{2}"
                      defaultValue={initialData ? formatTime(initialData[field.name as keyof Flight] as number) : ''}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Condition Time (IFR, Night) */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Timer size={16} />
                {t.operationalCondition}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'ifrTime', label: 'IFR' },
                  { name: 'nightTime', label: t.night },
                ].map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label className="block text-xs font-medium text-gray-900 dark:text-white uppercase">{field.label}</label>
                    <input 
                      name={field.name} 
                      placeholder="00:00" 
                      pattern="[0-9]{1,2}:[0-9]{2}" 
                      defaultValue={initialData ? formatTime(initialData[field.name as keyof Flight] as number) : ''}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Pilot Function Time (PIC, COP, DUAL, INSTR) */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Timer size={16} />
                {t.pilotFunctionTime}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'picTime', label: 'PIC' },
                  { name: 'copilotTime', label: 'COP' },
                  { name: 'dualTime', label: 'DUAL' },
                  { name: 'instructorTime', label: 'INSTR' },
                ].map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label className="block text-xs font-medium text-gray-900 dark:text-white uppercase">{field.label}</label>
                    <input 
                      name={field.name} 
                      placeholder="00:00" 
                      pattern="[0-9]{1,2}:[0-9]{2}" 
                      defaultValue={initialData ? formatTime(initialData[field.name as keyof Flight] as number) : ''}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Landings & Remarks */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Settings size={18} />
              {t.landings} & {t.remarks}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.landings} ({t.day})</label>
                <input 
                  type="number" 
                  name="landingsDay" 
                  min="0" 
                  defaultValue={initialData?.landingsDay || 0}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.landings} ({t.night})</label>
                <input 
                  type="number" 
                  name="landingsNight" 
                  min="0" 
                  defaultValue={initialData?.landingsNight || 0}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">{t.remarks}</label>
                <input 
                  name="remarks" 
                  defaultValue={initialData?.remarks || ''}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
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
