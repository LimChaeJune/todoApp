import { render, screen, waitFor } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from '@/app/todo/components/dialog/TodoEditDialog.stories'

const { Default, EditText, EmptyTextValidation } = composeStories(stories)

describe('TodoEditDialog', () => {
  test('기본 편집 다이얼로그가 정상적으로 작동한다', async () => {
    const { container } = render(<Default />)

    if (Default.play) {
      await Default.play({ canvasElement: container })
    }

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  test('텍스트 수정이 정상적으로 작동한다', async () => {
    const { container } = render(<EditText />)

    if (EditText.play) {
      await EditText.play({ canvasElement: container })
    }

    expect(screen.getByDisplayValue('수정된 할 일')).toBeInTheDocument()
  })

  test('빈 텍스트 유효성 검사가 작동한다', async () => {
    const { container } = render(<EmptyTextValidation />)

    if (EmptyTextValidation.play) {
      await EmptyTextValidation.play({ canvasElement: container })
    }

    await waitFor(() => {
      expect(screen.getByText('Todo text is required')).toBeInTheDocument()
    })
  })
})
