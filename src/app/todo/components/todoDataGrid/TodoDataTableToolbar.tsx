import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/Button'
import { Trash2 } from 'lucide-react'
import useDeleteTodo from '../../api/mutations/useDeleteTodo'
import { TodoDeleteDialog } from '../dialog/TodoDeleteDialog'

interface TodoDataTableToolbarProps<TData> {
  table: Table<TData>
}

export function TodoDataTableToolbar<TData>({
  table,
}: TodoDataTableToolbarProps<TData>) {
  const numSelected = table.getSelectedRowModel().rows.length
  const { isPending } = useDeleteTodo()

  return (
    <TodoDeleteDialog
      table={table}
      trigger={
        <Button variant="destructive" size="sm" disabled={isPending}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete ({numSelected})
        </Button>
      }
    />
  )
}
