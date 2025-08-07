export interface Task {
  id: string
  title: string
  done: boolean
  deadline?: string
  email?: string | null
  createdAt: string
}
