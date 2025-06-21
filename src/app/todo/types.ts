import * as z from 'zod'

export type Todo = {
  id: number
  text: string
  done: boolean
  deadline: number
}

export type TodoRequest = Omit<Todo, 'id'>

export const todoInputSchema = z.object({
  text: z.string().min(1, { message: 'Todo text is required' }),
  deadline: z.date().refine(
    (date) => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return date >= today
    },
    { message: 'Deadline cannot be in the past' }
  ),
})

export type TodoInputSchema = z.infer<typeof todoInputSchema>
