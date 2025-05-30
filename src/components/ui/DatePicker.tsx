import { cn } from '@/utils/tailwind-cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { InputHTMLAttributes, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useIsMobile } from '@/hooks/use-mobile';

const datePickerVariants = cva(
  "border-[1px] border-black dark:border-white rounded-md w-[500px]"
);

const monthNames = [
  "January",
  "February", 
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const dayNames = [
  "Sun",
  "Mon", 
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
]

function getNumberOfDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

function getSortedDays(year:number,month:number) {
    const dayIndex=new Date(year,month).getDay()
    const firstHalf= dayNames.slice(dayIndex)
    return [...firstHalf,...dayNames.slice(0,dayIndex)]
}

function range(start:number,end:number){
    const length=Math.abs((end-start)/1)

    const { result } = Array.from({ length }).reduce(
        ({ result, current }) => ({
            result: [...result, current],
            current: current + 1
        }),
        {
            result: [],
            current: start
        }
    );

    return result;
}

interface DatePickerMinMaxProps{
    minDate?: Date
    maxDate?: Date
    onDateSelect?: (date: Date) => void
    selectedDate?: Date | null
    isOpen?: boolean
    onClose?: () => void
}

type DatePickerProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof datePickerVariants> & DatePickerMinMaxProps

export const DatePicker = (
  ({ className, minDate, onDateSelect, selectedDate: propSelectedDate, isOpen, onClose, ...props }: DatePickerProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear]= useState(new Date().getFullYear())
    const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(null)
    const isMobile = useIsMobile()
    
    const selectedDate = propSelectedDate ?? internalSelectedDate

    const nextMonth=()=>{
        if(currentMonth < 11){
            setCurrentMonth(prev=> prev +1)
        }else{
            setCurrentMonth(0)
            setCurrentYear(prev=>prev + 1)
        }
    }

    const prevMonth=()=>{
        if(currentMonth>0){
            setCurrentMonth(prev=>prev-1)
        }
        else{
            setCurrentMonth(11)
            setCurrentYear(prev=>prev-1)
        }
    }

    const handleSelection = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        if (target.id === "day") {
            const day = Number(target.getAttribute("data-day"));
            const newDate = new Date(currentYear, currentMonth, day);
            
            if (!isDayDisabled(day)) {
                setInternalSelectedDate(newDate);
                onDateSelect?.(newDate);
                // Close modal on mobile after selection
                if (isMobile && onClose) {
                    onClose();
                }
            }
        }
    }

 
    const isPrevMonthDisabled = () => {
        if (!minDate) return false
        const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1)
        return firstDayOfCurrentMonth <= minDate
    }

    const isNextMonthDisabled = () => {
        if (!props.maxDate) return false
        const lastDayOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0)
        return lastDayOfCurrentMonth >= props.maxDate
    }

    const isDayDisabled = (day: number) => {
        const currentDate = new Date(currentYear, currentMonth, day)
        
        // Check minDate
        if (minDate && currentDate < minDate) {
            return true
        }
        
        // Check maxDate
        if (props.maxDate && currentDate > props.maxDate) {
            return true
        }
        
        return false
    }

    const getMinYear = () => {
        return minDate ? minDate.getFullYear() : new Date().getFullYear() - 50;
    }

    const getMaxYear = () => {
        return props.maxDate ? props.maxDate.getFullYear() : new Date().getFullYear() + 50;
    }

    const isMonthDisabled = (monthIndex: number) => {
        if (!minDate && !props.maxDate) return false;
        
        const testDate = new Date(currentYear, monthIndex, 1);
        const lastDayOfMonth = new Date(currentYear, monthIndex + 1, 0);
        
        // Check if entire month is before minDate
        if (minDate && lastDayOfMonth < minDate) return true;
        
        // Check if entire month is after maxDate
        if (props.maxDate && testDate > props.maxDate) return true;
        
        return false;
    }

    const DatePickerContent = () => (
      <div
        className={cn(
          "border-[2px] border-red-500 w-[500px] dark:text-white rounded-md overflow-hidden p-2 bg-white dark:bg-gray-900 z-50",
          isMobile && "w-[calc(100vw-2rem)] max-w-none",
          className
        )}
      >
        <div className="flex justify-center items-center mb-5 font-bold">
          <button
          onClick={prevMonth}
          className='cursor-pointer text-xl disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isPrevMonthDisabled()}
          >
          <IoIosArrowBack />
          </button>
          
          <div className="flex-1 flex justify-center items-center gap-2">
            <select 
              value={currentMonth} 
              onChange={(e) => setCurrentMonth(Number(e.target.value))}
              className="bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm"
            >
              {monthNames.map((month, index) => (
                <option 
                  key={month} 
                  value={index} 
                  disabled={isMonthDisabled(index)}
                  className="dark:bg-gray-800 disabled:opacity-50"
                >
                  {month}
                </option>
              ))}
            </select>
            
            <select 
              value={currentYear} 
              onChange={(e) => setCurrentYear(Number(e.target.value))}
              className="bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm"
            >
              {Array.from({ length: getMaxYear() - getMinYear() + 1 }, (_, i) => {
                const year = getMinYear() + i;
                return (
                  <option key={year} value={year} className="dark:bg-gray-800">
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          
          <button
          onClick={nextMonth}
          className='cursor-pointer text-xl disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isNextMonthDisabled()}
          >
          <IoIosArrowForward />
          </button>
        </div>
        
        <div>
            <div className='grid grid-cols-7 mx-auto text-center mb-3 font-semibold'>
                {getSortedDays(currentYear, currentMonth).map((day)=>{
                    return(
                        <p key={day}>{day}</p>
                    )
                })}
            </div>

            <div 
            className='grid grid-cols-7 text-center gap-y-3'
            onClick={handleSelection}
            >
                {
                range(1, getNumberOfDaysInMonth(currentYear,currentMonth)+1)
                .map((day)=>{
                    const isSelected = selectedDate?.getTime() === new Date(currentYear, currentMonth, day).getTime();
                    const isDisabled = isDayDisabled(day);
                    
                    return(
                        <p 
                        key={day}
                        id="day"
                        className={`
                            flex justify-center items-center h-8 w-8
                            cursor-pointer rounded-2xl transition-colors
                            ${isDisabled 
                                ? 'opacity-50 cursor-not-allowed text-gray-400' 
                                : isSelected 
                                    ? 'text-white bg-red-500 border border-red-500' 
                                    : 'hover:text-red-500 hover:border hover:border-red-500 hover:bg-gray-100 hover:dark:bg-gray-800'
                            }`}
                        data-day={day}
                        style={isDisabled ? { pointerEvents: 'none' } : {}}
                        >{day}</p>
                    )
                })}
            </div>
        </div>
        
        {isMobile && (
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );

    if (isMobile && isOpen) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
          />
          {/* Modal Content */}
          <div className="relative z-10 w-full">
            <DatePickerContent />
          </div>
        </div>
      );
    }

    return <DatePickerContent />;
  }
);
