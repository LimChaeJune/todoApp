import { ColumnDef } from '@tanstack/react-table'
import { Todo } from '@/app/todo/types/model'
import SelectColumnCell from '@/components/ui/DataTable/SelectColumnCell'
import TodoDoneCell from '@/app/todo/components/todoDataGrid/TodoDoneCell'
import TodoActionCell from '@/app/todo/components/todoDataGrid/TodoActionCell'
import { Badge } from '@/components/ui/Badge'

export const columns: ColumnDef<Todo>[] = [
  SelectColumnCell<Todo>(),
  {
    accessorKey: 'text',
    header: 'Todo',
  },
  {
    accessorKey: 'deadline',
    header: 'Deadline',
    cell: ({ row }) => {
      const deadline = new Date(row.getValue('deadline'))
      const today = new Date()
      const threeDaysFromNow = new Date()
      threeDaysFromNow.setDate(today.getDate() + 3)

      const isUrgent = deadline <= threeDaysFromNow && !row.original.done
      const formattedDate = deadline.toLocaleDateString()

      if (isUrgent) {
        return <Badge variant="destructive">{formattedDate}</Badge>
      }

      return formattedDate
    },
  },
  {
    accessorKey: 'done',
    header: 'Done',
    cell: ({ row }) => <TodoDoneCell todo={row.original} />,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <TodoActionCell todo={row.original} />,
  },
]
