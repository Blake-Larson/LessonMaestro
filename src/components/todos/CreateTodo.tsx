import React from "react";
import AddButton from ".././buttons/AddButton";
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import type { TodoInput } from "./Todo";

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
    onError: () => {
      console.log(mutation.error?.message);
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
      {errors.text && <span>This field is required</span>}
      {mutation.error?.message.includes(
        "Unique constraint failed on the fields: (`text,userId`)"
      ) && <span>You already have that task.</span>}
      <button>
        <AddButton width="5" height="5" padding="1" />
      </button>
    </form>
  );
}

export default CreateTodo;
