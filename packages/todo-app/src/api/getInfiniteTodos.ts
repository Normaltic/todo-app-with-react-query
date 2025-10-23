export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export const getInfiniteTodos = async ({
  cursor,
  limit = 5,
}: { cursor?: number; limit?: number; } = {}): Promise<{
  todos: Todo[];
  nextCursor: number | null;
}> => {
  const url = new URL("/api/todos/infinite", window.location.origin);
  if (cursor) {
    url.searchParams.append("cursor", cursor.toString());
  }
  url.searchParams.append("limit", limit.toString());

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Failed to fetch infinite todos");
  }
  return response.json();
};
