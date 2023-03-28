import { type Music, Prisma, type Concept } from "@prisma/client";
import React, { useState } from "react";
import { api } from "~/utils/api";
import DeleteIcon from "../buttons/DeleteIcon";

const lessonWithAllFields = Prisma.validator<Prisma.LessonArgs>()({
  include: {
    student: {
      include: {
        music: true,
        concept: true,
      },
    },
  },
});

export type LessonWithAllFields = Prisma.LessonGetPayload<
  typeof lessonWithAllFields
>;

const Lessons = () => {
  const [lessons, setLessons] = useState<LessonWithAllFields[]>();

  const getLessons = api.lesson.getLessons.useQuery(undefined, {
    onSuccess: (data) => {
      setLessons(data);
    },
  });

  return (
    <>
      <h2 className="text-xl font-semibold">Upcoming Lessons</h2>
      <div className="flex w-full max-w-4xl flex-col items-center gap-5">
        {lessons?.map((lesson) => {
          return (
            <div key={lesson.id} className="w-full">
              <div className="collapse-arrow collapse rounded-xl bg-base-100 shadow-lg">
                <input type="checkbox" />
                <div className="collapse-title">
                  <div className="flex flex-col items-center justify-between gap-3 font-medium sm:flex-row">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 rounded border border-secondary">
                          {/* <Image
                              cloudName="drwljgjhd"
                              publicId={student?.profileImg}
                            /> */}
                        </div>
                      </div>
                      <span className="text-lg">{lesson.student.name}</span>
                      {/* {lesson.attendance && (
                          <div
                            className={
                              lesson.attendance === "Present"
                                ? "btn-outline btn-primary btn-sm btn bg-base-100"
                                : "btn-outline btn-warning btn-sm btn bg-base-100"
                            }
                          >
                            {lesson.attendance}
                          </div>
                        )}
                        {lesson.payment && (
                          <div
                            className={
                              lesson.payment === "Paid"
                                ? "btn-outline btn-primary btn-sm btn bg-base-100"
                                : "btn-outline btn-warning btn-sm btn bg-base-100"
                            }
                          >
                            {lesson.payment}
                          </div>
                        )} */}
                    </div>

                    <div className="flex text-center">
                      <div className="flex flex-col justify-evenly">
                        {/* <span>{`${lesson.date.weekday}, ${lesson.date.date}`}</span>
                            <span>{`${lesson.date.start} - ${lesson.date.end}`}</span> */}
                        <span>{`Monday, 03/27/23`}</span>
                        <span>{`2:00 PM - 3:00 PM`}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="collapse-content flex flex-col gap-5 bg-base-100">
                  <div className="flex flex-col rounded-xl py-2">
                    <div>Music and Work</div>
                  </div>
                  <div className="flex flex-col gap-3 md:flex-row">
                    <div className="w-full">
                      {lesson.student.music.map((musicItem: Music) => (
                        <span key={musicItem.id}>{musicItem.title}</span>
                      ))}
                    </div>
                    <div className="w-full">
                      {lesson.student.concept.map((concept: Concept) => (
                        <span key={concept.id}>{concept.text}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <button className="btn-ghost btn border border-base-300 hover:bg-primary">
                        Profile
                      </button>
                    </div>
                    <div className="flex gap-3">
                      <button className="btn-outline btn-warning btn">
                        Archive
                      </button>
                      <div>
                        <DeleteIcon width={"5"} height={"5"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Lessons;
