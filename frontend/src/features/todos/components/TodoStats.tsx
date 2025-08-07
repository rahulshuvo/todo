import "../styles/TodoStats.scss"

interface TodoStatsProps {
  currentTasks: number
  totalTasks: number
  activeTab: string
  currentPage: number
  totalPages: number
  userEmail: string
}

export default function TodoStats({
  currentTasks,
  totalTasks,
  activeTab,
  currentPage,
  totalPages,
  userEmail,
}: TodoStatsProps) {
  const getTabLabel = () => {
    switch (activeTab) {
      case "completed":
        return "completed"
      case "overdue":
        return "overdue"
      default:
        return "total"
    }
  }

  return (
    <div className="todo-stats">
      <div className="todo-stats__info">
        <span>
          Showing {currentTasks} of {totalTasks} {getTabLabel()} tasks
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          {userEmail ? " (Private)" : " (Public)"}
        </span>
      </div>
    </div>
  )
}
