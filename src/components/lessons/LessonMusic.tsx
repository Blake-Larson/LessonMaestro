import type { Concept, Music } from "@prisma/client";
import Link from "next/link";
import React from "react";
import type { LessonWithAllFields } from "./Lessons";

interface Props {
  lesson: LessonWithAllFields;
}

const LessonMusic = ({ lesson }: Props) => {
  return (
    <div>
      <h4 className="font-semibold">Music</h4>
      <div className="flex flex-col gap-3 md:flex-row">
        <ul className="w-full">
          {lesson.student.music.map((musicItem: Music) => (
            <li key={musicItem.id}>
              <Link href={"/music"}>{musicItem.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LessonMusic;
