import React from "react";
import AddIcon from "../icons/AddIcon";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import type { TodoInput } from "./Todo";
import toast from "react-hot-toast";

type FormData = {
  text: string;
};

interface Props {
  todos: TodoInput[];
  setTodos: React.Dispatch<React.SetStateAction<TodoInput[]>>;
}

function CreateTodo({ todos, setTodos }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const getTodos = api.todo.getTodos.useQuery(undefined, {
    enabled: false,
    onSuccess: (data) => {
      setTodos(data);
    },
  });

  const mutation = api.todo.createTodo.useMutation({
    onSuccess: () => {
      setTodos([
        ...todos,
        {
          text: watch("text"),
          id: "",
          completed: false,
        },
      ]);
      void getTodos.refetch();
      reset();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
      <input
        placeholder="Enter a task"
        {...register("text", { required: true })}
        className="input-bordered input w-full max-w-xs"
      />

      <button className="cursor-pointer rounded-md border border-base-300 bg-base-100 p-0.5 transition-all duration-300 hover:bg-secondary">
        <AddIcon width="6" height="6" />
      </button>
    </form>
  );
}

export default CreateTodo;
