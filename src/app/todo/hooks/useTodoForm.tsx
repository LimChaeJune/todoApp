import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { todoInputSchema, TodoInputSchema, Todo } from '@/app/todo/types'
import useCreateTodo from '@/app/todo/api/mutations/useCreateTodo'
import useUpdateTodo from '@/app/todo/api/mutations/useUpdateTodo'

interface UseTodoFormProps {
  todo?: Todo
  onSuccess?: () => void
}

const useTodoForm = ({ todo, onSuccess }: UseTodoFormProps = {}) => {
  const { mutate: createTodo } = useCreateTodo()
  const { mutate: updateTodo } = useUpdateTodo()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoInputSchema>({
    defaultValues: {
      text: todo?.text ?? '',
      deadline: todo?.deadline ? new Date(todo.deadline) : new Date(),
    },
    resolver: zodResolver(todoInputSchema),
  })

  const onSubmit = (data: TodoInputSchema) => {
    if (todo) {
      updateTodo(
        {
          id: todo.id,
          todo: {
            done: todo.done,
            text: data.text,
            deadline: data.deadline.getTime(),
          },
        },
        {
          onSuccess: () => {
            reset()
            onSuccess?.()
          },
        },
      )
    } else {
      createTodo(
        {
          done: false,
          text: data.text,
          deadline: data.deadline.getTime(),
        },
        {
          onSuccess: () => {
            reset()
            onSuccess?.()
          },
        },
      )
    }
  }

  return { control, errors, onSubmit: handleSubmit(onSubmit) }
}

export default useTodoForm
