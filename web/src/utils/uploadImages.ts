import { PictureObj } from "../generate/graphql";

export const uploadImages = async (images: File[]): Promise<PictureObj[]> => {
  const pictures: PictureObj[] = [];
  const actions = images.map((pic) => {
    return new Promise(async (resolve) => {
      const formData = new FormData();
      formData.append("file", pic);
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
      const data = result.json();
      resolve(data);
    });
  });
  const picturesFromDb = await Promise.all(actions);
  picturesFromDb.forEach((pic, index) => {
    pictures.push({ url: pic.url, primary: index === 0 ? 1 : 0 });
  });
  return pictures;
};
