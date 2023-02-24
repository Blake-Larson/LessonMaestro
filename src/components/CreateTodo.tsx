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
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const createMutate = api.todo.createTodo.useMutation();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createMutate.mutate(data);
    setTodos([
      ...todos,
      {
        text: data.text,
        id: "",
        completed: false,
      },
    ]);
    console.log(todos);
  };

  console.log(watch("text")); // watch input value by passing the name of it

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("text", { required: true })} />
      {errors.text && <span>This field is required</span>}
      <button>
        <CheckButton width="5" height="5" padding="1" />
      </button>
    </form>
  );

  //   const [formData, setFormData] = React.useState({
  //     text: "",
  //   });

  //   function handleFormChange(event) {
  //     const { name, value, type, checked } = event.target;
  //     setFormData((prevformData) => ({
  //       ...prevformData,
  //       [name]: type === "checkbox" ? checked : value,
  //     }));
  //   }

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     const response = await TodoService.createTodo(formData);
  //     if (response.status === 200) {
  //       //set todos
  //       event.target.reset();
  //     } else {
  //       console.log(response);
  //     }
  //   };

  //   return (
  //     <div>
  //       <form onSubmit={handleSubmit} className="flex items-center gap-2">
  //         <input
  //           type="text"
  //           name="text"
  //           placeholder="Enter a todo"
  //           onChange={handleFormChange}
  //           className="input-bordered input w-full max-w-xs"
  //           required
  //         />
  //         <button>
  //           <CheckButton width="5" height="5" padding="1" />
  //         </button>
  //       </form>
  //     </div>
  //   );
}

export default CreateTodo;
