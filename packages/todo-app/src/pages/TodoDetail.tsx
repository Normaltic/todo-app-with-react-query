import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getTodo } from "../api/getTodo";
import { deleteTodo } from "../api/deleteTodo";
import Button from "../components/Button";
import useCancellableMutation from "../hooks/useCancellableMutation";
import ToggleSwitch from "../components/ToggleSwitch";
import { updateTodoDone, type Todo } from "../api/updateTodoDone";

function TodoDetail() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: todo, isLoading } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => getTodo(id),
    enabled: !!id,
    staleTime: 1000, // 5 minutes
    refetchOnWindowFocus: true
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
    mutationKey: ["updateTodoDone", id],
    mutationFn: (done: boolean) => updateTodoDone(id, { done }),
    onMutate: async (done) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      await queryClient.cancelQueries({ queryKey: ["todo", id] });

      const previousTodo = queryClient.getQueryData<Todo>(["todo", id]);

      if (previousTodo) {
        queryClient.setQueryData<Todo>(["todo", id], {
          ...previousTodo,
          done
        });
      }

      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old?.map((todo) => (todo.id === id ? { ...todo, done } : todo))
      );

      return { previousTodo };
    },
    onError: (err, _, context) => {
      const previousTodo = context?.previousTodo;
      if (previousTodo) {
        queryClient.setQueryData(["todo", id], previousTodo);
        queryClient.setQueryData<Todo[]>(["todos"], (old) =>
          old?.map((todo) => (todo?.id === id ? previousTodo : todo))
        );
      }
      console.error("Failed to update todo:", err);
    },
    onSettled: () => {
      if (
        queryClient.isMutating({ mutationKey: ["updateTodoDone", id] }) === 1
      ) {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        queryClient.invalidateQueries({ queryKey: ["todo", id] });
      }
    }
  });

  const handleDelete = () => {
    if (id) {
      deleteMutation.mutate(id);
    }
  };

  const handleCancel = () => {
    deleteMutation.cancel();
  };

  const handleToggleDone = () => {
    if (todo) {
      updateDoneMutation.mutate(!todo.done);
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
