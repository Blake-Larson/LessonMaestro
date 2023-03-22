import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Student } from "@prisma/client";

interface Props {
  student: Student;
}

function StudentCard({ student }: Props) {
  return (
    <Link
      href={`/student/${encodeURIComponent(student.id)}`}
      className="flex w-full max-w-sm gap-5 rounded bg-base-200 p-4 shadow-lg"
    >
      <div className="avatar">
        <div className="relative h-16 w-16 rounded-xl">
          <Image
            src={"/assets/images/teach.jpg"} // replace with student.image
            fill
            sizes="100%"
            alt={`photo of ${student.name}`}
          />
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex justify-between">
          <h2 className="font-bold">{student.name}</h2>
          {student.status ? (
            <span className="badge-primary badge font-light">Active</span>
          ) : (
            <span className="badge-accent badge font-light">Inactive</span>
          )}
        </div>
        <span className="font-semibold">{student.instrument}</span>
        <span className="font-semibold">
          {student.age === 0 ? "" : student.age}
        </span>
      </div>
    </Link>
  );
}

export default StudentCard;
