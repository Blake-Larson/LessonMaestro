import React from "react";
import DeleteButton from "./buttons/DeleteButton";
import { api } from "../utils/api";

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
  const deleteMutation = api.todo.deleteTodo.useMutation();

  function deleteTodo(id: { id: string }) {
    deleteMutation.mutate(id);
    setTodos(todos.filter((todo: TodoInput) => todo.id !== id.id));
  }

  return (
    <div className="group flex items-center gap-3">
      <li>{todo.text}</li>
      <div
        className="inline-block opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        onClick={() => deleteTodo({ id: todo.id })}
      >
        <DeleteButton width="5" height="5" padding="1" />
      </div>
    </div>
  );
};

export default Todo;
