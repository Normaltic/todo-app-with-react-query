import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getTodo } from "../api/getTodo";
import { deleteTodo } from "../api/deleteTodo";
import Button from "../components/Button";
import { useRef } from "react";

function TodoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const controllerRef = useRef<AbortController | null>(null);

  const { data: todo, isLoading } = useQuery({
    queryKey: ["todo", Number(id)],
    queryFn: () => getTodo(Number(id)),
    enabled: !!id
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      controllerRef.current = new AbortController();
      return deleteTodo(id, { signal: controllerRef.current.signal });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      navigate("/");
    }
  });

  const handleDelete = () => {
    if (id) {
      deleteMutation.mutate(Number(id));
    }
  };

  const handleCancel = () => {
    controllerRef.current?.abort();
  };

  if (isLoading) return <div>Loading...</div>;
  if (!todo) return <div>Todo not found</div>;

  return (
    <div className="p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <div className="w-32">
          <Button onClick={() => navigate("/")}>Back to List</Button>
        </div>
        <div className="w-32">
          <Button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            variant="danger"
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">{todo.title}</h1>
        <p
          className={`text-sm font-semibold mb-4 ${
            todo.done ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {todo.done ? "Done" : "Todo"}
        </p>
        <p className="text-gray-700 whitespace-pre-wrap">{todo.description}</p>
      </div>
      {deleteMutation.isPending && (
        <div className="absolute inset-0 bg-white/50 flex flex-col items-center justify-center">
          <div className="loader mb-4"></div>
          <p className="mb-4">Deleting...</p>
          <div className="w-32">
            <Button onClick={handleCancel} variant="danger">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoDetail;
