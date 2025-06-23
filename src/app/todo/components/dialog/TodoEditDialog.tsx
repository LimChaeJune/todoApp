import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { Todo } from '@/app/todo/types'
import { Controller } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import FormErrors from '@/components/form/FormErrors'
import useTodoForm from '@/app/todo/hooks/useTodoForm'
import DatePicker from '@/components/form/DatePicker'

interface TodoEditDialogProps {
  trigger: React.ReactNode
  todo: Todo
}

const TodoEditDialog = ({ trigger, todo }: TodoEditDialogProps) => {
  const [open, setOpen] = useState(false)

  const { control, onSubmit, errors } = useTodoForm({
    todo,
    onSuccess: () => {
      setOpen(false)
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Edit the todo to update the information.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <Controller
            control={control}
            name="text"
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                type="text"
                minLength={1}
                placeholder="Edit todo"
                aria-label="Edit todo"
              />
            )}
          />
          <Controller
            control={control}
            name="deadline"
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={(date) => field.onChange(date)}
                buttonProps={{ variant: 'outline', type: 'button' }}
              />
            )}
          />
          <FormErrors errors={errors} />
          <DialogFooter>
            <Button type="submit">Edit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default TodoEditDialog
