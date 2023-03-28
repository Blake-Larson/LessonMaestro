import React from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  title: string;
  text: string;
}

function Card({ src, alt, title, text }: Props) {
  return (
    <div className="card bg-base-100 shadow-xl md:w-96">
      <figure className="relative h-72 w-full">
        {/* <Image
          src={src}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          alt={alt}
        /> */}
        <img src={src} alt={alt} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Card;
