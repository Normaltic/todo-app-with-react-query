export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export const getTodo = async (id: number): Promise<Todo> => {
  const response = await fetch(`/api/todos/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch todo");
  }
  return response.json();
};
