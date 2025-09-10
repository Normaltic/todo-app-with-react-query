export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export interface UpdateTodoPayload {
  title: string;
  description: string;
}

export const updateTodo = async (
  id: number,
  payload: UpdateTodoPayload
): Promise<Todo> => {
  const response = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
  return response.json();
};
