import ky from 'ky'
import { Todo, TodoRequest } from '@/app/todo/types'
import { APIResponse } from '@/types/api'

const createTodo = async (todo: TodoRequest): Promise<APIResponse<Todo>> => {
  const response = await ky
    .post('/api/todos', { json: todo })
    .json<APIResponse<Todo>>()

  return response
}

export default createTodo
