import { useState } from "react"
import { FaCalendarAlt } from 'react-icons/fa'
import '../styles/TodoForm.scss'

interface TodoFromProps {
  onAddTask: (title: string, deadline?: string) => Promise<void>
}

export default function TodoFrom({ onAddTask }: TodoFromProps) {
  const [newTask, setNewTask] = useState('')
  const [newDeadline, setNewDeadline] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setError('')

    if (newTask.trim().length <= 10) {
      setError('Task must be longer than 10 characters')
      return
    }

    setIsSubmitting(true)
    try {
      await onAddTask(newTask.trim(), newDeadline || undefined)
      setNewTask('')
      setNewDeadline('')
    } catch (err: unknown) {
      setError('Failed to add task')
      console.error('Failed to add task:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleCalendarClick = () => {
    const dateInput = document.getElementById(
      'deadline-mobile'
    ) as HTMLInputElement
    if (dateInput) {
      dateInput.showPicker()
    }
  }

  return (
    <div className="todo-form">
      <div className="todo-form__inputs">
        <div className="todo-form__input-group todo-form__input-group--main">
          <div className="todo-form__label-row">
            <label htmlFor="task" className="todo-form__label">
              New Task
            </label>
            {newDeadline && (
              <span className="todo-form__selected-deadline">
                {new Date(newDeadline).toLocaleDateString()}
              </span>
            )}
          </div>
          <div className="todo-form__input-wrapper">
            <input
              id="task"
              type="text"
              className="input todo-form__task-input"
              placeholder="Enter a task (more than 10 characters)"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSubmitting}
            />
            <button
              type="button"
              className="todo-form__deadline-toggle"
              onClick={handleCalendarClick}
              aria-label="Set deadline"
            >
              <FaCalendarAlt />
            </button>
            <input
              id="deadline-mobile"
              type="date"
              className="todo-form__deadline-input-hidden"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="todo-form__input-group todo-form__input-group--desktop">
          <label htmlFor="deadline-desktop" className="todo-form__label">
            Deadline (Optional)
          </label>
          <input
            id="deadline-desktop"
            type="date"
            className="input"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {error && <div className="todo-form__error">{error}</div>}

      <button
        className="btn-primary todo-form__submit"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </div>
  )
}
