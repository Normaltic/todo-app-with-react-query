import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/getTodos";
import TodoCard from "../components/TodoCard";

function TodoList() {
  const { data: todos = [], isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos()
  });

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-40">Loading...</div>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          title={todo.title}
          description={todo.description}
          done={todo.done}
        />
      ))}
    </section>
  );
}

export default TodoList;
