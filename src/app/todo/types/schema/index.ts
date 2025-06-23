import * as z from 'zod'

export const todoFormSchema = z.object({
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

export type TodoFormSchema = z.infer<typeof todoFormSchema>
