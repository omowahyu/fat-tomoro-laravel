"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, File, X, CheckCircle, AlertCircle, FileSpreadsheet, Database } from "lucide-react"
import { cn } from "@/lib/utils"
import { router } from "@inertiajs/react"

interface FileUploadProps {
  onUploadSuccess?: (fileData: any) => void
  onUploadError?: (error: string) => void
  className?: string
  allowedTypes?: Array<'BOH' | 'BI' | 'BANK'>
  defaultType?: 'BOH' | 'BI' | 'BANK'
}

interface UploadedFileMeta {
  id?: string
  status?: 'uploading' | 'uploaded' | 'processing' | 'completed' | 'failed'
  progress?: number
  type?: 'BOH' | 'BI' | 'BANK'
  error?: string
}

export function FatFileUpload({
  onUploadSuccess,
  onUploadError,
  className,
  allowedTypes,
  defaultType,
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [selectedType, setSelectedType] = useState<string>(defaultType || "")
  const [isUploading, setIsUploading] = useState(false)
  const typeOptions = (allowedTypes?.length ? allowedTypes : ['BOH','BI','BANK']) as Array<'BOH'|'BI'|'BANK'>
  useEffect(() => { if (defaultType) setSelectedType(defaultType) }, [defaultType])


  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!selectedType) {
        onUploadError?.("Please select a file type first")
        return
      }

      // Keep native File instance and track meta separately
      const newFiles = acceptedFiles.map(file => ({
        file,
        meta: {
          status: 'uploading' as const,
          progress: 0,
          type: selectedType as 'BOH' | 'BI' | 'BANK'
        } as UploadedFileMeta
      }))

      // Flatten into our UI list shape but keep the original File on meta
      setUploadedFiles(prev => [
        ...prev,
        ...newFiles.map(({ file, meta }) => Object.assign(file, meta))
      ])

      // Upload each file using the original File object kept in closure
      newFiles.forEach(({ file, meta }) => uploadFile(file as File, meta))
    },
    [selectedType, onUploadError],
  )

  const uploadFile = async (file: File, meta: UploadedFileMeta) => {
    setIsUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', (meta.type as string) || '')

    console.log('Starting upload:', { fileName: file.name, fileType: file.type });

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadedFiles(prev => prev.map(f =>
          f.name === file.name
            ? { ...f, progress: Math.min((f.progress || 0) + Math.random() * 20, 90) }
            : f
        ))
      }, 300)

      // Determine upload endpoint based on file type
      const uploadEndpoint = meta.type === 'BOH'
        ? '/purchases/upload'  // BOH files go to Purchase workflow
        : meta.type === 'BI'
          ? '/sales/upload-bi'  // BI files go to Sales workflow (POST route)
          : meta.type === 'BANK'
            ? '/sales/upload-bank'  // Bank files go to Sales workflow (POST route)
            : '/files/upload';  // Default fallback

      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
      console.log('Upload endpoint:', uploadEndpoint);
      console.log('CSRF Token:', csrfToken);

      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
        },
      })

      console.log('Response status:', response.status);
      clearInterval(progressInterval)

      const result = await response.json()
      console.log('Upload result:', result);

      if (result.success) {
        console.log('Upload successful, updating file status');
        setUploadedFiles(prev => prev.map(f => (
          f.name === file.name
            ? Object.assign(f, { status: 'processing', progress: 100, id: result.data.file_id })
            : f
        )))
        onUploadSuccess?.(result.data)
      } else {
        console.error('Upload failed:', result.message);
        setUploadedFiles(prev => prev.map(f => (
          f.name === file.name
            ? Object.assign(f, { status: 'failed', error: result.message })
            : f
        )))
        onUploadError?.(result.message)
      }
    } catch (error) {
      setUploadedFiles(prev => prev.map(f => (
        f.name === file.name
          ? Object.assign(f, { status: 'failed', error: 'Upload failed' })
          : f
      )))
      onUploadError?.('Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: !selectedType || isUploading,
  })

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(file => file.name !== fileName))
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'BOH':
        return <Database className="h-5 w-5 text-blue-500" />
      case 'BI':
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      case 'BANK':
        return <File className="h-5 w-5 text-purple-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (file: any) => {
    switch (file.status) {
      case 'uploading':
        return <Badge variant="secondary">Uploading...</Badge>
      case 'uploaded':
        return <Badge variant="default">Uploaded</Badge>
      case 'processing':
        return <Badge variant="default">Processing...</Badge>
      case 'completed':
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Complete
          </Badge>
        )
      case 'failed':
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Card>
        <CardHeader>
          <CardTitle>Upload Data Files</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Type Selection */}
          {/* <div className="space-y-2">
            <label className="text-sm font-medium">File Type</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t === 'BOH' && 'BOH - Back of House (Purchases/Inventory)'}
                    {t === 'BI' && 'BI - Business Intelligence (Sales)'}
                    {t === 'BANK' && 'BANK - Bank Statements'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}

          {/* File Type Description */}
          {/* {selectedType && (
            <Alert>
              <AlertDescription>
                {selectedType === 'BOH' && "Upload purchase orders, inventory data, supplier invoices (coffee, milk, etc.)"}
                {selectedType === 'BI' && "Upload sales data from multiple channels (GoFood, GrabFood, etc.)"}
                {selectedType === 'BANK' && "Upload bank statements for reconciliation purposes"}
              </AlertDescription>
            </Alert>
          )} */}

          {/* Drop Zone */}
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
              (!selectedType || isUploading) && "opacity-50 cursor-not-allowed"
            )}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            {isDragActive ? (
              <p className="text-lg font-medium">Drop files here...</p>
            ) : (
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {selectedType ? "Drag & drop files here, or click to select" : "Select file type first"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports CSV and Excel files up to 10MB
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Uploaded Files</h3>
            <div className="space-y-3">
              {uploadedFiles.map((file: any, index) => (
                <div key={`${file.name}-${index}-${file.id || 'temp'}`} className="flex items-center space-x-3 p-3 border rounded-lg">
                  {getFileIcon(file.type)}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{file.name}</span>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(file)}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.name)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{(file.size / 1024).toFixed(1)} KB</span>
                      <span>•</span>
                      <span>{file.type}</span>
                      {file.error && (
                        <>
                          <span>•</span>
                          <span className="text-red-500">{file.error}</span>
                        </>
                      )}
                    </div>
                    {file.status === 'uploading' && file.progress !== undefined && (
                      <Progress value={file.progress} className="h-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
