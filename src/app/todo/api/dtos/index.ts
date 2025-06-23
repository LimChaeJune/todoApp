export type TodoRequestDto = {
  text: string
  done: boolean
  deadline: number
}

export type TodoResponseDto = {
  id: number
} & TodoRequestDto
