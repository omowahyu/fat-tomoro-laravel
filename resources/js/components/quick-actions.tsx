import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Download, Send as Sync, FileText, Database, CheckCircle } from "lucide-react"
import { Link } from "@inertiajs/react"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Aksi cepat untuk operasi bridging harian</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Button asChild className="h-20 flex-col space-y-2">
          <Link href="/sales/upload-bi">
            <Upload className="h-6 w-6" />
            <span className="text-sm">Upload BI Sales</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
          <Link href="/sales/upload-bank">
            <FileText className="h-6 w-6" />
            <span className="text-sm">Upload Bank Statement</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
          <Link href="/purchase/import">
            <Database className="h-6 w-6" />
            <span className="text-sm">Import BOH</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
          <Link href="/sales/verification">
            <CheckCircle className="h-6 w-6" />
            <span className="text-sm">Review Selisih</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
          <Link href="/integration/accurate">
            <Sync className="h-6 w-6" />
            <span className="text-sm">Sync ke Accurate</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
          <Link href="/sales/resume">
            <Download className="h-6 w-6" />
            <span className="text-sm">Download Resume</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
