export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export const getTodos = async ({
  page = 1
}: {
  page?: number;
} = {}): Promise<{
  todos: Todo[];
  totalPages: number;
}> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
  const response = await fetch(`/api/todos?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};
