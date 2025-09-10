export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`/api/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};
