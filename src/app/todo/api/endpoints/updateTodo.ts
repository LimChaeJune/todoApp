import ky from 'ky'
import { Todo, TodoRequest } from '@/app/todo/types'
import { APIResponse } from '@/types/api'

const updateTodo = async (
  id: number,
  todo: TodoRequest
): Promise<APIResponse<Todo>> => {
  const response = await ky
    .put(`/api/todos/${id}`, { json: todo })
    .json<APIResponse<Todo>>()

  return response
}

export default updateTodo
