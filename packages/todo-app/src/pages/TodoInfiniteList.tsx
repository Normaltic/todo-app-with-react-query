import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getInfiniteTodos } from "../api/getInfiniteTodos";

import TodoCard from "../components/TodoCard";
import Button from "../components/Button";

function TodoInfiniteList() {
  const ref = useRef<HTMLDivElement>(null);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["todos-infinite"],
      queryFn: ({ pageParam = 0 }) => {
        return getInfiniteTodos({ cursor: pageParam, limit: 1 });
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 0,
      select: (data) => ({
        pages: data.pages.flatMap((page) => page.todos)
      })
    });

  useEffect(() => {
    const { current } = ref;
    if (!current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="space-y-8">
      <div className="flex">
        <Link to="/">
          <Button>Back to List</Button>
        </Link>
      </div>
      {data?.pages.map((todo) => (
        <TodoCard
          key={todo.id}
          className="p-8 [&>h3]:mb-4 [&>p]:min-h-60 [&>p]:flex [&>p]:items-center"
          title={todo.title}
          description={todo.description}
          done={todo.done}
        />
      ))}
      {hasNextPage && (
        <div ref={ref} className="my-4 text-center">
          Loading more...
        </div>
      )}
    </div>
  );
}

export default TodoInfiniteList;
