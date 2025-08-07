import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo, updateTodo, deleteTodo } from '../todoApi';

export const useAddTodo = (email?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: { title: string; email?: string; deadline?: string }) => addTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', email || 'public'] });
    },
  });
};

export const useUpdateTodo = (email?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isDone }: { id: string; isDone: boolean }) => updateTodo(id, isDone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', email || 'public'] });
    },
  });
};

export const useDeleteTodo = (email?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos', email || 'public'] });
    },
  });
};
