import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { title, deadline, email } = req.body;

  if (!title || title.length <= 10) {
    return res.status(400).json({ error: 'Task must be longer than 10 characters.' });
  }

  const task = await prisma.task.create({
    data: { title, deadline, email },
  });

  res.json(task);
});

app.put('/tasks/:id/done', async (req, res) => {
  const { id } = req.params;

  const task = await prisma.task.update({
    where: { id },
    data: { done: true },
  });

  res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  await prisma.task.delete({ where: { id } });

  res.json({ message: 'Task deleted' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
