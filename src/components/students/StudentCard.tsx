import React from "react";
import Image from "next/image";

interface Props {
  image: string;
  name: string;
  text: string;
}

function StudentCard({ image, name, text }: Props) {
  return (
    <div>
      <div className="avatar">
        <div className="w-32 rounded">
          <Image
            src={image}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="rounded object-cover"
            alt={`photo of ${name}`}
          />
        </div>
      </div>
      <div className="">
        <h2 className="">{name}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default StudentCard;
