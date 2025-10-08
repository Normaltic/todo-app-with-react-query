import {
  useQuery,
  useQueries,
  type UseQueryResult
} from "@tanstack/react-query";
import { useState } from "react";
import { getTodos } from "../api/getTodos";
import { getTodo } from "../api/getTodo";
import TodoCard from "../components/TodoCard";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";

const combineQueries = (
  results: UseQueryResult<Awaited<ReturnType<typeof getTodo>>>[]
) => {
  return {
    data: results
      .map((result) => result.data)
      .filter((todo) => todo !== undefined),
    isLoading: results.some((result) => result.isLoading)
  };
};

function TodoSelect() {
  const [selectedTodoIds, setSelectedTodoIds] = useState<number[]>([]);
  const [submittedIds, setSubmittedIds] = useState<number[]>([]);

  const { data: todosData, isLoading: isTodosLoading } = useQuery({
    queryKey: ["todos", "all"],
    queryFn: () => getTodos({ page: 1, pageSize: 100 })
  });

  const { data: selectedTodos, isLoading: isSelectedTodosLoading } = useQueries(
    {
      queries: submittedIds.map((id) => ({
        queryKey: ["todo", id],
        queryFn: () => getTodo(id)
      })),
      combine: combineQueries
    }
  );

  const handleCheckboxChange = (id: number) => {
    setSelectedTodoIds((prev) =>
      prev.includes(id) ? prev.filter((todoId) => todoId !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    setSubmittedIds(selectedTodoIds);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select Todos</h1>
      {isTodosLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mb-4">
          {todosData?.todos.map((todo) => (
            <Checkbox
              key={todo.id}
              id={`todo-${todo.id}`}
              label={`[${todo.id}] ${todo.title}`}
              checked={selectedTodoIds.includes(todo.id)}
              onChange={() => handleCheckboxChange(todo.id)}
            />
          ))}
        </div>
      )}

      <div className="w-32">
        <Button onClick={handleSubmit} disabled={isTodosLoading}>
          Submit
        </Button>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Selected Todos</h2>
      <div className="flex flex-col gap-4">
        {isSelectedTodosLoading && <div>Loading selected todos...</div>}
        {selectedTodos &&
          selectedTodos.map(({ id, title, description, done }) => (
            <TodoCard
              key={id}
              title={title}
              description={description}
              done={done}
            />
          ))}
      </div>
    </div>
  );
}

export default TodoSelect;
