"use client"

import { CameraIcon } from "lucide-react"
import { useState, useCallback, ChangeEvent } from "react"
import Cropper, { Area } from "react-easy-crop"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCroppedImg, readFile } from "@/lib/image"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { toast } from "react-toastify"
import axios from "axios"
import { UpdateProfileAPIResponse } from "@/types/api-response"
import { useUser } from "@/context/UserContext"



const AvatarUploader = ({ src, fallback }: { src: string, fallback: string }) => {

  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState(2)
  const [rotation, setRotation] = useState(0)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [finalImage, setFinalImage] = useState<string | null>(null)
  const { fetchUser } = useUser()


  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    console.log(croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])


  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    console.log(file)
    if (!file) return
    const imageDataUrl = await readFile(file)
    setImageSrc(imageDataUrl)
    setOpen(true)
  }


  const handleSave = async () => {
    try {
      console.log("Image SRC")
      console.log(imageSrc)
      const croppedImage = await getCroppedImg(imageSrc!, croppedAreaPixels!, rotation)
      // setFinalImage(croppedImage)
      // console.log(croppedImage)

      const url = await uploadToCloudinary(croppedImage)
      setFinalImage(url)
      console.log(url)


      const response = await axios.post<UpdateProfileAPIResponse>("/api/auth/update-profile", { pictureUrl: url })
      console.log(response.data)
      toast.success("Profile picture updated successfully")


      setOpen(false)
      setZoom(2)
      setRotation(0)
      await fetchUser()


    } catch (error) {
      console.log(error)
      toast.error("Error uploading image.\n Please try again later")
    }


  }

  return (
    <>
      <Label htmlFor="picture" className="relative cursor-pointer group">

        <Avatar className="size-20">
          <AvatarImage src={finalImage || src} />
          <AvatarFallback className="bg-primary text-3xl font-bold">{fallback}</AvatarFallback>
        </Avatar>

        <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center rounded-full">
          <CameraIcon className="text-white w-6 h-6" />
        </div>

        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </Label>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTitle className="sr-only">Crop Image</AlertDialogTitle>
        <AlertDialogDescription className="sr-only"></AlertDialogDescription>

        <AlertDialogContent className="max-w-[90vw] w-[400px] sm:w-[500px]">
          <div className="relative aspect-square bg-black">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                cropShape="round"
                cropSize={{ width: 300, height: 300 }}
                // initialCroppedAreaPixels={}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
              />
            )}
          </div>

          <div className="space-y-2 mt-4">
            <Label className="text-sm">Zoom</Label>
            <Slider min={1} max={3} step={0.1} value={[zoom]} onValueChange={([v]) => setZoom(v)} />
            <Label className="text-sm">Rotate</Label>
            <Slider min={-360} max={360} step={1} value={[rotation]} onValueChange={([v]) => setRotation(v)} />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel asChild>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            </AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button onClick={handleSave}>Save</Button>
            </AlertDialogAction>

          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default AvatarUploader
