import { ColumnDef } from '@tanstack/react-table'
import { Todo } from '@/app/todo/types'
import { Badge } from '@/components/ui/Badge'

export const todoListColumns: ColumnDef<Todo>[] = [
  {
    header: 'Title',
    accessorKey: 'text',
  },
  {
    header: 'Done',
    accessorKey: 'done',
    cell: ({ row }) => {
      const done = row.original.done
      return (
        <Badge variant={done ? 'default' : 'secondary'}>
          {done ? 'Yes' : 'No'}
        </Badge>
      )
    },
  },
  {
    header: 'Deadline',
    accessorKey: 'deadline',
    cell: ({ row }) => {
      const deadline = row.original.deadline
      return <div>{new Date(deadline).toLocaleDateString()}</div>
    },
  },
]
