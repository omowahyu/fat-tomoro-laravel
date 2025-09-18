import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { Clock, FileText, ListChecks } from 'lucide-react'

interface FileItem {
  id: number
  original_name: string
  size_bytes: number
  status: string
  created_at: string
  created_by?: { name: string }
}

interface PurchaseDocItem {
  id: number
  doc_no?: string|null
  status: string
  created_at: string
}

interface AuditItem {
  id: number
  actor: string
  action: string
  level?: string
  created_at: string
}

interface Props {
  recentFiles: FileItem[]
  recentDocs: PurchaseDocItem[]
  audits: AuditItem[]
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Pembelian', href: '/purchases' },
  { title: 'Histori & Audit', href: '/purchases/history' },
]

const formatDate = (s: string) => new Date(s).toLocaleString('id-ID')
const formatSize = (b: number) => `${(b/1024).toFixed(1)} KB`

export default function PurchaseHistory({ recentFiles = [], recentDocs = [], audits = [] }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Histori & Audit - Pembelian" />
      <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Upload BOH Terbaru</CardTitle>
              <CardDescription>20 upload terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama File</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentFiles.map(f => (
                    <TableRow key={f.id}>
                      <TableCell className="font-medium">{f.original_name}</TableCell>
                      <TableCell>
                        <Badge variant={f.status === 'posted' ? 'default' : f.status === 'failed' ? 'destructive' : 'secondary'}>
                          {f.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(f.created_at)}</TableCell>
                    </TableRow>
                  ))}
                  {recentFiles.length === 0 && (
                    <TableRow><TableCell colSpan={3} className="text-muted-foreground">Belum ada data</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ListChecks className="h-5 w-5" /> Dokumen Pembelian</CardTitle>
              <CardDescription>20 dokumen terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No Dok</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentDocs.map(d => (
                    <TableRow key={d.id}>
                      <TableCell className="font-medium">{d.doc_no ?? '-'}</TableCell>
                      <TableCell>
                        <Badge variant={d.status === 'posted' ? 'default' : 'secondary'}>{d.status}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(d.created_at)}</TableCell>
                    </TableRow>
                  ))}
                  {recentDocs.length === 0 && (
                    <TableRow><TableCell colSpan={3} className="text-muted-foreground">Belum ada data</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> Audit Terbaru</CardTitle>
              <CardDescription>50 aktivitas terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[380px] overflow-auto pr-2">
                {audits.map(a => (
                  <div key={a.id} className="flex items-center justify-between border rounded-md px-3 py-2">
                    <div>
                      <div className="text-sm font-medium">{a.action}</div>
                      <div className="text-xs text-muted-foreground">{a.actor}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{formatDate(a.created_at)}</div>
                  </div>
                ))}
                {audits.length === 0 && (
                  <div className="text-sm text-muted-foreground">Belum ada aktivitas</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

