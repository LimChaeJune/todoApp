// src/app/todo/components/todoForm/todoForm.stories.tsx
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/test'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TodoForm from '@/app/todo/components/todoForm'

// --- 메타데이터 및 데코레이터 설정 ---
const meta: Meta<typeof TodoForm> = {
  title: 'TodoApp/TodoForm (Actual)',
  component: TodoForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const queryClient = new QueryClient()
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof TodoForm>

export const Default: Story = {
  name: '기본 (새 할 일 추가)',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // MSW를 설정하지 않았으므로 API 호출은 실패하지만,
    // UI 인터랙션 자체는 테스트 가능
    await userEvent.type(
      canvas.getByPlaceholderText('Add a new todo'),
      '실제 훅으로 할 일 추가'
    )
    await userEvent.click(canvas.getByRole('button', { name: 'Add' }))
  },
  parameters: {
    docs: {
      description: {
        story:
          '이 스토리는 실제 `useTodoForm` 훅을 사용합니다. `play` 함수는 폼 제출 인터랙션을 시뮬레이션하지만, API 호출을 위한 MSW 설정이 없으면 네트워크 에러가 발생합니다.',
      },
    },
  },
}

export const SubmitWithEmptyFields: Story = {
  name: '에러 상태 (유효성 검사)',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: 'Add' }))
  },
  parameters: {
    docs: {
      description: {
        story:
          '이 스토리는 실제 Zod 유효성 검사가 동작하는 것을 보여줍니다. 폼을 비운 채로 제출하면 에러가 발생해야 합니다.',
      },
    },
  },
}
