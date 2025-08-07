import { useState } from "react"
import "../styles/TodoForm.scss"

interface TodoFromProps {
  onAddTask: (title: string, deadline?: string) => Promise<void>
}

export default function TodoFrom({ onAddTask }: TodoFromProps) {
  const [newTask, setNewTask] = useState("")
  const [newDeadline, setNewDeadline] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setError("")

    if (newTask.trim().length <= 10) {
      setError("Task must be longer than 10 characters")
      return
    }

    setIsSubmitting(true)
    try {
      await onAddTask(newTask.trim(), newDeadline || undefined)
      setNewTask("")
      setNewDeadline("")
    } catch (err: unknown) {
      setError("Failed to add task")
      console.error("Failed to add task:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <div className="todo-form">
      <div className="todo-form__inputs">
        <div className="todo-form__input-group todo-form__input-group--main">
          <label htmlFor="task" className="todo-form__label">New Task</label>
          <input
            id="task"
            type="text"
            className="input"
            placeholder="Enter a task (min 11 characters)"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
          />
        </div>
        <div className="todo-form__input-group">
          <label htmlFor="deadline" className="todo-form__label">Deadline (Optional)</label>
          <input
            id="deadline"
            type="date"
            className="input"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {error && (
        <div className="todo-form__error">
          {error}
        </div>
      )}

      <button 
        className="btn-primary todo-form__submit" 
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Task"}
      </button>
    </div>
  )
}
