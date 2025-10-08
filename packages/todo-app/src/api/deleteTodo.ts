export const deleteTodo = async (
  id: number,
  { signal }: { signal?: AbortSignal } = {}
): Promise<void> => {
  const response = await fetch(`/api/todos/${id}`, {
    method: "DELETE",
    signal
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};
