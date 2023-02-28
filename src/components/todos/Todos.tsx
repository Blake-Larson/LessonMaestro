import React, { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import { api } from "../../utils/api";
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
      <div className="flex w-full flex-col gap-5 rounded-xl bg-primary p-5 shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-base-100 md:text-3xl">
          Todo List
        </h2>
        <ul className="flex flex-col border-t border-base-100 border-opacity-50">
          {getTodos.isLoading && (
            <button className="loading btn mt-5 self-center">loading</button>
          )}
          {todos?.map((todo, i) => {
            return (
              <Todo key={i} todo={todo} todos={todos} setTodos={setTodos} />
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
