import React from "react";
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
  const deleteMutation = api.todo.deleteTodo.useMutation();

  function deleteTodo(text: { text: string }) {
    deleteMutation.mutate(text);
    setTodos(todos.filter((todo: TodoInput) => todo.text !== text.text));
  }

  return (
    <div className="flex justify-between gap-3 border-b border-base-300 border-opacity-50 p-1">
      <li className="pl-1">{todo.text}</li>
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
