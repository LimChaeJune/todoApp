/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useTodoForm from '@/app/todo/hooks/useTodoForm'
import useCreateTodo from '@/app/todo/api/mutations/useCreateTodo'
import useUpdateTodo from '@/app/todo/api/mutations/useUpdateTodo'
import { Todo } from '@/app/todo/types/model'

// API 훅들 모킹
vi.mock('@/app/todo/api/mutations/useCreateTodo')
vi.mock('@/app/todo/api/mutations/useUpdateTodo')

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useTodoForm', () => {
  const mockCreateTodo = vi.fn()
  const mockUpdateTodo = vi.fn()

  beforeEach(() => {
    vi.mocked(useCreateTodo).mockReturnValue({
      mutate: mockCreateTodo,
      isLoading: false,
      error: null,
    } as any)

    vi.mocked(useUpdateTodo).mockReturnValue({
      mutate: mockUpdateTodo,
      isLoading: false,
      error: null,
    } as any)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('새로운 할 일을 추가할 때 빈 폼으로 초기화된다', () => {
    const { result } = renderHook(() => useTodoForm(), {
      wrapper: createWrapper(),
    })

    expect(result.current.control._defaultValues).toEqual({
      text: '',
      deadline: expect.any(Date),
    })
  })

  it('기존 값으로 상태가 초기화 된다.', () => {
    const existingTodo = {
      id: 1,
      text: 'Existing todo',
      deadline: new Date('2024-12-25').getTime(),
      done: false,
    } as Todo

    const { result } = renderHook(() => useTodoForm({ todo: existingTodo }), {
      wrapper: createWrapper(),
    })

    expect(result.current.control._defaultValues).toEqual({
      text: 'Existing todo',
      deadline: new Date('2024-12-25'),
    })
  })

  it('text가 비어있을 때 유효성 검사 오류가 표시된다', async () => {
    const { result } = renderHook(() => useTodoForm(), {
      wrapper: createWrapper(),
    })

    await act(async () => {
      result.current.setValue('text', '', { shouldValidate: true })
      result.current.setValue('deadline', new Date(), { shouldValidate: true })
    })

    await act(async () => {
      const mockEvent = { preventDefault: vi.fn() } as any
      await result.current.onSubmit(mockEvent)
    })

    expect(result.current.errors.text).toBeDefined()
    expect(mockCreateTodo).toHaveBeenCalledTimes(0)
  })

  it('deadline이 과거일 때 유효성 검사 오류가 표시된다', async () => {
    const { result } = renderHook(() => useTodoForm(), {
      wrapper: createWrapper(),
    })

    await act(async () => {
      result.current.setValue('text', 'a', {
        shouldValidate: true,
      })
      result.current.setValue(
        'deadline',
        new Date(Date.now() - 24 * 60 * 60 * 1000),
        {
          shouldValidate: true,
        }
      )
    })

    await act(async () => {
      const mockEvent = { preventDefault: vi.fn() } as any
      await result.current.onSubmit(mockEvent)
    })

    expect(result.current.errors.deadline).toBeDefined()
    expect(mockCreateTodo).toHaveBeenCalledTimes(0)
  })

  it('새로운 값을 제출할 때 createTodo가 호출된다', async () => {
    const onSuccess = vi.fn()

    const { result } = renderHook(() => useTodoForm({ onSuccess }), {
      wrapper: createWrapper(),
    })

    const deadline = new Date()
    const text = 'New todo'

    await act(async () => {
      result.current.setValue('deadline', deadline)
      result.current.setValue('text', text)
    })

    await act(async () => {
      const mockEvent = { preventDefault: vi.fn() } as any
      await result.current.onSubmit(mockEvent)
    })

    expect(mockCreateTodo).toHaveBeenCalledWith(
      {
        done: false,
        text,
        deadline: deadline.getTime(),
      },
      {
        onSuccess: expect.any(Function),
      }
    )
  })

  it('기존 값이 있는 상태에서 제출할 때 updateTodo가 호출된다', async () => {
    const existingTodo = {
      id: 1,
      text: 'Existing todo',
      deadline: new Date('2024-12-20').getTime(),
      done: false,
    } as Todo

    const onSuccess = vi.fn()

    const { result } = renderHook(
      () => useTodoForm({ todo: existingTodo, onSuccess }),
      { wrapper: createWrapper() }
    )

    const deadline = new Date()
    const text = 'Updated todo'

    await act(async () => {
      result.current.setValue('deadline', deadline)
      result.current.setValue('text', text)
    })

    await act(async () => {
      const mockEvent = { preventDefault: vi.fn() } as any
      await result.current.onSubmit(mockEvent)
    })

    expect(mockUpdateTodo).toHaveBeenCalledWith(
      {
        id: 1,
        todo: {
          done: false,
          text,
          deadline: deadline.getTime(),
        },
      },
      {
        onSuccess: expect.any(Function),
      }
    )
  })

  it('create 성공 후 onSuccess 콜백이 호출된다.', async () => {
    const onSuccess = vi.fn()

    mockCreateTodo.mockImplementation((data, options) => {
      options.onSuccess()
    })

    const { result } = renderHook(() => useTodoForm({ onSuccess }), {
      wrapper: createWrapper(),
    })

    const formData = {
      text: 'New todo',
      deadline: new Date(),
    }

    await act(async () => {
      result.current.setValue('deadline', formData.deadline)
      result.current.setValue('text', formData.text)
    })

    await act(async () => {
      const mockEvent = { preventDefault: vi.fn() } as any
      await result.current.onSubmit(mockEvent)
    })

    expect(onSuccess).toHaveBeenCalled()
  })

  it('update 성공 후 onSuccess 콜백이 호출된다.', async () => {
    const existingTodo = {
      id: 1,
      text: 'Existing todo',
      deadline: new Date().getTime(),
      done: true,
    } as Todo

    const onSuccess = vi.fn()

    mockUpdateTodo.mockImplementation((data, options) => {
      options.onSuccess()
    })

    const { result } = renderHook(
      () => useTodoForm({ todo: existingTodo, onSuccess }),
      { wrapper: createWrapper() }
    )

    const formData = {
      text: 'Updated todo',
      deadline: new Date(),
    }

    await act(async () => {
      result.current.setValue('deadline', formData.deadline)
      result.current.setValue('text', formData.text)
    })

    await act(async () => {
      const mockEvent = { preventDefault: vi.fn() } as any
      await result.current.onSubmit(mockEvent)
    })

    expect(onSuccess).toHaveBeenCalled()
  })
})
