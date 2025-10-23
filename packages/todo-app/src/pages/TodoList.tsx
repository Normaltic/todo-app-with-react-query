import {
  keepPreviousData,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getTodos } from "../api/getTodos";
import TodoCard from "../components/TodoCard";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import { getTodo } from "../api/getTodo";

function TodoList() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);

  const { data: { todos, totalPages } = { todos: [], totalPages: 0 } } =
    useQuery({
      queryKey: ["todos", page],
      queryFn: () => getTodos({ page }),
      placeholderData: keepPreviousData,
      staleTime: 1000 * 60 * 5
    });

  const handlePrefetch = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["todo", id],
      queryFn: () => getTodo(id),
      staleTime: 1000 * 60 * 5
    });
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Link to="/infinite">
          <Button>Infinite list</Button>
        </Link>
        <Link to="/add">
          <Button>+ Add Todo</Button>
        </Link>
      </div>
      {todos.map((todo) => (
        <Link
          key={todo.id}
          to={`/todos/${todo.id}`}
          onMouseEnter={() => handlePrefetch(todo.id)}
        >
          <TodoCard
            title={todo.title}
            description={todo.description}
            done={todo.done}
          />
        </Link>
      ))}
      <Pagination current={page} total={totalPages} onPageChange={setPage} />
    </section>
  );
}

export default TodoList;
