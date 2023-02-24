import React from "react";
import DeleteButton from "./buttons/DeleteButton";

interface Props {
  todo: TodoInput;
}

export type TodoInput = {
  id: string;
  text: string;
  completed: boolean;
};

function deleteTodo(id: string) {
  console.log(`deleted todo ${id}`);
}

const Todo = ({ todo }: Props) => {
  return (
    <div className="group flex items-center gap-3">
      <li>{todo.text}</li>
      <div
        className="inline-block opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        onClick={() => deleteTodo(todo.id)}
      >
        <DeleteButton width="5" height="5" padding="1" />
      </div>
    </div>
  );
};

export default Todo;
