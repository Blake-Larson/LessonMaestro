import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { StudentType } from "../../pages/students";

interface Props {
  student: StudentType;
}

function StudentCard({ student }: Props) {
  return (
    <Link href={`/students/${encodeURIComponent(student.id)}`}>
      <div className="avatar">
        <div className="relative w-32 rounded">
          <Image
            //student.image
            src={"/assets/images/teach.jpg"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="rounded object-cover"
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
