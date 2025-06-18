import { http, HttpResponse, PathParams } from 'msw'
import { APIResponse } from '@/types/api'
import { Todo, TodoRequest } from '@/app/todo/types'

const apiWrapper = <T>(data: T, code = 200, message = ''): APIResponse<T> => {
  return {
    code,
    message,
    data,
  }
}

const fetchToDos = (): Todo[] => {
  try {
    return JSON.parse(localStorage.getItem('todos') ?? '[]')
  } catch (error) {
    // clear & set new data
    localStorage.setItem('todos', '[]')
    return []
  }
}

const setToDos = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const getToDo = (id: number) => {
  const todos = fetchToDos()
  return todos.find((todo) => todo.id === id)
}

export const handlers = [
  http.get('/api/todos', () => {
    return HttpResponse.json(apiWrapper<Todo[]>(fetchToDos()))
  }),
  http.post<PathParams, TodoRequest>('/api/todos', async ({ request }) => {
    const todos: Todo[] = fetchToDos()
    const payload: TodoRequest = await request.json()
    const newId = todos.length ? Math.max(...todos.map(({ id }) => id)) + 1 : 1
    const newToDo = {
      id: newId,
      ...payload,
    }
    todos.push(newToDo)
    setToDos(todos)
    return HttpResponse.json(apiWrapper<Todo>(newToDo))
  }),
  http.get<PathParams<'id'>>('/api/todos/:id', ({ params }) => {
    return HttpResponse.json(
      apiWrapper<Todo | undefined>(getToDo(Number(params.id)))
    )
  }),
  http.put<PathParams<'id'>, TodoRequest>(
    '/api/todos/:id',
    async ({ params, request }) => {
      const todos: Todo[] = fetchToDos()
      const payload: TodoRequest = await request.json()
      const index = todos.findIndex((todo) => todo.id === Number(params.id))
      if (index < 0) {
        return HttpResponse.json(apiWrapper<void>(undefined, 404, 'Not Found'))
      } else {
        const updatedToDo: Todo = {
          id: Number(params.id),
          ...payload,
        }
        todos[index] = updatedToDo
        setToDos(todos)
        return HttpResponse.json(apiWrapper<Todo>(updatedToDo))
      }
    }
  ),
  http.delete<PathParams<'id'>>('/api/todos/:id', async ({ params }) => {
    const todos: Todo[] = fetchToDos()
    const index = todos.findIndex((todo) => todo.id === Number(params.id))
    if (index < 0) {
      return HttpResponse.json(apiWrapper<void>(undefined, 404, 'Not Found'))
    } else {
      todos.splice(index, 1)
      setToDos(todos)
      return HttpResponse.json(apiWrapper<void>(undefined))
    }
  }),
]
