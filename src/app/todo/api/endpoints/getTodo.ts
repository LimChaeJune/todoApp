import ky from 'ky'
import { APIResponse } from '@/types/api'
import { TodoResponseDto } from '@/app/todo/api/dtos'

const getTodo = async (): Promise<APIResponse<TodoResponseDto[]>> => {
  const response = await ky
    .get('/api/todos')
    .json<APIResponse<TodoResponseDto[]>>()

  return response
}

export default getTodo
