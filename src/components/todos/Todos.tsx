import React, { useState } from "react";
import CreateTodo from "./CreateTodo";
import { api } from "../../utils/api";
import type { TodoInput } from "./Todo";
import Todo from "./Todo";
import LoadingSpinner from "../buttons/LoadingSpinner";

function Todos() {
  const [todos, setTodos] = useState<TodoInput[]>([]);
  const getTodos = api.todo.getTodos.useQuery(undefined, {
    onSuccess: (data) => {
      setTodos(data);
    },
  });

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-5">
      <div className="flex w-full flex-col gap-5 rounded-xl bg-white p-5 shadow-2xl">
        <h2 className="text-2xl font-semibold">Todo List</h2>
        <ul className="flex flex-col border-t border-secondary border-opacity-50">
          {getTodos.isLoading && <LoadingSpinner />}
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
        {(getTodos.isLoading || getTodos.isRefetching) && <LoadingSpinner />}
        <div className="flex justify-center">
          <CreateTodo todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
}

export default Todos;
