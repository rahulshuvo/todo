import { useState, useEffect } from 'react'
import './styles/TodoPage.scss'
import '../../shared/styles/global.scss'
import type { Todo } from './types'
import { UserStatus, EmailSetup, Pagination } from '../../shared/components'
import { TodoForm, TodoTabs, TodoTable, TodoStats } from './components'
import { useTodos, useAddTodo, useUpdateTodo, useDeleteTodo } from './hooks'

export default function TodoPage() {
  const [tasks, setTasks] = useState<Todo[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [userEmail, setUserEmail] = useState(() => {
    const email = localStorage.getItem('email')
    return email ? email : ''
  })
  const [showEmailInput, setShowEmailInput] = useState(!userEmail)

  // Load tasks with backend pagination
  const { data: todoResponse, isLoading } = useTodos(
    userEmail,
    currentPage,
    itemsPerPage
  )

  // Mutation hooks
  const addTodoMutation = useAddTodo(userEmail)
  const updateTodoMutation = useUpdateTodo(userEmail)
  const deleteTodoMutation = useDeleteTodo(userEmail)

  useEffect(() => {
    if (todoResponse) {
      setTasks(todoResponse.todos)
    }
    setLoading(isLoading)
  }, [todoResponse, isLoading])

  const addTask = async (title: string, deadline?: string) => {
    if (!title || title.trim().length <= 10) {
      console.error('Title must be longer than 10 characters')
      return
    }

    try {
      await addTodoMutation.mutateAsync({
        title: title.trim(),
        email: userEmail || undefined,
        deadline: deadline || undefined,
      })
    } catch (error) {
      console.error('Failed to add task:', error)
      throw error
    }
  }

  const toggleTask = async (id: string) => {
    try {
      const task = tasks.find((t) => t.id === id)
      if (!task) return

      const newDoneState = !task.done
      await updateTodoMutation.mutateAsync({ id, isDone: newDoneState })
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const taskToDelete = tasks.find((task) => task.id === id)
      if (!taskToDelete) return

      // Remove from UI immediately (optimistic update)
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))

      // Delete from server
      await deleteTodoMutation.mutateAsync(id)

      // Note: React Query will automatically refetch and update the cache
      // No need to manually restore on error since React Query handles it
    } catch (error) {
      console.error('Failed to delete task:', error)
      // React Query will automatically revert the optimistic update on error
    }
  }

  const isOverdue = (deadline?: string) => {
    if (!deadline) return false
    return (
      new Date(deadline) < new Date() &&
      new Date(deadline).toDateString() !== new Date().toDateString()
    )
  }

  const getFilteredTasks = () => {
    // Client-side filtering on already paginated data
    let filtered: Todo[] = []

    switch (activeTab) {
      case 'completed':
        filtered = tasks.filter((task) => task.done)
        break
      case 'overdue':
        filtered = tasks.filter(
          (task) => isOverdue(task.deadline) && !task.done
        )
        break
      default:
        filtered = tasks
    }
    return filtered
  }

  const getPaginatedTasks = () => {
    // Return filtered tasks directly since backend handles pagination
    return getFilteredTasks()
  }

  const getTotalPages = () => {
    return todoResponse?.pagination.totalPages || 1
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab])

  // Add this effect to handle when current page exceeds total pages
  useEffect(() => {
    if (
      todoResponse?.pagination.totalPages &&
      currentPage > todoResponse.pagination.totalPages
    ) {
      setCurrentPage(todoResponse.pagination.totalPages)
    }
  }, [todoResponse?.pagination.totalPages, currentPage])

  const handleEmailSet = (email: string) => {
    localStorage.setItem('email', email)
    setUserEmail(email)
    setShowEmailInput(false)
    setCurrentPage(1)
  }

  const handleEmailSkip = () => {
    localStorage.removeItem('email')
    setUserEmail('')
    setShowEmailInput(false)
  }

  const handleEmailClear = () => {
    localStorage.removeItem('email')
    setUserEmail('')
    setShowEmailInput(true)
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <div className="todo-app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="todo-app">
      <div className="todo-container">
        <header className="todo-header">
          <h1 className="todo-title">ToDo</h1>
          <UserStatus userEmail={userEmail} onClearEmail={handleEmailClear} />
        </header>

        <main className="todo-main">
          {showEmailInput ? (
            <EmailSetup
              onEmailSet={handleEmailSet}
              onEmailSkip={handleEmailSkip}
            />
          ) : (
            <div className="todo-content">
              <TodoForm onAddTask={addTask} />

              <div className="tasks-section">
                <TodoTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  tasks={tasks}
                  isOverdue={isOverdue}
                />

                <TodoTable
                  tasks={getPaginatedTasks()}
                  onToggleTask={toggleTask}
                  onDeleteTask={deleteTask}
                  isOverdue={isOverdue}
                  isEmpty={getFilteredTasks().length === 0}
                  activeTab={activeTab}
                />

                {getTotalPages() > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={getTotalPages()}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(value) => {
                      setItemsPerPage(value)
                      setCurrentPage(1)
                    }}
                  />
                )}

                <TodoStats
                  currentTasks={getPaginatedTasks().length}
                  totalTasks={todoResponse?.pagination.total || 0}
                  activeTab={activeTab}
                  currentPage={currentPage}
                  totalPages={getTotalPages()}
                  userEmail={userEmail}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
