import React from "react";
import CheckButton from "./buttons/CheckButton";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { api } from "../utils/api";
import type { TodoInput } from "./Todo";

type Inputs = {
  text: string;
};

interface Props {
  todos: TodoInput[];
  setTodos: React.Dispatch<React.SetStateAction<TodoInput[]>>;
}

function CreateTodo({ todos, setTodos }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const createMutate = api.todo.createTodo.useMutation();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createMutate.mutate(data);
    if (createMutate.isSuccess) {
      setTodos([
        ...todos,
        {
          text: data.text,
          id: "",
          completed: false,
        },
      ]);
      reset();
    } else {
      console.log(createMutate.error);
    }
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
      {createMutate.error && (
        <span>You already have a task with this text</span>
      )}
      <button>
        <CheckButton width="5" height="5" padding="1" />
      </button>
    </form>
  );
}

export default CreateTodo;
