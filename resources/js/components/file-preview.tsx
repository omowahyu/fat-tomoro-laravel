"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, FileText, AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilePreviewProps {
  fileId: string
  className?: string
  onValidationComplete?: (isValid: boolean) => void
}

interface FileData {
  id: string
  name: string
  type: 'BOH' | 'BI' | 'BANK'
  status: string
  total_rows: number
  meta: {
    delimiter?: string
    encoding?: string
    estimated_columns?: number
    original_name: string
  }
}

interface PreviewRow {
  row_number: number
  data: Record<string, any>
}

export function FilePreview({ fileId, className, onValidationComplete }: FilePreviewProps) {
  const [file, setFile] = useState<FileData | null>(null)
  const [preview, setPreview] = useState<PreviewRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [validationResults, setValidationResults] = useState<{
    valid: number
    invalid: number
    warnings: string[]
  } | null>(null)

  useEffect(() => {
    fetchPreview()
  }, [fileId])

  const fetchPreview = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/files/${fileId}/preview`, {
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      })

      const result = await response.json()

      if (result.success) {
        setFile(result.data.file)
        setPreview(result.data.preview)
        
        // Simulate validation
        const validRows = result.data.preview.filter((row: PreviewRow) => 
          Object.values(row.data).some(value => value !== null && value !== '')
        ).length
        
        setValidationResults({
          valid: validRows,
          invalid: result.data.preview.length - validRows,
          warnings: validRows < result.data.preview.length ? ['Some rows contain empty values'] : []
        })

        onValidationComplete?.(validRows === result.data.preview.length)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Failed to load file preview')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <Badge variant="secondary">Uploaded</Badge>
      case 'parsing':
        return <Badge variant="secondary">Parsing...</Badge>
      case 'parsed':
        return <Badge variant="default">Parsed</Badge>
      case 'validating':
        return <Badge variant="secondary">Validating...</Badge>
      case 'validated':
        return <Badge variant="default">Validated</Badge>
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'BOH':
        return 'text-blue-600 bg-blue-50'
      case 'BI':
        return 'text-green-600 bg-green-50'
      case 'BANK':
        return 'text-purple-600 bg-purple-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={fetchPreview} className="mt-4" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!file) return null

  const columns = preview.length > 0 ? Object.keys(preview[0].data) : []

  return (
    <div className={cn("space-y-4", className)}>
      {/* File Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {file.name}
            </CardTitle>
            {getStatusBadge(file.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Type:</span>
              <div className={cn("inline-block px-2 py-1 rounded text-xs font-medium ml-2", getTypeColor(file.type))}>
                {file.type}
              </div>
            </div>
            <div>
              <span className="font-medium">Total Rows:</span>
              <span className="ml-2">{file.total_rows?.toLocaleString() || 'N/A'}</span>
            </div>
            <div>
              <span className="font-medium">Encoding:</span>
              <span className="ml-2">{file.meta?.encoding || 'N/A'}</span>
            </div>
            <div>
              <span className="font-medium">Delimiter:</span>
              <span className="ml-2 font-mono">{file.meta?.delimiter || 'N/A'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Results */}
      {validationResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Validation Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{validationResults.valid}</div>
                <div className="text-sm text-green-600">Valid Rows</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{validationResults.invalid}</div>
                <div className="text-sm text-red-600">Invalid Rows</div>
              </div>
            </div>
            
            {validationResults.warnings.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <ul className="list-disc list-inside">
                    {validationResults.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Data Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Data Preview (First 10 rows)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {preview.length > 0 ? (
            <ScrollArea className="h-96 w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">#</TableHead>
                    {columns.map((column) => (
                      <TableHead key={column} className="min-w-32">
                        {column}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preview.map((row) => (
                    <TableRow key={row.row_number}>
                      <TableCell className="font-mono text-xs">
                        {row.row_number}
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell key={column} className="max-w-32 truncate">
                          {row.data[column] || '-'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No data available for preview
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
