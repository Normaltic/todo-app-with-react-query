export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch("http://localhost:8080/todos");
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};
