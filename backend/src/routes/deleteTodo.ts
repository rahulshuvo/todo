import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Delete a todo
 *     description: Delete a todo item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: Successfully deleted todo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Todo not found
 */
export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.todo.delete({ where: { id } });

  res.json({ message: 'Todo deleted' });
};
