'use client'
import { useEffect, useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarIcon, X } from 'lucide-react'
import { format, addDays, isAfter, isBefore, isSameDay } from 'date-fns'
import type { DateRange } from 'react-day-picker'
import { useShoppingStore } from '@/zustand/shopingStore'
import { cn } from '@/lib/utils'

const RentalDates = () => {
  const { rent, startDate, setStartDate, setEndDate } = useShoppingStore()
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>()

  // 🧭 Handle user click on calendar with smart logic
  const handleSelect = (clickedDate: Date | undefined) => {
    if (!clickedDate) return

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Ensure no past date is chosen
    if (clickedDate < today) return

    // Reset করার জন্য: যদি same date এ আবার click করা হয়
    if (startDate && isSameDay(clickedDate, startDate)) {
      resetDates()
      return
    }

    // Calculate new range
    const newEnd = addDays(clickedDate, Number(rent) - 1)
    setStartDate(clickedDate)
    setEndDate(newEnd)
    setSelectedRange({ from: clickedDate, to: newEnd })
  }

  // Reset function
  const resetDates = () => {
    setStartDate(null)
    setEndDate(null)
    setSelectedRange(undefined)
  }

  // 🧹 Sync when rent duration changes
  useEffect(() => {
    if (startDate) {
      const newEnd = addDays(startDate, Number(rent) - 1)
      setEndDate(newEnd)
      setSelectedRange({ from: startDate, to: newEnd })
    }
  }, [rent, startDate, setEndDate])

  // 🧹 Cleanup if startDate reset elsewhere
  useEffect(() => {
    if (!startDate) setSelectedRange(undefined)
  }, [startDate])

  // 🖥️ Display text in button
  const displayDate =
    selectedRange?.from && selectedRange?.to
      ? `${format(selectedRange.from, 'dd/MM/yyyy')} - ${format(
          selectedRange.to,
          'dd/MM/yyyy'
        )}`
      : ''

  return (
    <div className="mt-3 w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left tracking-widest text-gray-600 font-light border rounded-md h-10 relative',
              !displayDate && 'text-muted-foreground'
            )}
          >
            {displayDate || 'DD/MM/YYYY'}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {/* Reset Button */}
          {displayDate && (
            <div className="p-3 border-b flex items-center justify-between">
              <span className="text-sm text-gray-600">Selected Range</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetDates}
                className="h-8 px-2 text-gray-600"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>
          )}

          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={(range) => {
              if (range?.from) handleSelect(range.from)
            }}
            numberOfMonths={1}
            // 🚫 Disable dates before today
            disabled={(date) => {
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              return date < today
            }}
            modifiers={{
              selected: (date) =>
                !!(
                  selectedRange?.from &&
                  selectedRange?.to &&
                  (isSameDay(date, selectedRange.from) ||
                    isSameDay(date, selectedRange.to) ||
                    (isAfter(date, selectedRange.from) &&
                      isBefore(date, selectedRange.to)))
                ),
            }}
            modifiersStyles={{
              selected: { backgroundColor: 'black', color: 'white' },
            }}
          />

          {/* Helpful hint */}
          <div className="p-3 text-xs text-gray-500 border-t text-center pt-1 font-light tracking-wide">
            Click on start date again to reset
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default RentalDates
