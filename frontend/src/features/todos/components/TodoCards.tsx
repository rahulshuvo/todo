import { FaCalendarAlt, FaCheck, FaClock } from 'react-icons/fa'
import '../styles/TodoCards.scss'
import type { Todo } from '../types'
import { RiDeleteBin5Line } from 'react-icons/ri'

interface TodoCardsProps {
  tasks: Todo[]
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
  isOverdue: (deadline?: string) => boolean
  isEmpty: boolean
  activeTab: string
}

export default function TodoCards({
  tasks,
  onToggleTask,
  onDeleteTask,
  isOverdue,
  isEmpty,
  activeTab
}: TodoCardsProps) {
  if (isEmpty) {
    const getEmptyMessage = () => {
      switch (activeTab) {
        case 'completed':
          return 'No completed tasks yet'
        case 'overdue':
          return 'No overdue tasks'
        default:
          return 'No tasks yet'
      }
    }

    return (
      <div className="todo-cards">
        <div className="todo-cards__empty">
          <p>{getEmptyMessage()}</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusInfo = (task: Todo) => {
    if (task.done) {
      return { text: 'Completed', icon: FaCheck, className: 'completed' }
    }
    if (isOverdue(task.deadline)) {
      return { text: 'Overdue', icon: FaClock, className: 'overdue' }
    }
    return { text: 'Pending', icon: FaClock, className: 'pending' }
  }

  return (
    <div className="todo-cards">
      {tasks.map((task) => {
        const status = getStatusInfo(task)
        const StatusIcon = status.icon

        return (
          <div
            key={task.id}
            className={`todo-card ${task.done ? 'todo-card--completed' : ''} ${
              isOverdue(task.deadline) && !task.done ? 'todo-card--overdue' : ''
            }`}
          >
            <div className="todo-card__content">
              <div className="todo-card__header">
                <div className="todo-card__checkbox-wrapper">
                  <input
                    type="checkbox"
                    className="todo-card__checkbox"
                    checked={task.done}
                    onChange={() => onToggleTask(task.id)}
                    aria-label={task.done ? 'Mark as incomplete' : 'Mark as complete'}
                  />
                  <div className="todo-card__checkbox-custom">
                    {task.done && <FaCheck className="todo-card__checkbox-icon" />}
                  </div>
                </div>
                <h3 
                  className={`todo-card__title ${task.done ? 'todo-card__title--completed' : ''}`}
                >
                  {task.title}
                </h3>
              </div>

              <div className="todo-card__meta">
                <div className="todo-card__info">
                  {task.deadline && (
                    <div className="todo-card__due-date">
                      <FaCalendarAlt className="todo-card__icon" />
                      <span>{formatDate(task.deadline)}</span>
                    </div>
                  )}
                  <div className={`todo-card__status todo-card__status--${status.className}`}>
                    <StatusIcon className="todo-card__icon" />
                    <span>{status.text}</span>
                  </div>
                </div>

                <div className="todo-card__actions">
                  <button
                    className="todo-card__action-btn todo-card__action-btn--delete"
                    onClick={() => onDeleteTask(task.id)}
                    aria-label="Delete task"
                  >
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
