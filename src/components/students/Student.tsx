import Link from "next/link";
import React from "react";
import { StudentType } from "../../pages/students";

interface Props {
  student: StudentType;
}

const Student = ({ student }: Props) => {
  return (
    <tr key={student.id}>
      <td>
        <Link
          href={`/students/${encodeURIComponent(student.id)}`}
          className="flex items-center space-x-3 hover:cursor-pointer"
        >
          <div>
            <div className="font-bold">{student.name}</div>
          </div>
        </Link>
      </td>
      <td>{student.instrument}</td>
      <td>
        <a href={`tel:${student.phone ? student.phone : ""}`}>
          {student.phone}
        </a>
      </td>
      <td>
        <a href={`mailto:${student.email ? student.email : ""}`}>
          {student.email}
        </a>
      </td>
    </tr>
  );
};

export default Student;
