export interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export const TODOS: Todo[] = [
  {
    id: 1,
    title: "블로그 1편 글 쓰기",
    description: "react-query 기본 학습 방법에 대한 블로그 글 쓰기",
    done: false,
  },
  {
    id: 2,
    title: "코딩 하기",
    description: "블로그 글 용 예제 코드 작성하기",
    done: false,
  },
  {
    id: 3,
    title: "블로그 2편 목차 정리하기",
    description: "react-query 추가 기능에 대한 블로그 목차 정리하기",
    done: false,
  },
];
