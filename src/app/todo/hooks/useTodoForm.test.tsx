import { renderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useTodoForm from './useTodoForm'
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

  it('should initialize with empty form for new todo', () => {
    const { result } = renderHook(() => useTodoForm(), {
      wrapper: createWrapper(),
    })

    expect(result.current.control._defaultValues).toEqual({
      text: '',
      deadline: expect.any(Date),
    })
  })

  it('should initialize with existing todo data', () => {
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

  it('should call createTodo when submitting new todo', async () => {
    const onSuccess = vi.fn()

    const { result } = renderHook(() => useTodoForm({ onSuccess }), {
      wrapper: createWrapper(),
    })

    await act(async () => {
      result.current.control.register('deadline', {
        value: new Date(),
      })
      result.current.control.register('text', {
        value: 'New todo',
      })
    })

    await act(async () => {
      const mockEvent = { preventDefault: vi.fn() } as any
      await result.current.onSubmit(mockEvent)
    })

    console.log('useCreateTodo mock result:', useCreateTodo())
    console.log('createTodo function:', result.current.control._formState)
    console.log('mockCreateTodo calls:', mockCreateTodo.mock.calls.length)

    expect(mockCreateTodo).toHaveBeenCalledTimes(1)
  })

  it('should call updateTodo when submitting existing todo', async () => {
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

    const formData = {
      text: 'Updated todo',
      deadline: new Date('2024-12-25'),
    }

    await act(async () => {
      result.current.onSubmit(formData as any)
    })

    expect(mockUpdateTodo).toHaveBeenCalledWith(
      {
        id: '1',
        todo: {
          done: false,
          text: 'Updated todo',
          deadline: new Date('2024-12-25').getTime(),
        },
      },
      {
        onSuccess: expect.any(Function),
      }
    )
  })

  it('should call onSuccess callback after successful creation', async () => {
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
      result.current.onSubmit(formData as any)
    })

    expect(onSuccess).toHaveBeenCalled()
  })

  it('should call onSuccess callback after successful update', async () => {
    const existingTodo = {
      id: 1,
      text: 'Existing todo',
      deadline: new Date().getTime(),
      done: true,
    } as Todo

    const onSuccess = vi.fn()

    // updateTodo가 성공했을 때 onSuccess 콜백이 즉시 실행되도록 모킹
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
      result.current.onSubmit(formData as any)
    })

    expect(onSuccess).toHaveBeenCalled()
  })
})
