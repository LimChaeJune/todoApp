import { useMutation } from '@tanstack/react-query'
import createTodo from '@/app/todo/api/fetch/createTodo'
import { TodoRequest } from '@/app/todo/types'
import { useQueryClient } from '@tanstack/react-query'

const useCreateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ payload }: { payload: TodoRequest }) => {
      return createTodo(payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] })
    },
  })
}
export default useCreateTodo
