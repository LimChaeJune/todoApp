import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// 기본
export const Default = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
} satisfies Story

// 타입별
export const Email = {
  args: {
    type: 'email',
    placeholder: '이메일을 입력하세요',
  },
} satisfies Story

export const Password = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
} satisfies Story

// 상태별
export const Disabled = {
  args: {
    placeholder: '비활성화된 입력 필드',
    disabled: true,
  },
} satisfies Story

export const WithValue = {
  args: {
    value: '기본 값',
  },
} satisfies Story

// 모든 타입 비교
export const AllTypes = {
  render: () => (
    <div className="space-y-2">
      <Input type="text" placeholder="text" />
      <Input type="email" placeholder="email" />
      <Input type="password" placeholder="password" />
      <Input type="number" placeholder="number" />
    </div>
  ),
} satisfies Story
