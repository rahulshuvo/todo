import type { Todo } from "../types"
import "../styles/TodoTabs.scss"

interface TodoTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tasks: Todo[]
  isOverdue: (deadline?: string) => boolean
}

export default function TodoTabs({ activeTab, onTabChange, tasks, isOverdue }: TodoTabsProps) {
  const completedCount = tasks.filter((t) => t.done).length
  const overdueCount = tasks.filter((t) => isOverdue(t.deadline) && !t.done).length

  return (
    <div className="todo-tabs">
      <div className="todo-tabs__list">
        <button
          className={`todo-tabs__tab ${activeTab === "all" ? "todo-tabs__tab--active" : ""}`}
          onClick={() => onTabChange("all")}
        >
          All ({tasks.length})
        </button>
        <button
          className={`todo-tabs__tab ${activeTab === "completed" ? "todo-tabs__tab--active" : ""}`}
          onClick={() => onTabChange("completed")}
        >
          Completed ({completedCount})
        </button>
        <button
          className={`todo-tabs__tab ${activeTab === "overdue" ? "todo-tabs__tab--active" : ""}`}
          onClick={() => onTabChange("overdue")}
        >
          Overdue ({overdueCount})
        </button>
      </div>
    </div>
  )
}
