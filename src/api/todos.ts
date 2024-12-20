import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2181;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postTodos = async (data: any) => {
  try {
    const response = await client.post<Todo>('/todos', {
      ...data,
      userId: USER_ID,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
// Add more methods here
