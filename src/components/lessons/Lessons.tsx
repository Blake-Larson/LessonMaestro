import { Prisma } from "@prisma/client";
import React, { useState } from "react";
import { api } from "~/utils/api";
import LoadingSpinner from "../icons/LoadingSpinner";
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
  const getLessons = api.lesson.getLessons.useQuery(undefined, {
    onSuccess: (data) => {
      setLessons(data);
    },
  });
  console.log(getLessons.data);
  return (
    <>
      <div className="flex w-full max-w-3xl flex-col items-center gap-5 rounded-xl bg-blue-50 p-5 shadow-2xl">
        <h2 className="w-full text-left text-2xl font-semibold">
          Upcoming Lessons
        </h2>

        {lessons?.map((lesson) => (
          <Lesson
            key={lesson.id}
            lesson={lesson}
            lessons={lessons}
            setLessons={setLessons}
          />
        ))}
        {getLessons.isLoading && <LoadingSpinner />}
      </div>
    </>
  );
};

export default Lessons;
