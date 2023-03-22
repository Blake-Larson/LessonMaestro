import React, { useState } from "react";
import { api } from "../../utils/api";
import type { MusicItemType } from "./MusicItem";
import CreateMusicItem from "./CreateMusicItem";
import MusicItem from "./MusicItem";

interface Props {
  studentId: string;
}

function Music({ studentId }: Props) {
  const [music, setMusic] = useState<MusicItemType[]>([]);
  const getMusic = api.music.getMusic.useQuery(undefined, {
    onSuccess: (data) => {
      setMusic(data);
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex w-full flex-col border-t border-base-300 border-opacity-50">
        {getMusic.isLoading && (
          <button className="loading btn-square btn mt-5 self-center"></button>
        )}
        {music?.map((musicItem) => {
          return (
            <MusicItem
              key={musicItem.id}
              musicItem={musicItem}
              music={music}
              setMusic={setMusic}
            />
          );
        })}
      </ul>
      <div className="flex flex-col items-center gap-2">
        <CreateMusicItem
          studentId={studentId}
          music={music}
          setMusic={setMusic}
        />
      </div>
    </div>
  );
}

export default Music;
