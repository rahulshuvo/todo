import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /todo/{id}/done:
 *   put:
 *     summary: Mark todo as done
 *     description: Update a todo to mark it as completed
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: Successfully marked todo as done
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
export const markTodoDone = async (req: Request, res: Response) => {
  const { id } = req.params;

  const todo = await prisma.todo.update({
    where: { id },
    data: { done: true },
  });

  res.json(todo);
};

/**
 * @swagger
 * /todo/{id}/undone:
 *   put:
 *     summary: Mark todo as undone
 *     description: Update a todo to mark it as not completed
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: Successfully marked todo as undone
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
export const markTodoUndone = async (req: Request, res: Response) => {
  const { id } = req.params;

  const todo = await prisma.todo.update({
    where: { id },
    data: { done: false },
  });

  res.json(todo);
};
