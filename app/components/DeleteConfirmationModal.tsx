'use client'

import { AlertTriangle, X, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useUI } from '@/app/context/UIContext'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  title?: string
  message?: string
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message
}: DeleteConfirmationModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { t } = useUI()

  if (!isOpen) return null

  const handleConfirm = async () => {
    setIsDeleting(true)
    try {
      await onConfirm()
      onClose()
    } catch (error) {
      console.error('Delete failed:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-sm w-full p-6 relative">
        <button 
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {title || 'Delete Flight'}
          </h3>
          
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {message || 'Are you sure you want to delete this flight? This action cannot be undone.'}
          </p>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 py-2 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isDeleting}
              className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
