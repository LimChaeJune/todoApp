import { useQuery } from '@tanstack/react-query'
import getTodo from '../endpoints/getTodo'
import { APIResponse } from '@/types/api'
import { Todo } from '@/app/todo/types'

const useTodoList = () => {
  const query = useQuery<APIResponse<Todo[]>, Error, Todo[]>({
    queryKey: ['todo'],
    queryFn: getTodo,
    select: (response) => response.data ?? [],
  })

  return query
}

export default useTodoList
