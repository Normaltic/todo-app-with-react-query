export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};
