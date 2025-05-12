import { Area } from "react-easy-crop"


export const USER_IMAGE_PLACEHOLDER = "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"


export const readFile = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => resolve(reader.result as string), false)
    reader.readAsDataURL(file)
  })
}

export async function getCroppedImg(imageSrc: string, pixelCrop: Area, rotation = 0): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx) throw new Error('Failed to get canvas context');

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  canvas.width = safeArea
  canvas.height = safeArea

  // Move the origin to the center of the canvas
  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.translate(-safeArea / 2, -safeArea / 2)

  // Draw the rotated image
  ctx.drawImage(
    image,
    (safeArea - image.width) / 2,
    (safeArea - image.height) / 2
  )

  // Crop the rotated image
  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height)

  // Set canvas to cropped size
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // Paste the cropped data onto new canvas
  ctx.putImageData(data, 0, 0)

  // Return base64 image
  return canvas.toDataURL("image/jpeg")
}


function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.onload = () => resolve(image)
    image.onerror = (error) => reject(error)
    image.src = url
  })
}

