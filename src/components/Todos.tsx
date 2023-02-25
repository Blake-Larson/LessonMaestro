import React, { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import { api } from "../utils/api";
import type { TodoInput } from "./Todo";
import Todo from "./Todo";

function Todos() {
  const [todos, setTodos] = useState<TodoInput[]>([]);
  const getTodos = api.todo.getTodos.useQuery();

  useEffect(() => {
    if (getTodos.data) {
      setTodos(getTodos.data);
    }
  }, [getTodos.data]);

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-5">
      <h2 className="text-center text-xl font-semibold">Todo List</h2>
      <div className="flex w-full flex-col gap-5 rounded-xl bg-primary-light p-5 shadow-lg">
        <ul className="list-inside list-disc">
          {todos?.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            );
          })}
        </ul>
        <div className="flex justify-center">
          <CreateTodo todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
}

export default Todos;
