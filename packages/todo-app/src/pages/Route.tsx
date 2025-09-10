import { Route, Routes } from "react-router-dom";
import TodoList from "./TodoList";
import TodoAdd from "./TodoAdd";
import TodoDetail from "./TodoDetail";

const AppRoutes = () => {
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/add" element={<TodoAdd />} />
        <Route path="/todos/:id" element={<TodoDetail />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
