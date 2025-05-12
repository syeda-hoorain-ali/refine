export async function uploadToCloudinary(base64: string): Promise<string> {
  const formData = new FormData()
  formData.append("file", base64)
  formData.append("upload_preset", "refine_avatar_upload") // 🔁 your preset

  const res = await fetch("https://api.cloudinary.com/v1_1/dxh1lw7qd/image/upload", {
    method: "POST",
    body: formData,
  })

  const data = await res.json()
  console.log(data)

  if (!res.ok) {
    throw new Error(data.error?.message || "Cloudinary upload failed")
  }

  return data.secure_url // ✅ final image URL
}
