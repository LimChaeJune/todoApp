import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TodoFormSchema, todoFormSchema } from '@/app/todo/types/schema'
import useCreateTodo from '@/app/todo/api/mutations/useCreateTodo'
import useUpdateTodo from '@/app/todo/api/mutations/useUpdateTodo'
import { Todo } from '@/app/todo/types/model'

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
  } = useForm<TodoFormSchema>({
    defaultValues: {
      text: todo?.text ?? '',
      deadline: todo?.deadline ? new Date(todo.deadline) : new Date(),
    },
    resolver: zodResolver(todoFormSchema),
  })

  const onSubmit = (data: TodoFormSchema) => {
    const handleSuccess = () => {
      reset()
      onSuccess?.()
    }

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
          onSuccess: handleSuccess,
        }
      )
    } else {
      createTodo(
        {
          done: false,
          text: data.text,
          deadline: data.deadline.getTime(),
        },
        {
          onSuccess: handleSuccess,
        }
      )
    }
  }

  return { control, errors, onSubmit: handleSubmit(onSubmit) }
}

export default useTodoForm
