import { Route, Routes } from "react-router-dom";
import TodoList from "./TodoList";
import TodoAdd from "./TodoAdd";
import TodoDetail from "./TodoDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/add" element={<TodoAdd />} />
      <Route path="/todos/:id" element={<TodoDetail />} />
    </Routes>
  );
};

export default AppRoutes;
