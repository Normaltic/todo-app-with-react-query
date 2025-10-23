import { Route, Routes } from "react-router-dom";
import TodoList from "./TodoList";
import TodoAdd from "./TodoAdd";
import TodoDetail from "./TodoDetail";
import TodoSelect from "./TodoSelect";
import TodoInfiniteList from "./TodoInfiniteList";

const AppRoutes = () => {
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/add" element={<TodoAdd />} />
        <Route path="/todos/:id" element={<TodoDetail />} />
        <Route path="/select" element={<TodoSelect />} />
        <Route path="/infinite" element={<TodoInfiniteList />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
