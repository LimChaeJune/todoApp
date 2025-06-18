export interface Todo {
  id: number
  text: string
  done: boolean
  deadline: number
}

export type TodoRequest = Omit<Todo, 'id'>
