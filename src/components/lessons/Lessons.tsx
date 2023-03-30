import { Prisma } from "@prisma/client";
import React, { useState } from "react";
import { api } from "~/utils/api";
import Lesson from "./Lesson";

const lessonWithAllFields = Prisma.validator<Prisma.LessonArgs>()({
  include: {
    student: {
      include: {
        music: true,
        concepts: true,
        lessons: true,
      },
    },
  },
});

export type LessonWithAllFields = Prisma.LessonGetPayload<
  typeof lessonWithAllFields
>;

const Lessons = () => {
  const [lessons, setLessons] = useState<LessonWithAllFields[] | undefined>();

  api.lesson.getLessons.useQuery(undefined, {
    onSuccess: (data) => {
      setLessons(data);
    },
  });

  return (
    <>
      <div className="flex w-full max-w-3xl flex-col items-center gap-5">
        <h2 className="text-xl font-semibold">Upcoming Lessons</h2>
        {lessons?.map((lesson) => (
          <Lesson
            key={lesson.id}
            lesson={lesson}
            lessons={lessons}
            setLessons={setLessons}
          />
        ))}
      </div>
    </>
  );
};

export default Lessons;
