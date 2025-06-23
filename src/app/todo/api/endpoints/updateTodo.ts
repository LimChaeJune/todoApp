import ky from 'ky'
import { APIResponse } from '@/types/api'
import { TodoRequestDto, TodoResponseDto } from '@/app/todo/api/dtos'

const updateTodo = async (
  id: number,
  todo: TodoRequestDto
): Promise<APIResponse<TodoResponseDto>> => {
  const response = await ky
    .put(`/api/todos/${id}`, { json: todo })
    .json<APIResponse<TodoResponseDto>>()

  return response
}

export default updateTodo
