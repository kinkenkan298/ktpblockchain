export async function resizeAndCropImage(
  file: File,
  name: string,
  size: number,
  extension: string
): Promise<File> {
  const image = await loadImage(file);
  const canvas = document.createElement("canvas");

  canvas.width = canvas.height = size;

  const ctx = canvas.getContext("2d");
  const minEdge = Math.min(image.width, image.height);
  const x = (image.width - minEdge) / 2;
  const y = (image.height - minEdge) / 2;

  ctx?.drawImage(image, x, y, minEdge, minEdge, 0, 0, size, size);
  const resizedImageBlob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/" + extension);
  });

  return new File([resizedImageBlob as BlobPart], `${name}.${extension}`, {
    type: `image/${extension}`,
    lastModified: Date.now(),
  });
}
async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      image.src = e.target?.result as string;
    };

    image.onload = () => resolve(image);
    image.onerror = reject;
    reader.readAsDataURL(file);
  });
}
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
