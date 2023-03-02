import React from "react";
import AddButton from "../buttons/AddButton";
import { useForm, Controller } from "react-hook-form";
import { api } from "../../utils/api";
import type { StudentType } from "../../pages/students";

type FormData = {
  name: string;
  age: number;
  phone: string;
  email: string;
  contact: string;
  instrument: string;
  status: boolean;
  image: string;
};

interface Props {
  students: StudentType[];
  setStudents: React.Dispatch<React.SetStateAction<StudentType[]>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateStudent({ students, setStudents, setShowForm }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const getStudents = api.student.getStudents.useQuery(undefined, {
    enabled: false,
    onSuccess: (data) => {
      setStudents(data);
    },
  });

  const createMutation = api.student.createStudent.useMutation({
    onSuccess: () => {
      setStudents([
        ...students,
        {
          name: watch("name"),
          age: watch("age"),
          phone: watch("phone"),
          email: watch("email"),
          contact: watch("contact"),
          instrument: watch("instrument"),
          status: watch("status"),
          image: watch("image"),
          id: "",
        },
      ]);
      void getStudents.refetch();
      reset();
      setShowForm(false);
    },
    onError: () => {
      console.log(createMutation.error?.message);
    },
  });

  const onSubmit = (data: FormData) => {
    createMutation.mutate(data);
  };
  console.log(watch("status"));
  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-2"
    >
      <input
        placeholder="Name"
        {...register("name", { required: true })}
        className="input-bordered input w-full max-w-xs"
      />
      <input
        placeholder="Age"
        type={"number"}
        {...register("age", {
          setValueAs: (v: string) => (v === "" ? undefined : parseInt(v, 150)),
        })}
        className="input-bordered input w-full max-w-xs"
      />
      <input
        placeholder="Phone"
        {...register("phone")}
        className="input-bordered input w-full max-w-xs"
      />
      <input
        placeholder="Email"
        {...register("email")}
        className="input-bordered input w-full max-w-xs"
        type={"email"}
      />
      <input
        placeholder="Contact"
        {...register("contact")}
        className="input-bordered input w-full max-w-xs"
      />
      <input
        placeholder="Instrument"
        {...register("instrument")}
        className="input-bordered input w-full max-w-xs"
      />
      <Controller
        control={control}
        name={"status"}
        render={({ field: { onChange, value } }) => (
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Active</span>
              <input
                type="radio"
                onChange={() => onChange(true)} // send value to hook form
                checked={value === true}
                className="radio"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">Inactive</span>
              <input
                type="radio"
                onChange={() => onChange(false)} // send value to hook form
                checked={value === false}
                className="radio"
              />
            </label>
          </div>
        )}
      />
      <input
        placeholder="Image"
        {...register("image")}
        className="input-bordered input w-full max-w-xs"
      />
      {errors.name && <span>The name field is required</span>}
      {createMutation.error?.message.includes(
        "Unique constraint failed on the fields: (`text,userId`)"
      ) && <span>You already have that task.</span>}
      <button>
        <AddButton width="5" height="5" padding="1" />
      </button>
    </form>
  );
}

export default CreateStudent;
