import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { supabase } from '../services/supabaseClient'

interface DocumentUploaderProps {
  onUploadComplete?: (fileUrl: string) => void
  maxSize?: number // in MB
  acceptedTypes?: string[]
}

export function DocumentUploader({
  onUploadComplete,
  maxSize = 10,
  acceptedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
}: DocumentUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    setError(null)

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    setUploadedFile(file)
    setUploading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('You must be logged in to upload files')
      }

      // Upload to Supabase Storage
      const fileName = `${user.id}/${Date.now()}_${file.name}`
      const { data, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(data.path)

      onUploadComplete?.(publicUrl)
    } catch (err: any) {
      setError(err.message || 'Upload failed')
      setUploadedFile(null)
    } finally {
      setUploading(false)
    }
  }, [maxSize, onUploadComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles: 1,
    disabled: uploading,
  })

  const removeFile = () => {
    setUploadedFile(null)
    setError(null)
  }

  return (
    <div className="space-y-4">
      {!uploadedFile ? (
        <Card {...getRootProps()} className={`border-2 border-dashed cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <input {...getInputProps()} />
            <Upload className={`h-12 w-12 mb-4 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
            <p className="text-center text-sm text-muted-foreground">
              {isDragActive ? 'Drop your document here' : 'Drag & drop your document, or click to browse'}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              PDF, DOC, DOCX, TXT (max {maxSize}MB)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-primary">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <File className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium text-sm">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            {!uploading && (
              <Button variant="ghost" size="sm" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {uploading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Uploading and processing...</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
