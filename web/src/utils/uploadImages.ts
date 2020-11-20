import { PictureObj } from "../generate/graphql";
import { ExtendedFile } from "../components/PictureInput";

export const uploadImages = async (
  files: ExtendedFile[]
): Promise<PictureObj[]> => {
  if (files.length > 1) {
    const originImageIndex = files.findIndex((img) => img.primary === 1);
    const primaryImg = files[originImageIndex];
    const restFiles = files
      .slice(0, originImageIndex)
      .concat(files.slice(originImageIndex + 1));
    files = [primaryImg, ...restFiles];
  }

  const images: File[] = files.map((f) => {
    let newFile: File = new File(f.blob ? [f.blob] : [""], "filename");
    return newFile;
  });
  const pictures: PictureObj[] = [];
  const actions = images.map((pic) => {
    return new Promise(async (resolve) => {
      const formData = new FormData();
      formData.append("file", pic);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD || ""
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
