export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export interface AddTodoPayload {
  title: string;
  description: string;
  done?: boolean;
}

export const addTodo = async (payload: AddTodoPayload): Promise<Todo> => {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
  return response.json();
};
