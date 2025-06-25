import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Calendar } from '@/components/ui/Calender'

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

// 기본 캘린더
export const Default = {
  render: () => <Calendar mode="single" selected={new Date()} />,
} satisfies Story

// 단일 날짜 선택
const SingleDateComponent = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return <Calendar mode="single" selected={date} onSelect={setDate} />
}

export const SingleDate = {
  render: () => <SingleDateComponent />,
} satisfies Story

// 외부 날짜 숨기기
export const HideOutsideDays = {
  render: () => (
    <Calendar mode="single" showOutsideDays={false} selected={new Date()} />
  ),
} satisfies Story

// 드롭다운 캡션
export const DropdownCaption = {
  render: () => (
    <Calendar mode="single" captionLayout="dropdown" selected={new Date()} />
  ),
} satisfies Story

// 다른 버튼 variant
export const OutlineButtons = {
  render: () => (
    <Calendar mode="single" buttonVariant="outline" selected={new Date()} />
  ),
} satisfies Story

export const GhostButtons = {
  render: () => (
    <Calendar mode="single" buttonVariant="ghost" selected={new Date()} />
  ),
} satisfies Story

// 날짜 제한
const WithDateLimitsComponent = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const today = new Date()
  const nextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  )

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={(date) => date < today || date > nextMonth}
    />
  )
}

export const WithDateLimits = {
  render: () => <WithDateLimitsComponent />,
} satisfies Story

// 특정 날짜 비활성화 (주말)
const DisableWeekendsComponent = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // 일요일(0) 또는 토요일(6)
  }

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={isWeekend}
    />
  )
}

export const DisableWeekends = {
  render: () => <DisableWeekendsComponent />,
} satisfies Story

// 여러 달 표시
export const MultipleMonths = {
  render: () => (
    <Calendar mode="single" numberOfMonths={2} selected={new Date()} />
  ),
} satisfies Story

// 커스텀 포매터
export const CustomFormatter = {
  render: () => (
    <Calendar
      mode="single"
      selected={new Date()}
      formatters={{
        formatCaption: (date: Date) => {
          return `${date.getFullYear()}년 ${date.getMonth() + 1}월`
        },
      }}
    />
  ),
} satisfies Story

// 모든 레이아웃 비교
export const AllLayouts = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h3 className="mb-2 text-sm font-medium">Label Caption</h3>
        <Calendar mode="single" captionLayout="label" selected={new Date()} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Dropdown Caption</h3>
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={new Date()}
        />
      </div>
    </div>
  ),
} satisfies Story

// 모든 버튼 variant 비교
export const AllButtonVariants = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h3 className="mb-2 text-sm font-medium">Default Buttons</h3>
        <Calendar mode="single" buttonVariant="default" selected={new Date()} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Ghost Buttons</h3>
        <Calendar mode="single" buttonVariant="ghost" selected={new Date()} />
      </div>
    </div>
  ),
} satisfies Story
