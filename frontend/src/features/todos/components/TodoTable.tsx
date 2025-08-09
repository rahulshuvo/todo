import type { Todo } from "../types"
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsCalendar2DateFill } from "react-icons/bs";
import "../styles/TodoTable.scss"

interface TodoTableProps {
  tasks: Todo[]
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
  isOverdue: (deadline?: string) => boolean
  isEmpty: boolean
  activeTab: string
}

export default function TodoTable({
  tasks,
  onToggleTask,
  onDeleteTask,
  isOverdue,
  isEmpty,
  activeTab,
}: TodoTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getEmptyMessage = () => {
    if (activeTab === "all" && isEmpty) return "No tasks yet. Add one above!"
    if (activeTab === "all" && !isEmpty) return "No tasks on this page."
    if (activeTab === "completed") return "No completed tasks yet."
    if (activeTab === "overdue") return "No overdue tasks."
    return "No tasks found."
  }

  return (
    <div className="todo-table">
      <div className="todo-table__container">
        <table className="todo-table__table">
          <thead className="todo-table__header">
            <tr>
              <th className="todo-table__th todo-table__th--checkbox">Done</th>
              <th className="todo-table__th todo-table__th--task">Task</th>
              <th className="todo-table__th todo-table__th--date">
                Deadline
              </th>
              <th className="todo-table__th todo-table__th--actions">Actions</th>
            </tr>
          </thead>
          <tbody className="todo-table__body">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="todo-table__empty">
                  {getEmptyMessage()}
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  className={`todo-table__row ${
                    isOverdue(task.deadline) && !task.done ? "todo-table__row--overdue" : ""
                  }`}
                >
                  <td className="todo-table__td">
                    <input
                      type="checkbox"
                      className="todo-table__checkbox"
                      checked={task.done}
                      onChange={() => onToggleTask(task.id)}
                    />
                  </td>
                  <td
                    className={`todo-table__td todo-table__td--task ${
                      task.done ? "todo-table__td--completed" : ""
                    } ${
                      isOverdue(task.deadline) && !task.done ? "todo-table__td--overdue" : ""
                    }`}
                  >
                    {task.title}
                  </td>
                  <td className="todo-table__td">
                    {task.deadline ? (
                      <div
                        className={`todo-table__deadline ${
                          isOverdue(task.deadline) && !task.done ? "todo-table__deadline--overdue" : ""
                        }`}
                      >
                        <BsCalendar2DateFill />
                        <span className="todo-table__deadline-text">
                          {formatDate(task.deadline)}
                        </span>
                      </div>
                    ) : (
                      <span className="todo-table__no-deadline">No deadline</span>
                    )}
                  </td>
                  <td className="todo-table__td">
                    <button
                      className="btn-danger todo-table__delete-button"
                      onClick={() => onDeleteTask(task.id)}
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
