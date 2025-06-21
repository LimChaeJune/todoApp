import { useMutation } from '@tanstack/react-query'
import deleteTodo from '@/app/todo/api/endpoints/deleteTodo'

const useDeleteTodo = () => {
  return useMutation({
    mutationKey: ['todo'],
    mutationFn: (id: number) => deleteTodo(id),
  })
}

export default useDeleteTodo
