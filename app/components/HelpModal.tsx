'use client'

import { useState } from 'react'
import { X, Info, BookOpen, FileText, Plane, Clock, Upload, Lightbulb, HelpCircle } from 'lucide-react'
import { useUI } from '@/app/context/UIContext'

export default function HelpModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useUI()

  return (
    <>
      {/* Trigger Button (Hidden by default, triggered via ID) */}
      <button
        id="help-modal-trigger"
        onClick={() => setIsOpen(true)}
        className="hidden"
      >
        Open Help
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-600">
              <div className="flex items-center gap-3">
                <BookOpen className="text-white" size={28} />
                <h2 className="text-2xl font-bold text-white">{t.helpTitle}</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6 space-y-8">
              {/* Overview */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                  <Plane size={20} className="text-blue-500" />
                  {t.helpOverview}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t.helpOverviewContent}
                </p>
              </section>

              {/* PART FCL.050 */}
              <section className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                  <FileText size={20} className="text-blue-500" />
                  {t.helpPartFCL}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t.helpPartFCLContent}
                </p>
              </section>

              {/* Field Explanations */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.helpFields}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white font-medium">{t.helpFieldsDate}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white font-medium">{t.helpFieldsDeparture}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white font-medium">{t.helpFieldsArrival}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white font-medium">{t.helpFieldsAircraft}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white font-medium">{t.helpFieldsRegistration}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white font-medium">{t.helpFieldsTotalTime}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white font-medium">{t.helpFieldsPICName}</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white font-medium">{t.helpFieldsLandings}</p>
                  </div>
                </div>
              </section>

              {/* Pilot Functions */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                  <Clock size={20} className="text-blue-500" />
                  {t.helpPilotFunctions}
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-gray-900 dark:text-white">{t.helpPIC}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white">{t.helpSPIC}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white">{t.helpPICUS}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white">{t.helpCOP}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white">{t.helpDUAL}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white">{t.helpINSTR}</p>
                  </div>
                </div>
              </section>

              {/* Operational Conditions */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.helpOperationalConditions}
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white">{t.helpIFR}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white">{t.helpNight}</p>
                  </div>
                </div>
              </section>

              {/* Aircraft Time */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {t.helpAircraftTime}
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white">{t.helpSE}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white">{t.helpME}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-900 dark:text-white">{t.helpMP}</p>
                  </div>
                </div>
              </section>

              {/* CSV Import */}
              <section className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                  <Upload size={20} className="text-green-600 dark:text-green-400" />
                  {t.helpCSVImport}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {t.helpCSVImportContent}
                </p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-300 dark:border-green-700">
                  <pre className="text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">
                    {t.helpCSVColumns}
                  </pre>
                </div>
                <div className="mt-3 bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-300 dark:border-green-700">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t.helpCSVExample.split('\\n')[0]}
                  </p>
                  <pre className="text-xs text-gray-800 dark:text-gray-200 overflow-x-auto font-mono">
                    {t.helpCSVExample.split('\\n')[1]}
                  </pre>
                </div>
              </section>

              {/* Tips */}
              <section className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                  <Lightbulb size={20} className="text-yellow-600 dark:text-yellow-400" />
                  {t.helpTips}
                </h3>
                <div className="text-gray-700 dark:text-gray-300 space-y-1">
                  {t.helpTipsContent.split('\\n').map((tip: string, index: number) => (
                    <p key={index} className="leading-relaxed">{tip}</p>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                {t.closeHelp}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
