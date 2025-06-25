import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/components/ui/Badge'
import { Check } from 'lucide-react'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    asChild: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 배지
export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

// 모든 variant들
export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Error',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

// 실제 사용 예시들
export const Status: Story = {
  args: {
    variant: 'default',
    children: 'Active',
  },
}

export const Count: Story = {
  args: {
    variant: 'secondary',
    children: '99+',
  },
}

export const Warning: Story = {
  args: {
    variant: 'destructive',
    children: 'Deprecated',
  },
}

export const Tag: Story = {
  args: {
    variant: 'outline',
    children: 'React',
  },
}

// 아이콘과 함께
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Check />
      </>
    ),
  },
}

export const WithDot: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <div className="w-2 h-2 bg-current rounded-full" />
        Live
      </>
    ),
  },
}

// 모든 variant 한번에 보기
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

// 실제 사용 시나리오들
export const TodoStatus: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">Todo</Badge>
      <Badge variant="secondary">In Progress</Badge>
      <Badge variant="default">Completed</Badge>
      <Badge variant="destructive">Overdue</Badge>
    </div>
  ),
}

export const Priority: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">Low</Badge>
      <Badge variant="secondary">Medium</Badge>
      <Badge variant="default">High</Badge>
      <Badge variant="destructive">Critical</Badge>
    </div>
  ),
}

export const Categories: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">Frontend</Badge>
      <Badge variant="outline">Backend</Badge>
      <Badge variant="outline">Design</Badge>
      <Badge variant="outline">Testing</Badge>
      <Badge variant="outline">DevOps</Badge>
    </div>
  ),
}

// 다양한 길이의 텍스트
export const TextLength: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Badge>A</Badge>
        <Badge>New</Badge>
        <Badge>Feature</Badge>
        <Badge>Long Badge Text</Badge>
        <Badge>Very Long Badge Text That Might Wrap</Badge>
      </div>
    </div>
  ),
}

// 링크로 사용
export const AsLink: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge asChild>
        <a href="#" className="cursor-pointer">
          Clickable Badge
        </a>
      </Badge>
      <Badge variant="outline" asChild>
        <a href="#" className="cursor-pointer">
          Link Badge
        </a>
      </Badge>
    </div>
  ),
}

// 버튼으로 사용
export const AsButton: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge asChild>
        <button onClick={() => alert('Badge clicked!')}>Click me</button>
      </Badge>
      <Badge variant="destructive" asChild>
        <button onClick={() => alert('Remove clicked!')}>✕ Remove</button>
      </Badge>
    </div>
  ),
}
