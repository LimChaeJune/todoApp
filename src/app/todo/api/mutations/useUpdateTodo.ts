import { useMutation } from '@tanstack/react-query'
import { TodoRequest } from '@/app/todo/types'
import updateTodo from '@/app/todo/api/endpoints/updateTodo'

const useUpdateTodo = () => {
  return useMutation({
    mutationKey: ['todo'],
    mutationFn: ({ id, todo }: { id: number; todo: TodoRequest }) =>
      updateTodo(id, todo),
  })
}

export default useUpdateTodo
