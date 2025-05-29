import { useState, forwardRef } from 'react'
import { DatePicker } from './DatePicker'
import { cn } from '@/utils/tailwind-cn'
import { useIsMobile } from '@/hooks/use-mobile'
import { motion, AnimatePresence } from 'framer-motion'

export interface DatePickerInputProps {
  value?: Date | null
  onChange?: (date: Date | null) => void
  placeholder?: string
  minDate?: Date
  maxDate?: Date
  className?: string
  disabled?: boolean
}

export const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(
  ({
    value,
    onChange,
    placeholder = "Select date...",
    minDate,
    maxDate,
    className,
    disabled = false
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const isMobile = useIsMobile()

    const handleDateSelect = (date: Date) => {
      onChange?.(date)
      setIsOpen(false)
    }

    const formatDate = (date: Date | null) => {
      if (!date) return ''
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const handleInputClick = () => {
      if (!disabled) {
        setIsOpen(!isOpen)
      }
    }

    return (
      <div className="relative">
        <input
          ref={ref}
          type="text"
          value={formatDate(value ?? null)}
          onClick={handleInputClick}
          readOnly
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "w-[300px] px-3 py-2 border border-gray-300 rounded-md cursor-pointer",
            "dark:border-gray-600 dark:bg-gray-800 dark:text-white",
            "focus:outline-none focus:ring-2 focus:ring-red-500",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
        />
        
        <AnimatePresence>
          {isOpen && (
            <>
              {isMobile ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-50"
                  onClick={() => setIsOpen(false)}
                >
                  {/* Backdrop */}
                  <motion.div 
                    className="fixed inset-0 bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                  
                  {/* Modal Content */}
                  <div className="flex items-center justify-center min-h-full p-4">
                    <motion.div 
                      className="w-full max-w-md"
                      initial={{ scale: 0.9, opacity: 0, y: 50 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 50 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30,
                        duration: 0.3 
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DatePicker
                        minDate={minDate}
                        maxDate={maxDate}
                        onDateSelect={handleDateSelect}
                        selectedDate={value}
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25,
                    duration: 0.2 
                  }}
                  className="absolute top-full left-0 mt-2 z-10"
                >
                  <DatePicker
                    minDate={minDate}
                    maxDate={maxDate}
                    onDateSelect={handleDateSelect}
                    selectedDate={value}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                  />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

DatePickerInput.displayName = 'DatePickerInput'