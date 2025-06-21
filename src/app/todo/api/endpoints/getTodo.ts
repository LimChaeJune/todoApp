import ky from 'ky'
import { Todo } from '@/app/todo/types'
import { APIResponse } from '@/types/api'

const getTodo = async (): Promise<APIResponse<Todo[]>> => {
  const response = await ky.get('/api/todos').json<APIResponse<Todo[]>>()

  return response
}

export default getTodo
