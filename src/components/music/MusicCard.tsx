import React from "react";
import Link from "next/link";
import type { Music } from "@prisma/client";

interface Props {
  musicItem: Music;
}

function MusicCard({ musicItem }: Props) {
  return (
    <Link
      href={`/musicItem-profile/${encodeURIComponent(musicItem.id)}`}
      className="flex w-full max-w-xs gap-5 rounded bg-base-200 p-4 shadow-lg"
    >
      <div className="flex w-full flex-col">
        <div className="flex justify-between">
          <h2 className="font-bold">{musicItem.title}</h2>
        </div>
        <span className="font-semibold">{musicItem.composer}</span>
        <span className="font-semibold">{musicItem.year}</span>
      </div>
    </Link>
  );
}

export default MusicCard;
