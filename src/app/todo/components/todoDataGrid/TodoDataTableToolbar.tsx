import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/Button'
import { Trash2 } from 'lucide-react'
import useDeleteTodo from '@/app/todo/api/mutations/useDeleteTodo'
import TodoDeleteDialog from '@/app/todo/components/dialog/TodoDeleteDialog'

interface TodoDataTableToolbarProps<TData> {
  table: Table<TData>
}

const TodoDataTableToolbar = <TData extends object>({
  table,
}: TodoDataTableToolbarProps<TData>) => {
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

export default TodoDataTableToolbar
