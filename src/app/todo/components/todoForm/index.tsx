import { Button } from '@/components/ui/Button'
import DatePicker from '@/components/form/DatePicker'
import { Input } from '@/components/ui/Input'
import { Controller } from 'react-hook-form'
import FormErrors from '@/components/form/FormErrors'
import { useTodoForm } from '../../hooks/useTodoForm'

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
