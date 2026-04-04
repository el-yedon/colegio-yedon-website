import React, { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Upload, Save, X, ZoomIn, ZoomOut, Image as ImageIcon } from 'lucide-react'
import { handleImageUpload } from '@/lib/image-utils'
import { cn } from '@/lib/utils'

interface PhotoEditorProps {
  initialImage?: string
  onSave: (editedImageUrl: string) => void
  onCancel: () => void
}

const EDITOR_WIDTH = 240
const EDITOR_HEIGHT = 320
const TARGET_WIDTH = 600
const TARGET_HEIGHT = 800

export default function PhotoEditor({ initialImage, onSave, onCancel }: PhotoEditorProps) {
  const [image, setImage] = useState<string | null>(initialImage || null)
  const [zoom, setZoom] = useState([1])
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!image) return
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setDragStart({ x: clientX - position.x, y: clientY - position.y })
  }

  const handlePointerMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging || !image) return
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      setPosition({ x: clientX - dragStart.x, y: clientY - dragStart.y })
    },
    [isDragging, dragStart, image],
  )

  const handlePointerUp = () => setIsDragging(false)

  const handleWheel = (e: React.WheelEvent) => {
    if (!image) return
    const zoomChange = e.deltaY > 0 ? -0.05 : 0.05
    setZoom((z) => [Math.min(Math.max(z[0] + zoomChange, 0.1), 5)])
  }

  const handleUploadClick = () => fileInputRef.current?.click()

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(e, (url) => {
      setImage(url)
      setZoom([1])
      setPosition({ x: 0, y: 0 })
    })
  }

  const generateCroppedImage = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!image) return reject('No image')
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = TARGET_WIDTH
        canvas.height = TARGET_HEIGHT
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject('No context')

        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.translate(canvas.width / 2, canvas.height / 2)
        const scaleFactor = TARGET_WIDTH / EDITOR_WIDTH
        ctx.translate(position.x * scaleFactor, position.y * scaleFactor)
        ctx.scale(zoom[0] * scaleFactor, zoom[0] * scaleFactor)
        ctx.drawImage(img, -img.width / 2, -img.height / 2)

        resolve(canvas.toDataURL('image/jpeg', 0.9))
      }
      img.onerror = () => reject('Image load error')
      img.src = image
    })
  }

  const handleSave = async () => {
    if (!image) return
    setIsSaving(true)
    try {
      const croppedDataUrl = await generateCroppedImage()
      onSave(croppedDataUrl)
    } catch (err) {
      console.error('Error cropping image:', err)
      onSave(image)
    } finally {
      setIsSaving(false)
    }
  }

  const imageTransform = `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${zoom[0]})`

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-fade-in h-full">
      <div className="flex-1 flex flex-col items-center gap-6 bg-slate-50/50 p-6 rounded-xl border border-dashed h-full overflow-y-auto">
        <div className="flex w-full justify-between items-center mb-2">
          <h3 className="font-semibold text-blue-950">Ajuste de Foto (3:4)</h3>
          <Button variant="outline" size="sm" onClick={handleUploadClick}>
            <Upload className="w-4 h-4 mr-2" />
            Nova Foto
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={onFileChange}
          />
        </div>

        <div
          className={cn(
            'relative overflow-hidden bg-white shadow-inner border border-blue-900/20 select-none rounded-md',
            isDragging ? 'cursor-grabbing' : image ? 'cursor-grab' : 'cursor-default',
          )}
          style={{ width: EDITOR_WIDTH, height: EDITOR_HEIGHT, touchAction: 'none' }}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onWheel={handleWheel}
        >
          {image ? (
            <img
              src={image}
              alt="Editor"
              className="max-w-none absolute top-1/2 left-1/2 pointer-events-none"
              style={{ transform: imageTransform }}
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-slate-100">
              <ImageIcon className="w-12 h-12 mb-2 opacity-30" />
              <span className="text-sm">Sem foto selecionada</span>
            </div>
          )}
          <div className="absolute inset-0 border-2 border-yellow-500/30 pointer-events-none rounded-md" />
        </div>

        <div className="w-full max-w-[240px] flex items-center gap-3 mt-auto">
          <ZoomOut className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={zoom}
            onValueChange={setZoom}
            min={0.1}
            max={5}
            step={0.01}
            disabled={!image}
          />
          <ZoomIn className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div className="w-full md:w-56 flex flex-col items-center gap-6">
        <div className="w-full text-center">
          <h4 className="font-medium text-sm text-muted-foreground mb-4">Preview em Tempo Real</h4>
          <div className="w-[120px] h-[160px] mx-auto relative overflow-hidden rounded-md border-2 border-blue-950 shadow-md bg-white">
            <div
              className="origin-top-left"
              style={{ width: EDITOR_WIDTH, height: EDITOR_HEIGHT, transform: `scale(0.5)` }}
            >
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="max-w-none absolute top-1/2 left-1/2"
                  style={{ transform: imageTransform }}
                />
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 px-2">
            Este é o recorte exato que será salvo no perfil do usuário.
          </p>
        </div>

        <div className="w-full space-y-2 mt-auto">
          <Button
            className="w-full bg-blue-950 hover:bg-blue-900 text-yellow-500"
            onClick={handleSave}
            disabled={!image || isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Salvando...' : 'Salvar Foto'}
          </Button>
          <Button className="w-full" variant="ghost" onClick={onCancel} disabled={isSaving}>
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
