export const handleImageUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  callback: (url: string) => void,
) => {
  const file = e.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      callback(reader.result as string)
    }
    reader.readAsDataURL(file)
  }
}
