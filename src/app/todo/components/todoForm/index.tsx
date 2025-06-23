import { Button } from '@/components/ui/Button'
import DatePicker from '@/components/form/DatePicker'
import { Input } from '@/components/ui/Input'
import { Controller } from 'react-hook-form'
import FormErrors from '@/components/form/FormErrors'
import useTodoForm from '@/app/todo/hooks/useTodoForm'

const TodoForm = () => {
  const { control, onSubmit, errors } = useTodoForm()

  return (
    <div className="flex flex-col gap-2 w-full">
      <form
        onSubmit={onSubmit}
        className="flex flex-row items-center justify-center gap-4"
      >
        <Controller
          control={control}
          name="text"
          render={({ field }) => (
            <Input
              aria-label="Add a new todo"
              aria-invalid={!!errors.text}
              aria-describedby={errors.text ? `${field.name}-error` : undefined}
              placeholder="Add a new todo"
              type="text"
              minLength={1}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="deadline"
          render={({ field }) => (
            <DatePicker
              aria-label="Add a new deadline"
              aria-invalid={!!errors.deadline}
              aria-describedby={
                errors.deadline ? `${field.name}-error` : undefined
              }
              value={field.value}
              onChange={(date) => field.onChange(date)}
              buttonProps={{ variant: 'outline', type: 'button' }}
            />
          )}
        />

        <Button type="submit" variant="outline">
          Add
        </Button>
      </form>
      <FormErrors errors={errors} />
    </div>
  )
}

export default TodoForm
