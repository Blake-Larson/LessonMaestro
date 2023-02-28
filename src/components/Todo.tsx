import React, { useState } from "react";
import DeleteButton from "./buttons/DeleteButton";
import { api } from "../utils/api";

interface Props {
  todo: TodoInput;
  todos: TodoInput[];
  setTodos: React.Dispatch<React.SetStateAction<TodoInput[]>>;
}

export type TodoInput = {
  text: string;
  completed: boolean;
};

const Todo = ({ todo, todos, setTodos }: Props) => {
  const updateMutation = api.todo.markCompleted.useMutation();
  const deleteMutation = api.todo.deleteTodo.useMutation();
  const [completed, setCompleted] = useState<boolean>(false);

  function updateTodo(todo: TodoInput) {
    updateMutation.mutate(todo);
    setCompleted(!completed);
  }

  function deleteTodo(text: { text: string }) {
    deleteMutation.mutate(text);
    setTodos(todos.filter((todo: TodoInput) => todo.text !== text.text));
  }

  return (
    <div className="flex justify-between gap-3 border-b border-base-100 border-opacity-50 p-1">
      <li
        className={completed || todo.completed ? "pl-1 line-through" : "pl-1"}
        onClick={() => updateTodo(todo)}
      >
        {todo.text}
      </li>
      <div
        className="inline-block"
        onClick={() => deleteTodo({ text: todo.text })}
      >
        <DeleteButton width="4" height="4" padding="1" />
      </div>
    </div>
  );
};

export default Todo;
