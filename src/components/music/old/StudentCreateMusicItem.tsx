// import React, { useState } from "react";
// import AddIcon from "../../buttons/AddIcon";
// import { api } from "../../../utils/api";
// import type { MusicItemType } from "./MusicItem";
// import XIcon from "../../buttons/XIcon";

// interface Props {
//   studentId: string;
//   music: MusicItemType[];
//   setMusic: React.Dispatch<React.SetStateAction<MusicItemType[]>>;
// }

// interface FormData {
//   studentId: string;
//   title: string;
//   composer: string;
//   year: string;
// }

// function CreateMusicItem({ studentId, music, setMusic }: Props) {
//   const [showForm, setShowForm] = useState<boolean>(false);

//   const getMusic = api.music.getMusic.useQuery(undefined, {
//     enabled: false,
//     onSuccess: (data) => {
//       setMusic(data);
//     },
//   });
//   const createMutation = api.music.createMusicItem.useMutation({
//     onSuccess: async () => {
//       setMusic([
//         ...music,
//         {
//           id: "",
//           title: formData.title,
//           composer: formData.composer,
//         },
//       ]);
//       setFormData({
//         studentId: studentId,
//         title: "",
//         composer: "",
//         year: "",
//       });
//       await getMusic.refetch();
//     },
//     onError: () => {
//       console.log(createMutation.error?.message);
//     },
//   });

//   // Form Handling

//   const [formData, setFormData] = React.useState<FormData>({
//     studentId: studentId,
//     title: "",
//     composer: "",
//     year: "",
//   });

//   function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
//     const { name, value, type, checked } = event.target;
//     setFormData((prevformData) => ({
//       ...prevformData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     createMutation.mutate(formData);
//     event.currentTarget.reset();
//   };

//   return (
//     <>
//       <button
//         className={`btn-square btn-xs btn p-0.5 ${
//           showForm ? "btn-error self-start" : "btn-outline btn-secondary"
//         }`}
//         onClick={() => setShowForm(!showForm)}
//       >
//         {showForm ? (
//           <XIcon width="5" height="5" />
//         ) : (
//           <AddIcon width="5" height="5" />
//         )}
//       </button>
//       {showForm && (
//         <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//           <div className="flex w-full gap-1">
//             <input
//               name="title"
//               placeholder="Title"
//               className="input-bordered input h-8 w-1/2"
//               onChange={handleFormChange}
//               required
//             />
//             <input
//               name="composer"
//               placeholder="Composer"
//               className="input-bordered input h-8 w-1/2"
//               onChange={handleFormChange}
//             />
//           </div>
//           <button className="btn-secondary btn self-center">
//             <div>Submit</div>
//           </button>
//         </form>
//       )}
//     </>
//   );
// }

// export default CreateMusicItem;
import React from "react";

const StudentCreateMusicItem = () => {
  return <div>StudentCreateMusicItem</div>;
};

export default StudentCreateMusicItem;
