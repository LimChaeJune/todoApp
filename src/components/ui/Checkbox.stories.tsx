import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from '@/components/ui/Checkbox'

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// 기본 체크박스
export const Default = {
  render: () => <Checkbox />,
} satisfies Story

// 체크된 상태
export const Checked = {
  render: () => <Checkbox checked />,
} satisfies Story

// 비활성화된 상태
export const Disabled = {
  render: () => <Checkbox disabled />,
} satisfies Story

// 비활성화된 체크된 상태
export const DisabledChecked = {
  render: () => <Checkbox disabled checked />,
} satisfies Story

// 상태 변경 가능한 체크박스
const InteractiveComponent = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(value) => setChecked(value === true)}
    />
  )
}

export const Interactive = {
  render: () => <InteractiveComponent />,
} satisfies Story

// 레이블과 함께
const WithLabelComponent = () => {
  const [checked, setChecked] = useState(false)

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        이용약관에 동의합니다
      </label>
    </div>
  )
}

export const WithLabel = {
  render: () => <WithLabelComponent />,
} satisfies Story

// 설명과 함께
const WithDescriptionComponent = () => {
  const [checked, setChecked] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="marketing"
          checked={checked}
          onCheckedChange={(value) => setChecked(value === true)}
        />
        <label
          htmlFor="marketing"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          마케팅 정보 수신 동의
        </label>
      </div>
      <p className="text-xs text-muted-foreground ml-6">
        이벤트, 쿠폰, 할인 정보 등을 이메일로 받아보실 수 있습니다.
      </p>
    </div>
  )
}

export const WithDescription = {
  render: () => <WithDescriptionComponent />,
} satisfies Story

// 여러 개의 체크박스
const MultipleCheckboxesComponent = () => {
  const [preferences, setPreferences] = useState({
    email: false,
    sms: false,
    push: false,
  })

  const handleChange =
    (key: keyof typeof preferences) => (checked: boolean) => {
      setPreferences((prev) => ({ ...prev, [key]: checked }))
    }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">알림 설정</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="email"
            checked={preferences.email}
            onCheckedChange={handleChange('email')}
          />
          <label htmlFor="email" className="text-sm">
            이메일 알림
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sms"
            checked={preferences.sms}
            onCheckedChange={handleChange('sms')}
          />
          <label htmlFor="sms" className="text-sm">
            SMS 알림
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="push"
            checked={preferences.push}
            onCheckedChange={handleChange('push')}
          />
          <label htmlFor="push" className="text-sm">
            푸시 알림
          </label>
        </div>
      </div>
    </div>
  )
}

export const MultipleCheckboxes = {
  render: () => <MultipleCheckboxesComponent />,
} satisfies Story

// 전체 선택/해제
const SelectAllComponent = () => {
  const [items, setItems] = useState([
    { id: 'item1', label: '항목 1', checked: false },
    { id: 'item2', label: '항목 2', checked: false },
    { id: 'item3', label: '항목 3', checked: false },
  ])

  const allChecked = items.every((item) => item.checked)
  const someChecked = items.some((item) => item.checked)

  const handleSelectAll = (checked: boolean) => {
    setItems((items) => items.map((item) => ({ ...item, checked })))
  }

  const handleItemChange = (id: string) => (checked: boolean) => {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, checked } : item))
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="select-all"
          checked={allChecked}
          ref={(ref) => {
            if (ref)
              (ref as HTMLInputElement).indeterminate =
                someChecked && !allChecked
          }}
          onCheckedChange={(value) => handleSelectAll(value === true)}
        />
        <label htmlFor="select-all" className="text-sm font-medium">
          전체 선택
        </label>
      </div>
      <div className="ml-4 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={item.id}
              checked={item.checked}
              onCheckedChange={handleItemChange(item.id)}
            />
            <label htmlFor={item.id} className="text-sm">
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export const SelectAll = {
  render: () => <SelectAllComponent />,
} satisfies Story

// 모든 상태 비교
export const AllStates = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox />
          <span className="text-sm">기본</span>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox checked />
          <span className="text-sm">체크됨</span>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox disabled />
          <span className="text-sm">비활성화</span>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox disabled checked />
          <span className="text-sm">비활성화 + 체크됨</span>
        </div>
      </div>
    </div>
  ),
} satisfies Story

// 폼에서 사용
const InFormComponent = () => {
  const [formData, setFormData] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form data:', formData)
  }

  const handleChange = (key: keyof typeof formData) => (checked: boolean) => {
    setFormData((prev) => ({ ...prev, [key]: checked }))
  }

  const canSubmit = formData.terms && formData.privacy

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms-form"
            checked={formData.terms}
            onCheckedChange={handleChange('terms')}
          />
          <label htmlFor="terms-form" className="text-sm">
            이용약관에 동의합니다 <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="privacy-form"
            checked={formData.privacy}
            onCheckedChange={handleChange('privacy')}
          />
          <label htmlFor="privacy-form" className="text-sm">
            개인정보 처리방침에 동의합니다{' '}
            <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="marketing-form"
            checked={formData.marketing}
            onCheckedChange={handleChange('marketing')}
          />
          <label htmlFor="marketing-form" className="text-sm">
            마케팅 정보 수신에 동의합니다 (선택)
          </label>
        </div>
      </div>
      <button
        type="submit"
        disabled={!canSubmit}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        가입하기
      </button>
    </form>
  )
}

export const InForm = {
  render: () => <InFormComponent />,
} satisfies Story
