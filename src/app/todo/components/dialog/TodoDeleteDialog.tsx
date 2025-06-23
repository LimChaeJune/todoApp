import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/Button'
import { Trash2 } from 'lucide-react'
import useDeleteTodo from '@/app/todo/api/mutations/useDeleteTodo'
import { Todo } from '@/app/todo/types/model'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/Dialog'

interface TodoDeleteDialogProps<TData> {
  table: Table<TData>
  trigger: React.ReactNode
}

function TodoDeleteDialog<TData>({ table }: TodoDeleteDialogProps<TData>) {
  const numSelected = table.getSelectedRowModel().rows.length
  const { mutate: deleteTodos, isPending } = useDeleteTodo()

  const handleDelete = () => {
    const idsToDelete = table
      .getSelectedRowModel()
      .rows.map((row) => (row.original as Todo).id)

    Promise.all(idsToDelete.map((id) => deleteTodos(id))).then(() => {
      table.resetRowSelection()
    })
  }

  if (!numSelected) {
    return null
  }

  return (
    <div className="flex items-center justify-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm" disabled={isPending}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete ({numSelected})
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete{' '}
              {numSelected} todo(s).
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-4">
            <DialogClose>Cancel</DialogClose>
            <Button onClick={handleDelete} disabled={isPending}>
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TodoDeleteDialog
