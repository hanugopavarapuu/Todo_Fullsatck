import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import CreateArea from '../CreateArea'

// Mock the onAdd prop
const mockOnAdd = vi.fn()

describe('CreateArea Component', () => {
  beforeEach(() => {
    mockOnAdd.mockClear()
  })

  test('should add a task and check if it appears in the form', async () => {
    render(<CreateArea onAdd={mockOnAdd} />)

    // Get form elements
    const titleInput = screen.getByPlaceholderText('Title')
    const contentTextarea = screen.getByPlaceholderText('Take a note...')
    const addButton = screen.getByRole('button', { name: /add/i })

    // Fill in the form
    fireEvent.change(titleInput, { target: { value: 'Test Task' } })
    fireEvent.change(contentTextarea, { target: { value: 'This is a test task content' } })

    // Verify the form is filled
    expect(titleInput).toHaveValue('Test Task')
    expect(contentTextarea).toHaveValue('This is a test task content')

    // Submit the form
    fireEvent.click(addButton)

    // Wait for the form to be processed
    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith({
        title: 'Test Task',
        content: 'This is a test task content'
      })
    })

    // Verify the form is cleared after submission
    expect(titleInput).toHaveValue('')
    expect(contentTextarea).toHaveValue('')
  })

  test('should not submit empty form', async () => {
    render(<CreateArea onAdd={mockOnAdd} />)

    const addButton = screen.getByRole('button', { name: /add/i })

    // Try to submit empty form
    fireEvent.click(addButton)

    // Verify onAdd was not called
    expect(mockOnAdd).not.toHaveBeenCalled()
  })
}) 