import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { StudentType } from "../../pages/students";

interface Props {
  student: StudentType;
}

function StudentCard({ student }: Props) {
  return (
    <Link
      href={`/student-profile/${encodeURIComponent(student.id)}`}
      className="mx-2 flex w-full flex-col justify-center gap-5 rounded bg-primary p-4 shadow-lg"
    >
      <div className="avatar">
        <div className="relative w-16 rounded">
          <Image
            src={"/assets/images/teach.jpg"} //student.image
            fill
            sizes="(max-width: 768px) 100%, 33%"
            alt={`photo of ${student.name}`}
          />
        </div>
      </div>
      <div className="">
        <h2 className="">{student.name}</h2>
        <p>{student.instrument}</p>
      </div>
    </Link>
  );
}

export default StudentCard;
