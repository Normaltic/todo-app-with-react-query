export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export interface UpdateTodoDonePayload {
  done: boolean;
}

export const updateTodoDone = async (
  id: number,
  payload: UpdateTodoDonePayload
): Promise<Todo> => {
  const response = await fetch(`/api/todos/${id}/done`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Failed to update todo done status");
  }
  return response.json();
};
