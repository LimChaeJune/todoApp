import { useMutation } from '@tanstack/react-query'
import createTodo from '@/app/todo/api/endpoints/createTodo'

const useCreateTodo = () => {
  return useMutation({
    mutationKey: ['todo'],
    mutationFn: createTodo,
  })
}
export default useCreateTodo
