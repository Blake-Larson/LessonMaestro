import React from "react";
import Image from "next/image";

interface Props {
  image: string;
  name: string;
  text: string;
}

function StudentCard({ image, name, text }: Props) {
  return (
    <div className="card bg-base-100 shadow-xl md:w-96">
      <figure className="relative h-72 w-full">
        <Image
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          alt={`photo of ${name}`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default StudentCard;
