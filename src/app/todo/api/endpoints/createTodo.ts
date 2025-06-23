import ky from 'ky'
import { APIResponse } from '@/types/api'
import { TodoRequestDto, TodoResponseDto } from '@/app/todo/api/dtos'

const createTodo = async (
  todo: TodoRequestDto
): Promise<APIResponse<TodoResponseDto>> => {
  const response = await ky
    .post('/api/todos', { json: todo })
    .json<APIResponse<TodoResponseDto>>()

  return response
}

export default createTodo
