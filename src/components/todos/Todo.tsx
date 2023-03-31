import React, { useState } from "react";
import { api } from "../../utils/api";
import XIcon from "../buttons/XIcon";

interface Props {
  todo: TodoInput;
  todos: TodoInput[];
  setTodos: React.Dispatch<React.SetStateAction<TodoInput[]>>;
}

export type TodoInput = {
  id: string;
  text: string;
  completed: boolean;
};

const Todo = ({ todo, todos, setTodos }: Props) => {
  const markCompleted = api.todo.markCompleted.useMutation();
  const deleteMutation = api.todo.deleteTodo.useMutation();
  const [completed, setCompleted] = useState<boolean>(todo.completed);

  function updateTodo(todo: TodoInput) {
    markCompleted.mutate(todo);
    setCompleted(!completed);
  }

  function deleteTodo(id: { id: string }) {
    deleteMutation.mutate(id);
    setTodos(todos.filter((todo: TodoInput) => todo.id !== id.id));
  }

  return (
    <div className="flex justify-between gap-3 border-b border-secondary border-opacity-50 p-1">
      <li
        className={`pl-1 hover:cursor-pointer ${
          completed ? "line-through" : ""
        }`}
        onClick={() => updateTodo(todo)}
      >
        {todo.text}
      </li>
      <div
        className="btn-ghost btn-square btn-xs btn cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-error"
        onClick={() => deleteTodo({ id: todo.id })}
      >
        <XIcon width="5" height="5" />
      </div>
    </div>
  );
};

export default Todo;
