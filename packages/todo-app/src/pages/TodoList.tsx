import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getTodos } from "../api/getTodos";
import TodoCard from "../components/TodoCard";
import Pagination from "../components/Pagination";
import Button from "../components/Button";

function TodoList() {
  const [page, setPage] = useState(1);

  const { data: { todos, totalPages } = { todos: [], totalPages: 0 } } =
    useQuery({
      queryKey: ["todos", page],
      queryFn: () => getTodos({ page }),
      placeholderData: keepPreviousData,
      staleTime: 1000 * 60 * 5
    });

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Link to="/add">
          <Button>+ Add Todo</Button>
        </Link>
      </div>
      {todos.map((todo) => (
        <Link key={todo.id} to={`/todos/${todo.id}`}>
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
