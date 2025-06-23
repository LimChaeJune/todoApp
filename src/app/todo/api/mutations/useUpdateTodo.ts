import { useMutation } from '@tanstack/react-query'
import { TodoRequestDto } from '@/app/todo/api/dtos'
import updateTodo from '@/app/todo/api/endpoints/updateTodo'
import { Todo } from '@/app/todo/types/model'

const useUpdateTodo = () => {
  return useMutation({
    mutationKey: ['todo'],
    mutationFn: ({ id, todo }: { id: number; todo: Omit<Todo, 'id'> }) => {
      const requestDto: TodoRequestDto = {
        text: todo.text,
        done: todo.done,
        deadline: todo.deadline,
      }

      return updateTodo(id, requestDto)
    },
  })
}

export default useUpdateTodo
