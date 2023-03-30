import React from "react";
import { api } from "../../utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-hot-toast";

dayjs.extend(relativeTime);

type FormData = {
  studentId: string;
  date: Date;
  startTime: string;
  endTime: string;
};

interface Props {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateLesson({ setShowForm }: Props) {
  const getStudents = api.student.getStudents.useQuery();
  const getLessons = api.lesson.getLessons.useQuery(undefined, {
    enabled: false,
  });
  const newConnection = api.lesson.connectLessontoStudent.useMutation();

  const createMutation = api.lesson.createLesson.useMutation({
    onSuccess: async () => {
      if (createMutation.data?.id) {
        newConnection.mutate({
          lessonId: createMutation.data?.id,
          studentId: formData.studentId,
        });
      }
      await getLessons.refetch();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  // Form Handling

  const [formData, setFormData] = React.useState<FormData>({
    studentId: "",
    date: new Date(),
    startTime: "",
    endTime: "",
  });

  function handleFormChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((prevformData) => ({
      ...prevformData,
      [name]: value,
    }));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const startDate = dayjs(formData.date)
      .set("hour", Number(formData.startTime.slice(0, 2)))
      .set("minute", Number(formData.startTime.slice(3, 5)))
      .toDate();
    const endDate = dayjs(formData.date)
      .set("hour", Number(formData.endTime.slice(0, 2)))
      .set("minute", Number(formData.endTime.slice(3, 5)))
      .toDate();

    createMutation.mutate({
      startDate,
      endDate,
      studentId: formData.studentId,
    });
    setFormData({
      studentId: "",
      date: new Date(),
      startTime: "",
      endTime: "",
    });
    setShowForm(false);
    event.currentTarget.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-control flex flex-col items-center gap-2"
    >
      <select
        className="select w-full max-w-xs"
        onChange={handleFormChange}
        required
        name="studentId"
      >
        <option value="">Select a Student</option>
        {getStudents.data?.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        name="formDate"
        onChange={handleFormChange}
        className="input-bordered input w-full max-w-xs"
        required
      />
      <input
        type="time"
        name="startTime"
        onChange={handleFormChange}
        className="input-bordered input w-full max-w-xs"
        required
      />
      <input
        type="time"
        name="endTime"
        onChange={handleFormChange}
        className="input-bordered input w-full max-w-xs"
        required
      />
      <button className="btn-secondary btn flex gap-2" type="submit">
        <div>Submit</div>
      </button>
    </form>
  );
}

export default CreateLesson;
