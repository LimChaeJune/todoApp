import { render, screen, waitFor } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from '@/app/todo/components/todoForm/TodoForm.stories'

const { Default, SubmitWithEmptyFields } = composeStories(stories)

describe('TodoForm', () => {
  test('renders the form with input and button', () => {
    render(<Default />)

    expect(screen.getByPlaceholderText('Add a new todo')).toBeInTheDocument()
    expect(screen.getByLabelText('Add a new deadline')).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  test('allows user to type and submit', async () => {
    const { container } = render(<Default />)

    if (Default.play) {
      await Default.play({ canvasElement: container })
    }
  })

  test('shows validation errors when submitting empty', async () => {
    const { container } = render(<SubmitWithEmptyFields />)

    if (SubmitWithEmptyFields.play) {
      await SubmitWithEmptyFields.play({ canvasElement: container })
    }

    await waitFor(() => {
      expect(screen.getByText('Text is required')).toBeInTheDocument()
    })
  })
})
