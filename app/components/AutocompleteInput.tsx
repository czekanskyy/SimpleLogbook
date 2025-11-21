'use client'

import { useState, useRef, useEffect } from 'react'

interface AutocompleteInputProps {
  name: string
  value: string
  onChange: (value: string) => void
  suggestions: string[]
  placeholder?: string
  required?: boolean
  maxLength?: number
  className?: string
  label?: string
  disabled?: boolean
}

export default function AutocompleteInput({
  name,
  value,
  onChange,
  suggestions,
  placeholder,
  required,
  maxLength,
  className,
  label,
  disabled
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Filter suggestions based on current value
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(value.toLowerCase())
  ).slice(0, 10) // Limit to 10 suggestions
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.toUpperCase()
    onChange(newValue)
    setIsOpen(true)
    setSelectedIndex(-1)
  }
  
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen) {
      if (e.key === 'ArrowDown' && filteredSuggestions.length > 0) {
        setIsOpen(true)
        e.preventDefault()
      }
      return
    }
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          selectSuggestion(filteredSuggestions[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }
  
  function selectSuggestion(suggestion: string) {
    onChange(suggestion)
    setIsOpen(false)
    setSelectedIndex(-1)
  }
  
  return (
    <div className="relative space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => value && setIsOpen(true)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        disabled={disabled}
        className={className || "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 uppercase disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"}
        autoComplete="off"
      />
      
      {isOpen && filteredSuggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredSuggestions.map((suggestion, index) => {
            const matchIndex = suggestion.toLowerCase().indexOf(value.toLowerCase())
            const beforeMatch = suggestion.slice(0, matchIndex)
            const match = suggestion.slice(matchIndex, matchIndex + value.length)
            const afterMatch = suggestion.slice(matchIndex + value.length)
            
            return (
              <div
                key={suggestion}
                onClick={() => selectSuggestion(suggestion)}
                className={`px-3 py-2 cursor-pointer text-sm font-mono ${
                  index === selectedIndex
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {matchIndex >= 0 ? (
                  <>
                    {beforeMatch}
                    <span className={index === selectedIndex ? 'font-bold' : 'font-bold text-blue-600 dark:text-blue-400'}>
                      {match}
                    </span>
                    {afterMatch}
                  </>
                ) : (
                  suggestion
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
