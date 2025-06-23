import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropDown'
import { Button } from '@/components/ui/Button'
import { MoreHorizontal } from 'lucide-react'
import { Todo } from '@/app/todo/types/model'
import TodoEditDialog from '../dialog/TodoEditDialog'

interface TodoActionCellProps {
  todo: Todo
}

const TodoActionCell = ({ todo }: TodoActionCellProps) => {
  const editTrigger = (
    <DropdownMenuItem
      className="text-blue-500 focus:text-blue-500"
      onSelect={(e) => e.preventDefault()}
    >
      Edit
    </DropdownMenuItem>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <TodoEditDialog todo={todo} trigger={editTrigger} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TodoActionCell
