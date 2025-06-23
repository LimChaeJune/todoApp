import { useQuery } from '@tanstack/react-query'
import getTodo from '@/app/todo/api/endpoints/getTodo'
import { APIResponse } from '@/types/api'
import { Todo } from '@/app/todo/types/model'

const useTodoList = () => {
  const query = useQuery<APIResponse<Todo[]>, Error, Todo[]>({
    queryKey: ['todo'],
    queryFn: getTodo,
    select: (response) => response.data ?? [],
  })

  return query
}

export default useTodoList
