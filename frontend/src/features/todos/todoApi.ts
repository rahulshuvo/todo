import api from "../../shared/utils/axios";

export const getTodos = async (email?: string, page: number = 1, limit: number = 10) => {
  const response = await api.get('/todos', {
    params: email ? { email, page, limit } : { page, limit },

  });
  return response.data;
};

export const addTodo = async (todo: { title: string; email?: string; deadline?: string }) => {
  const todoData = {
    ...todo,
    deadline: todo.deadline ? new Date(todo.deadline).toISOString() : undefined
  };
  
  const response = await api.post('/todo', todoData);
  return response.data;
};

export const updateTodo = async (id: string, isDone: boolean) => {
  const endpoint = isDone ? `/todo/${id}/done` : `/todo/${id}/undone`;
  const response = await api.put(endpoint);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await api.delete(`/todo/${id}`);
  return response.data;
};
