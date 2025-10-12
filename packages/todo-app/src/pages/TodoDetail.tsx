import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getTodo } from "../api/getTodo";
import { deleteTodo } from "../api/deleteTodo";
import Button from "../components/Button";
import useCancellableMutation from "../hooks/useCancellableMutation";
import ToggleSwitch from "../components/ToggleSwitch";
import {
  updateTodoDone,
  type UpdateTodoDonePayload
} from "../api/updateTodoDone";

function TodoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: todo, isLoading } = useQuery({
    queryKey: ["todo", Number(id)],
    queryFn: () => getTodo(Number(id)),
    enabled: !!id
  });

  const deleteMutation = useCancellableMutation({
    mutationFn: (id: number, signal) => {
      return deleteTodo(id, { signal });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      navigate("/");
    },
    onError: (error) => {
      console.error("Failed to delete todo:", error);
    }
  });

  const updateDoneMutation = useMutation({
    mutationFn: ({
      id,
      payload
    }: {
      id: number;
      payload: UpdateTodoDonePayload;
    }) => updateTodoDone(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", Number(id)] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Failed to update todo:", error);
    }
  });

  const handleDelete = () => {
    if (id) {
      deleteMutation.mutate(Number(id));
    }
  };

  const handleCancel = () => {
    deleteMutation.cancel();
  };

  const handleToggleDone = () => {
    if (todo) {
      updateDoneMutation.mutate({ id: todo.id, payload: { done: !todo.done } });
    }
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
        <div className="mb-4">
          <ToggleSwitch
            id="todo-done"
            label={todo.done ? "Done" : "Todo"}
            checked={todo.done}
            onChange={handleToggleDone}
            disabled={updateDoneMutation.isPending}
          />
        </div>
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
