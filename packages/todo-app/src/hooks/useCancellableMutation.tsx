import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

type Options<TData, TError, TVariables, TContext> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  "mutationFn"
> & {
  mutationFn: (variables: TVariables, signal: AbortSignal) => Promise<TData>;
};

function useCancellableMutation<TData, TError, TVariables, TContext>(
  options: Options<TData, TError, TVariables, TContext>
) {
  const controllerRef = useRef<AbortController | null>(null);

  const mutateResult = useMutation({
    ...options,
    mutationFn: (variables: TVariables) => {
      controllerRef.current = new AbortController();
      const { signal } = controllerRef.current;
      return options.mutationFn(variables, signal);
    },
    onSettled: (...args) => {
      controllerRef.current = null;
      options.onSettled?.(...args);
    }
  });

  const cancel = useCallback(() => {
    controllerRef.current?.abort();
  }, []);

  return { ...mutateResult, cancel };
}

export default useCancellableMutation;
