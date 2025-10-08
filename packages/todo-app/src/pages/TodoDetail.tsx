import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getTodo } from "../api/getTodo";
import { deleteTodo } from "../api/deleteTodo";
import Button from "../components/Button";

function TodoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: todo,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["todo", Number(id)],
    queryFn: () => getTodo(Number(id)),
    enabled: !!id
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching todo</div>;
  if (!todo) return <div>Todo not found</div>;

  return (
    <div className="p-4">
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
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
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
    </div>
  );
}

export default TodoDetail;
