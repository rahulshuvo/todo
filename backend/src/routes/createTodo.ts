import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Create a new todo
 *     description: Create a new todo item with title, optional deadline and email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 11
 *                 description: Todo title (must be longer than 10 characters)
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 description: Optional deadline for the todo
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Optional email to associate with the todo
 *     responses:
 *       200:
 *         description: Successfully created todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const createTodo = async (req: Request, res: Response) => {
  const { title, deadline, email } = req.body;

  if (!title || title.length <= 10) {
    return res
      .status(400)
      .json({ error: 'Todo must be longer than 10 characters.' });
  }

  const todo = await prisma.todo.create({
    data: { title, deadline, email },
  });

  res.json(todo);
};
