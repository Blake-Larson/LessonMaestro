import React, { useEffect, useState } from "react";
import XIcon from "../../buttons/XIcon";
import { api } from "../../../utils/api";
import EditMusicItem from "../EditMusicItem";
import type { Music } from "@prisma/client";

interface Props {
  musicItem: Music;
  music: Music[];
  setMusic: React.Dispatch<React.SetStateAction<Music[]>>;
}

function MusicItem({ musicItem, music, setMusic }: Props) {
  const [item, setItem] = useState<Music>();
  useEffect(() => {
    setItem(musicItem);
  }, [musicItem]);

  //Delete MusicItem

  const deleteMutation = api.music.deleteMusicItem.useMutation();

  function deleteMusicItem(id: string) {
    deleteMutation.mutate(id);
    setMusic(music.filter((musicItem: Music) => musicItem.id !== id));
  }

  return (
    <>
      {item && (
        <li className="flex justify-between border-b border-base-300 border-opacity-50 p-1">
          <div className="w-full">
            <span className="inline-block w-1/2 pl-1 hover:cursor-pointer">
              <EditMusicItem
                item={item}
                setItem={setItem}
                field={"title"}
                value={item.title ? item.title : ""}
                placeholder={item.title ? item.title : "title"}
              />
            </span>
            <span className="inline-block w-1/2 hover:cursor-pointer">
              <EditMusicItem
                item={item}
                setItem={setItem}
                field={"composer"}
                value={item.composer ? item.composer : ""}
                placeholder={item.composer ? item.composer : "composer"}
              />
            </span>
          </div>
          <div
            className="btn-ghost btn-square btn-xs btn cursor-pointer p-1 transition-all duration-300 hover:scale-110 hover:bg-error"
            onClick={() => deleteMusicItem(musicItem.id)}
          >
            <XIcon width="5" height="5" />
          </div>
        </li>
      )}
    </>
  );
}

export default MusicItem;
