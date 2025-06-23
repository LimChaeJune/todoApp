import { Button } from '@/components/ui/Button'
import { type Todo } from '@/app/todo/types'
import useUpdateTodo from '@/app/todo/api/mutations/useUpdateTodo'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TodoDoneCellProps {
  todo: Todo
}

const TodoDoneCell = ({ todo }: TodoDoneCellProps) => {
  const { mutate: updateTodo, isPending } = useUpdateTodo()

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent row selection
    e.stopPropagation()
    updateTodo({
      id: todo.id,
      todo: { ...todo, done: !todo.done },
    })
  }

  return (
    <div className="flex items-center ">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'h-6 w-6 rounded-full border border-gray-300',
          todo.done && 'bg-green-100 text-green-600 hover:bg-green-200'
        )}
        onClick={handleToggle}
        disabled={isPending}
      >
        {todo.done && <Check className="h-4 w-4" />}
      </Button>
    </div>
  )
}

export default TodoDoneCell
