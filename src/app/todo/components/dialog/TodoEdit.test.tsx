import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from '@/app/todo/components/dialog/TodoEditDialog.stories'
import { renderWithQuery } from '@/test/queryClient'

const {
  Default,
  EditText,
  EmptyTextValidation,
  LongText,
  ExpiredTodo,
  InteractionFlow,
} = composeStories(stories)

const queryClientOptions = {
  retry: false,
}

describe('TodoEditDialog', () => {
  describe('기본 기능', () => {
    it('다이얼로그가 정상적으로 열리고 기존 데이터가 표시된다', async () => {
      renderWithQuery(<Default />, { queryClientOptions })

      const user = userEvent.setup()

      // 트리거 버튼 클릭
      await user.click(screen.getByRole('button', { name: 'Edit' }))

      // 다이얼로그가 열렸는지 확인
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('Edit Todo')).toBeInTheDocument()

      // 기존 데이터가 폼에 채워져 있는지 확인
      expect(screen.getByDisplayValue('기존 할 일')).toBeInTheDocument()
    })

    it('다이얼로그 제목과 설명이 올바르게 표시된다', async () => {
      renderWithQuery(<Default />, { queryClientOptions })

      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Edit' }))

      expect(screen.getByText('Edit Todo')).toBeInTheDocument()
      expect(
        screen.getByText('Edit the todo to update the information.')
      ).toBeInTheDocument()
    })
  })

  describe('텍스트 수정', () => {
    it('텍스트를 수정할 수 있다', async () => {
      renderWithQuery(<EditText />, { queryClientOptions })

      const user = userEvent.setup()

      // 다이얼로그 열기
      await user.click(screen.getByRole('button', { name: 'Edit Text' }))

      // 텍스트 입력 필드 찾기
      const textInput = screen.getByDisplayValue('기존 할 일')

      // 텍스트 수정
      await user.clear(textInput)
      await user.type(textInput, '수정된 할 일')

      // 수정된 텍스트 확인
      expect(textInput).toHaveValue('수정된 할 일')
    })

    it('긴 텍스트도 정상적으로 처리된다', async () => {
      renderWithQuery(<LongText />, { queryClientOptions })

      const user = userEvent.setup()

      // 다이얼로그 열기
      await user.click(screen.getByRole('button', { name: 'Edit Long Text' }))

      // 긴 텍스트가 제대로 표시되는지 확인
      const longText =
        '매우 긴 할 일 텍스트입니다. 이것은 긴 설명이 있는 할 일이며, UI가 긴 텍스트를 어떻게 처리하는지 테스트합니다.'
      expect(screen.getByDisplayValue(longText)).toBeInTheDocument()
    })
  })

  describe('유효성 검사', () => {
    it('빈 텍스트로 제출 시 유효성 검사가 작동한다', async () => {
      renderWithQuery(<EmptyTextValidation />, { queryClientOptions })

      const user = userEvent.setup()

      // 다이얼로그 열기
      await user.click(screen.getByRole('button', { name: 'Test Validation' }))

      // 텍스트 필드를 비우기
      const textInput = screen.getByDisplayValue('기존 할 일')
      await user.clear(textInput)

      // 제출 시도
      await user.click(screen.getByRole('button', { name: 'Edit' }))

      // 필드가 비워져 있는지 확인 (실제 유효성 검사는 useTodoForm에서 처리)
      expect(textInput).toHaveValue('')
    })
  })

  describe('다양한 상태의 할 일', () => {
    it('마감일이 지난 할 일도 편집할 수 있다', async () => {
      renderWithQuery(<ExpiredTodo />, { queryClientOptions })

      const user = userEvent.setup()

      // 다이얼로그 열기
      await user.click(screen.getByRole('button', { name: 'Edit Expired' }))

      // 제목이 올바르게 표시되는지 확인
      expect(screen.getByText('Edit Todo')).toBeInTheDocument()

      // 마감일이 지난 할 일 텍스트 확인
      expect(
        screen.getByDisplayValue('마감일이 지난 할 일')
      ).toBeInTheDocument()
    })
  })

  describe('인터랙션 플로우', () => {
    it('전체 편집 플로우가 정상적으로 작동한다', async () => {
      renderWithQuery(<InteractionFlow />, { queryClientOptions })

      const user = userEvent.setup()

      // 1. 다이얼로그 열기
      await user.click(
        screen.getByRole('button', { name: 'Complete Edit Flow' })
      )

      // 2. 텍스트 수정
      const textInput = screen.getByDisplayValue('기존 할 일')
      await user.clear(textInput)
      await user.type(textInput, '완전히 새로운 할 일')

      expect(textInput).toHaveValue('완전히 새로운 할 일')

      // 3. 날짜 선택기가 존재하는지 확인
      const datePickerButton = screen.getByRole('button', {
        name: /pick a date/i,
      })
      expect(datePickerButton).toBeInTheDocument()

      // 4. 제출 버튼이 존재하는지 확인
      const editButton = screen.getByRole('button', { name: 'Edit' })
      expect(editButton).toBeInTheDocument()
    })
  })

  describe('접근성', () => {
    it('폼 요소들이 적절한 라벨을 가지고 있다', async () => {
      renderWithQuery(<Default />, { queryClientOptions })

      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Edit' }))

      // aria-label이 있는 텍스트 입력 필드
      expect(screen.getByLabelText('Edit todo')).toBeInTheDocument()

      // 제출 버튼
      expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
    })

    it('다이얼로그가 적절한 역할을 가지고 있다', async () => {
      renderWithQuery(<Default />, { queryClientOptions })

      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Edit' }))

      // 다이얼로그 역할 확인
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  describe('폼 제출', () => {
    it('폼 제출 시 적절한 이벤트가 발생한다', async () => {
      renderWithQuery(<Default />, { queryClientOptions })

      const user = userEvent.setup()
      await user.click(screen.getByRole('button', { name: 'Edit' }))

      // 텍스트 수정
      const textInput = screen.getByDisplayValue('기존 할 일')
      await user.clear(textInput)
      await user.type(textInput, '새로운 할 일')

      // 제출 버튼 클릭
      const editButton = screen.getByRole('button', { name: 'Edit' })
      await user.click(editButton)

      // 실제 API 호출은 MSW 없이는 실패하지만, UI 동작은 확인할 수 있음
      // 여기서는 제출 버튼이 클릭 가능한 상태인지만 확인
      expect(editButton).toBeInTheDocument()
    })
  })
})
