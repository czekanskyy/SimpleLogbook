"use client"

import { useState } from "react"
import { useUI } from "@/app/context/UIContext"
import { updateProfile } from "@/app/lib/actions"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, settings } = useUI()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen || !user) return null

  const t = {
    userProfile: settings.language === 'pl' ? 'Profil użytkownika' : 'User Profile',
    close: settings.language === 'pl' ? 'Zamknij' : 'Close',
    name: settings.language === 'pl' ? 'Imię' : 'Name',
    email: settings.language === 'pl' ? 'Email' : 'Email',
    newPassword: settings.language === 'pl' ? 'Nowe hasło (opcjonalnie)' : 'New Password (optional)',
    leaveBlank: settings.language === 'pl' ? 'Pozostaw puste aby zachować obecne' : 'Leave blank to keep current',
    saveChanges: settings.language === 'pl' ? 'Zapisz zmiany' : 'Save Changes',
    saving: settings.language === 'pl' ? 'Zapisywanie...' : 'Saving...',
    cancel: settings.language === 'pl' ? 'Anuluj' : 'Cancel',
    editProfile: settings.language === 'pl' ? 'Edytuj profil' : 'Edit Profile',
    signOut: settings.language === 'pl' ? 'Wyloguj' : 'Sign out',
  }

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    try {
      await updateProfile(formData)
      setIsEditing(false)
      window.location.reload() 
    } catch (error) {
      console.error("Failed to update profile", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t.userProfile}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span className="sr-only">{t.close}</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <div className={`h-16 w-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${
              user.avatarColor === 'blue' ? 'bg-blue-500' :
              user.avatarColor === 'red' ? 'bg-red-500' :
              user.avatarColor === 'green' ? 'bg-green-500' :
              user.avatarColor === 'yellow' ? 'bg-yellow-500' :
              user.avatarColor === 'purple' ? 'bg-purple-500' :
              user.avatarColor === 'pink' ? 'bg-pink-500' :
              user.avatarColor === 'indigo' ? 'bg-indigo-500' :
              user.avatarColor === 'cyan' ? 'bg-cyan-500' :
              user.avatarColor === 'orange' ? 'bg-orange-500' :
              'bg-blue-500'
            }`}>
              {(user.name?.[0] || user.email?.[0] || "U").toUpperCase()}
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                {user.role}
              </span>
            </div>
          </div>

          {/* Edit Form */}
          {isEditing ? (
            <form action={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.name}</label>
                <input
                  name="name"
                  defaultValue={user.name || ""}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.email}</label>
                <input
                  name="email"
                  defaultValue={user.email || ""}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.newPassword}</label>
                <input
                  name="password"
                  type="password"
                  placeholder={t.leaveBlank}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm p-2 border"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? t.saving : t.saveChanges}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  {t.cancel}
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t.editProfile}
            </button>
          )}

          {/* Sign Out */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
             <a
              href="/signout"
              className="block w-full text-center bg-red-50 text-red-700 px-4 py-2 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              {t.signOut}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
