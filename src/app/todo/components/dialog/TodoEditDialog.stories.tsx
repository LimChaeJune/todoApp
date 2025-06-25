import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from '@storybook/test'
import TodoEditDialog from './TodoEditDialog'
import { Button } from '@/components/ui/Button'
import { Todo } from '@/app/todo/types/model'
import { withQueryClient } from '@/test/queryClient'

const oneDay = 86400000

// Mock 데이터
const mockTodo: Todo = {
  id: 1,
  text: '기존 할 일',
  done: false,
  deadline: Date.now() + oneDay, // 내일
}

const longTextTodo: Todo = {
  id: 2,
  text: '매우 긴 할 일 텍스트입니다. 이것은 긴 설명이 있는 할 일이며, UI가 긴 텍스트를 어떻게 처리하는지 테스트합니다.',
  done: true,
  deadline: Date.now() + oneDay * 2, // 모레
}

const expiredTodo: Todo = {
  id: 3,
  text: '마감일이 지난 할 일',
  done: false,
  deadline: Date.now() - oneDay, // 어제
}

const meta: Meta<typeof TodoEditDialog> = {
  title: 'TodoApp/TodoEditDialog',
  component: TodoEditDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withQueryClient()],
  argTypes: {
    trigger: {
      control: false,
    },
    todo: {
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof TodoEditDialog>

// --- 스토리 정의 ---

export const Default: Story = {
  name: '기본 편집',
  args: {
    trigger: <Button variant="outline">Edit</Button>,
    todo: mockTodo,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: 'Edit' }))

    const dialog = await canvas.findByRole('dialog')
    expect(dialog).toBeInTheDocument()

    const textInput = canvas.getByDisplayValue('기존 할 일')
    expect(textInput).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본적인 할 일 편집 다이얼로그입니다. 기존 데이터가 폼에 채워져 있습니다.',
      },
    },
  },
}

export const EditText: Story = {
  name: '텍스트 수정',
  args: {
    trigger: <Button variant="outline">Edit Text</Button>,
    todo: mockTodo,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: 'Edit Text' }))

    const textInput = canvas.getByDisplayValue('기존 할 일')

    await userEvent.clear(textInput)
    await userEvent.type(textInput, '수정된 할 일')

    expect(textInput).toHaveValue('수정된 할 일')
  },
  parameters: {
    docs: {
      description: {
        story: '할 일 텍스트를 수정하는 시나리오입니다.',
      },
    },
  },
}

export const EmptyTextValidation: Story = {
  name: '빈 텍스트 유효성 검사',
  args: {
    trigger: <Button variant="outline">Test Validation</Button>,
    todo: mockTodo,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(
      canvas.getByRole('button', { name: 'Test Validation' })
    )

    const textInput = canvas.getByDisplayValue('기존 할 일')

    await userEvent.clear(textInput)
    await userEvent.click(canvas.getByRole('button', { name: 'Edit' }))

    expect(canvas.getByText('Todo text is required')).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story: '빈 텍스트로 제출할 때 유효성 검사가 작동하는지 테스트합니다.',
      },
    },
  },
}

export const LongText: Story = {
  name: '긴 텍스트',
  args: {
    trigger: <Button variant="outline">Edit Long Text</Button>,
    todo: longTextTodo,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 다이얼로그 열기
    await userEvent.click(
      canvas.getByRole('button', { name: 'Edit Long Text' })
    )

    // 긴 텍스트가 제대로 표시되는지 확인
    const textInput = canvas.getByDisplayValue(longTextTodo.text)
    expect(textInput).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 있는 할 일을 편집할 때의 UI 동작을 확인합니다.',
      },
    },
  },
}

export const ExpiredTodo: Story = {
  name: '마감일 지난 할 일',
  args: {
    trigger: <Button variant="destructive">Edit Expired</Button>,
    todo: expiredTodo,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button', { name: 'Edit Expired' }))

    expect(canvas.getByText('Deadline is in the past')).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story: '마감일이 지난 할 일을 편집하는 경우입니다.',
      },
    },
  },
}

export const InteractionFlow: Story = {
  name: '전체 편집 플로우',
  args: {
    trigger: <Button>Complete Edit Flow</Button>,
    todo: mockTodo,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(
      canvas.getByRole('button', { name: 'Complete Edit Flow' })
    )

    const textInput = canvas.getByDisplayValue('기존 할 일')
    await userEvent.clear(textInput)
    await userEvent.type(textInput, '완전히 새로운 할 일')

    const datePickerButton = canvas.getByRole('button', {
      name: /pick a date/i,
    })
    await userEvent.click(datePickerButton)

    await userEvent.click(canvas.getByRole('button', { name: 'Edit' }))
  },
  parameters: {
    docs: {
      description: {
        story:
          '전체 편집 플로우를 시뮬레이션합니다. 텍스트 수정, 날짜 선택, 제출까지의 전체 과정을 테스트합니다.',
      },
    },
  },
}
