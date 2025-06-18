import { useQuery } from '@tanstack/react-query'
import getTodo from '../fetch/getTodo'
import { APIResponse } from '@/types/api'
import { Todo } from '@/app/todo/types'

const useTodoList = () => {
  return useQuery<APIResponse<Todo[]>, Error, Todo[]>({
    queryKey: ['todo'],
    queryFn: getTodo,
    select: (response) => response.data ?? [],
  })
}

export default useTodoList
