import { Button } from '@/components/ui/Button'
import { Calendar } from '@/components/ui/Calender'
import { Input } from '@/components/ui/Input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover'
import { CalendarIcon } from 'lucide-react'
import { FormEvent, useState } from 'react'
import useCreateTodo from '../api/mutations/useCreateTodo'

const TodoCalender = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">
          <CalendarIcon className="size-4" />
          {selectedDate.toLocaleDateString()}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          required
        />
      </PopoverContent>
    </Popover>
  )
}

const TodoInput = () => {
  const [text, setText] = useState('')
  const [deadline, setDeadline] = useState<Date>(new Date())
  const [error, setError] = useState('')

  const { mutate: addTodo } = useCreateTodo()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.length < 1) {
      setError('Todo text is required')
      return
    }

    addTodo({
      payload: {
        done: false,
        text,
        deadline: deadline.getTime(),
      },
    })
    setText('')
    setDeadline(new Date())
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center justify-center gap-4"
    >
      <Input
        placeholder="Add a new todo"
        type="text"
        required
        minLength={1}
        name="todoText"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <TodoCalender selectedDate={deadline} setSelectedDate={setDeadline} />
      <Button type="submit" variant="outline">
        Add
      </Button>
    </form>
  )
}

export default TodoInput
