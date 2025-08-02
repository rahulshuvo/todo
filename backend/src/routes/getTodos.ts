import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     description: Retrieve todos, optionally filtered by email. If no email is provided, returns public todos.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Email to filter todos by
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getTodos = async (req: Request, res: Response) => {
  const { email } = req.query;
  try {
    const todos = await prisma.todo.findMany({
      where: email ? { email: String(email) } : { email: null }, // if email is provided, filter by it, else return public todos
      orderBy: { createdAt: 'desc' },
    });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
