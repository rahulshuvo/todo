import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { setupSwagger } from './swagger'
import { getTodos } from './routes/getTodos'
import { createTodo } from './routes/createTodo'
import { markTodoDone } from './routes/updateTodo'
import { deleteTodo } from './routes/deleteTodo'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

setupSwagger(app)

// Routes
app.get('/todos', getTodos)
app.post('/todo', createTodo)
app.put('/todo/:id/done', markTodoDone)
app.delete('/todo/:id', deleteTodo)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
