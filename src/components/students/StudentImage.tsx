import { useState } from "react";
import { CldImage } from "next-cloudinary";
import type { StudentWithAllFields } from "~/pages/student/[id]";
import Image from "next/image";

interface Props {
  student: StudentWithAllFields;
  setStudent: React.Dispatch<
    React.SetStateAction<StudentWithAllFields | undefined>
  >;
}

const StudentImage = ({ student, setStudent }: Props) => {
  const [image, setImage] = useState<File | undefined>();

  //   const uploadImage = async () => {
  //     const imageFormData = new FormData();
  //     imageFormData.append("file", image);
  //     imageFormData.append("upload_preset", "tifn41tp");

  //     try {
  //       const response = await fetch(
  //         "https://api.cloudinary.com/v1_1/drwljgjhd/image/upload",
  //         {
  //           method: "POST",
  //           body: imageFormData,
  //         }
  //       );
  //       console.log(response);
  //       return response.data.public_id;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
  //     const { files } = event.target;
  //     if (files) {
  //       setImage(files[0]);
  //     }
  //   }

  //   async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
  //     event.preventDefault();
  //     const imageString = await uploadImage();
  //     setStudent({ ...student, image: imageString });
  //   }
  //   console.log(image);

  return (
    <>
      {student && (
        <form
          className="flex flex-col items-center justify-center"
          method="post"
          //   onSubmit={() => handleOnSubmit}
        >
          <input type="file" name="file" /*onChange={handleFormChange} */ />
          <div className="avatar">
            <div className="relative h-16 w-16 rounded-xl">
              {student.image ? (
                <CldImage
                  src={`${student.image}`}
                  alt="student name"
                  width={100}
                  height={100}
                />
              ) : (
                <Image
                  src={"/images/blank-profile.webp"} // replace with student.image
                  fill
                  sizes="100%"
                  alt={`photo of ${student.name}`}
                />
              )}
            </div>
          </div>
          <button>Submit</button>
        </form>
      )}
    </>
  );
};

export default StudentImage;
