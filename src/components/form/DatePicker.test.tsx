import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DatePicker from '@/components/form/DatePicker'

describe('DatePicker', () => {
  it('should render with the provided date', () => {
    const date = new Date(2025, 6, 24)
    render(<DatePicker value={date} />)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent(date.toLocaleDateString())
  })

  it('should render with today date if no value is provided', () => {
    const today = new Date()
    render(<DatePicker />)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent(today.toLocaleDateString())
  })

  it('should open the calendar on button click', async () => {
    const user = userEvent.setup()
    render(<DatePicker />)

    const button = screen.getByRole('button')
    await user.click(button)

    // "day" 모드를 가진 캘린더가 열렸는지 확인
    const calendar = await screen.findByRole('grid')
    expect(calendar).toBeInTheDocument()
  })

  it('should call onChange with the selected date', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const initialDate = new Date(2025, 5, 20)
    render(<DatePicker value={initialDate} onChange={handleChange} />)

    const button = screen.getByRole('button')
    await user.click(button)

    const calendar = await screen.findByRole('grid')

    const day25Button = within(calendar).getByText('25')
    await user.click(day25Button)

    const expectedDate = new Date(2025, 5, 25)
    expect(handleChange).toHaveBeenCalledWith(expectedDate)
  })
})
