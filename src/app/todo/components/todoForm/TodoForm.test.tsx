import { render, screen, waitFor } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from '@/app/todo/components/todoForm/TodoForm.stories'

const { Default, SubmitWithEmptyFields } = composeStories(stories)

describe('TodoForm', () => {
  test('폼 입력 인풋과 버튼이 정상적으로 렌더링된다.', () => {
    render(<Default />)

    expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument()
    expect(screen.getByLabelText('Pick a date')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  test('사용자가 폼 입력 인풋과 버튼을 클릭하여 정상적으로 제출된다.', async () => {
    const { container } = render(<Default />)

    if (Default.play) {
      await Default.play({ canvasElement: container })
    }
  })

  test('빈 텍스트 유효성 검사가 작동한다', async () => {
    const { container } = render(<SubmitWithEmptyFields />)

    if (SubmitWithEmptyFields.play) {
      await SubmitWithEmptyFields.play({ canvasElement: container })
    }

    await waitFor(() => {
      expect(screen.getByText('Todo text is required')).toBeInTheDocument()
    })
  })
})
