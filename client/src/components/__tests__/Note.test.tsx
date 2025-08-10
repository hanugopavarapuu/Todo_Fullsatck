import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import Note from '../Note'

// Mock the props
const mockOnDelete = vi.fn()
const mockOnUpdate = vi.fn()

const defaultProps = {
  id: 'test-id-123',
  title: 'Test Note',
  content: 'This is a test note content',
  onDelete: mockOnDelete,
  onUpdate: mockOnUpdate
}

describe('Note Component', () => {
  beforeEach(() => {
    mockOnDelete.mockClear()
    mockOnUpdate.mockClear()
  })

  test('should edit a task and check status update', async () => {
    render(<Note {...defaultProps} />)

    // Initially should show the note content
    expect(screen.getByText('Test Note')).toBeInTheDocument()
    expect(screen.getByText('This is a test note content')).toBeInTheDocument()

    // Click edit button
    const editButton = screen.getByRole('button', { name: /edit/i })
    fireEvent.click(editButton)

    // Should show edit form
    const titleInput = screen.getByDisplayValue('Test Note')
    const contentTextarea = screen.getByDisplayValue('This is a test note content')
    const saveButton = screen.getByRole('button', { name: /save/i })

    // Edit the content
    fireEvent.change(titleInput, { target: { value: 'Updated Test Note' } })
    fireEvent.change(contentTextarea, { target: { value: 'This is updated content' } })

    // Save the changes
    fireEvent.click(saveButton)

    // Verify onUpdate was called with correct data
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith('test-id-123', {
        title: 'Updated Test Note',
        content: 'This is updated content'
      })
    })
  })

  test('should delete a task when delete button is clicked', async () => {
    render(<Note {...defaultProps} />)

    // Click delete button
    const deleteButton = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(deleteButton)

    // Verify onDelete was called with correct id
    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith('test-id-123')
    })
  })
}) 