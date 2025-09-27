import express from "express";
import { Todo, TODOS } from "./data/todo";

const app = express();
const port = 8080;

let todos: Todo[] = [...TODOS];

app.use(express.json());

// Get all todos
app.get("/todos", (req, res) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const pageSize = 5;
  const totalPages = Math.ceil(todos.length / pageSize);
  const paginatedTodos = todos.slice((page - 1) * pageSize, page * pageSize);

  res.json({
    todos: paginatedTodos,
    totalPages,
  });
});

// Get a single todo by id
app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    res.status(404).send("Todo not found");
    return;
  }
  res.json(todo);
});

// Create a new todo
app.post("/todos", (req, res) => {
  const { title, description, done } = req.body;
  if (!title || !description) {
    return res.status(400).send("Title and description are required");
  }
  const newTodo: Todo = {
    id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
    title,
    description,
    done: typeof done === 'boolean' ? done : false,
  };
  todos.unshift(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo by id
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1) {
    res.status(404).send("Todo not found");
    return;
  }
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).send("Title and description are required");
  }
  todos[todoIndex] = { ...todos[todoIndex], title, description };
  res.json(todos[todoIndex]);
});

// Update the done status of a todo by id
app.patch("/todos/:id/done", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1) {
    res.status(404).send("Todo not found");
    return;
  }
  const { done } = req.body;
  if (typeof done !== 'boolean') {
    return res.status(400).send("'done' property must be a boolean");
  }
  todos[todoIndex] = { ...todos[todoIndex], done };
  res.json(todos[todoIndex]);
});

// Delete a todo by id
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex((t) => t.id === id);
  if (todoIndex === -1) {
    res.status(404).send("Todo not found");
    return;
  }
  todos.splice(todoIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
