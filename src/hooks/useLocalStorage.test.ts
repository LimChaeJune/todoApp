import { renderHook, act } from '@testing-library/react'
import useLocalStorage from '@/hooks/useLocalStorage'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    },
    removeItem: (key: string) => {
      delete store[key]
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return initial value if local storage is empty', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>('testKey', 'initial')
    )
    expect(result.current[0]).toBe('initial')
  })

  it('should return the stored value from local storage', () => {
    window.localStorage.setItem('testKey', JSON.stringify('stored value'))
    const { result } = renderHook(() =>
      useLocalStorage<string>('testKey', 'initial')
    )
    expect(result.current[0]).toBe('stored value')
  })

  it('should update local storage when the value changes', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>('testKey', 'initial')
    )

    act(() => {
      result.current[1]('new value')
    })

    expect(result.current[0]).toBe('new value')
    expect(window.localStorage.getItem('testKey')).toBe(
      JSON.stringify('new value')
    )
  })

  it('should handle object values', () => {
    const initialValue = { name: 'John Doe' }
    const { result } = renderHook(() =>
      useLocalStorage<{ name: string }>('user', initialValue)
    )

    expect(result.current[0]).toEqual(initialValue)

    const newValue = { name: 'Jane Doe' }
    act(() => {
      result.current[1](newValue)
    })

    expect(result.current[0]).toEqual(newValue)
    expect(JSON.parse(window.localStorage.getItem('user')!)).toEqual(newValue)
  })

  it('should return initial value and log an error for invalid JSON', () => {
    window.localStorage.setItem('testKey', 'not a valid json')
    const { result } = renderHook(() =>
      useLocalStorage<string>('testKey', 'initial')
    )
    expect(result.current[0]).toBe('initial')
    expect(console.error).toHaveBeenCalled()
  })
})
