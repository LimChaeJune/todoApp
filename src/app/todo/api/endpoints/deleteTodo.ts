import ky from 'ky'
import { APIResponse } from '@/types/api'

const deleteTodo = async (id: number): Promise<APIResponse<void>> => {
  const response = await ky.delete(`/api/todos/${id}`).json<APIResponse<void>>()

  return response
}

export default deleteTodo
