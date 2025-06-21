import { Button } from '@/components/ui/Button'
import { Calendar } from '@/components/ui/Calender'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { CalendarIcon } from 'lucide-react'
import { ComponentProps } from 'react'

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  buttonProps?: Omit<ComponentProps<typeof Button>, 'children'>
  calendarProps?: Omit<
    ComponentProps<typeof Calendar>,
    'selected' | 'onSelect' | 'mode'
  >
}

function DatePicker({
  value,
  onChange,
  buttonProps = {},
  calendarProps = {},
}: DatePickerProps) {
  const selectedDate = value || new Date()

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" {...buttonProps}>
          {selectedDate.toLocaleDateString()}
          <CalendarIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
