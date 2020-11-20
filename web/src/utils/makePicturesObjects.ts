import { PictureObj } from "../generate/graphql";
import { ExtendedFile } from "../components/PictureInput";

export const makePictureObjects = async (
  images: ExtendedFile[]
): Promise<PictureObj[]> => {
  let newPictureObjects: PictureObj[] = [];
  const newFiles = images.filter((image) => image.url?.startsWith("data"));
  console.log("Images: ", images);
  const existedFiles = images.filter((image) => !image.url?.startsWith("data"));
  if (newFiles.length > 0) {
    const actions = newFiles.map(
      (pic): Promise<any> => {
        return new Promise(async (resolve) => {
          if (pic.url) {
            const formData = new FormData();
            formData.append("file", pic.url);
            formData.append(
              "upload_preset",
              process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD
                ? process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD
                : ""
            );
            formData.append(
              "options",
              JSON.stringify({
                responsive_breakpoints: {
                  create_derived: true,
                  bytes_step: 20000,
                  min_width: 200,
                  max_width: 1000,
                },
              })
            );
            const result = await fetch(
              `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDIFY_STORE}/upload`,
              {
                body: formData,
                method: "POST",
              }
            );
            const data = await result.json();
            resolve({ data, primary: pic.primary });
          }
        });
      }
    );
    const response = await Promise.all(actions);
    newPictureObjects = response.map((el) => {
      return { url: el.data.url, primary: el.primary ? 1 : 0 };
    });
  }
  const existedPictureObjects: PictureObj[] = existedFiles.map((el) => {
    return { url: el.url || "", primary: el.primary ? 1 : 0 };
  });
  const allPictureObjects = existedPictureObjects.concat(newPictureObjects);
  console.log("Images: ", allPictureObjects);
  return allPictureObjects;
};
