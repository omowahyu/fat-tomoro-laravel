import { FatFileUpload } from '@/components/fat-file-upload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TrendingUp, FileText, AlertCircle, Building2, CheckCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Penjualan & Rekonsiliasi', href: '/sales' },
    { title: 'Upload Bank Statement', href: '/sales/upload-bank' },
];

// Sample recent bank uploads
const recentUploads = [
  {
    id: 1,
    filename: "BCA_Statement_20240315.csv",
    uploadTime: "2024-03-15 16:30:00",
    status: "completed",
    records: 125,
    matched: 118,
    bank: "BCA",
  },
  {
    id: 2,
    filename: "Mandiri_Statement_20240314.csv", 
    uploadTime: "2024-03-14 14:45:00",
    status: "completed",
    records: 89,
    matched: 82,
    bank: "Mandiri",
  },
  {
    id: 3,
    filename: "BRI_Statement_20240313.csv",
    uploadTime: "2024-03-13 09:20:00", 
    status: "processing",
    records: 67,
    matched: 0,
    bank: "BRI",
  },
];

export default function SalesUploadBank() {
    const handleUploadSuccess = (fileData: any) => {
        console.log('Upload Bank successful:', fileData);
        // Redirect to verification process
    };

    const handleUploadError = (error: string) => {
        console.error('Upload Bank error:', error);
        // Show error message
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Upload Bank Statement - Penjualan" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Upload Bank Statement</h1>
                            <p className="text-muted-foreground">Upload rekening koran untuk matching dengan BI Sales</p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        CSV / Excel
                    </Badge>
                </div>

                {/* Instructions */}
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Upload file rekening koran dalam format CSV atau Excel. Pastikan file mengandung kolom: 
                        tanggal, deskripsi transaksi, amount, dan referensi. Sistem akan otomatis mencocokkan 
                        dengan data BI Sales berdasarkan aturan T vs T+1.
                    </AlertDescription>
                </Alert>

                {/* Supported Banks */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            Bank Yang Didukung
                        </CardTitle>
                        <CardDescription>Format rekening koran yang kompatibel</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="flex items-center gap-3 p-3 border rounded">
                                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                    <Building2 className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium">BCA</p>
                                    <p className="text-xs text-muted-foreground">CSV/Excel</p>
                                </div>
                                <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 border rounded">
                                <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center">
                                    <Building2 className="h-4 w-4 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="font-medium">Mandiri</p>
                                    <p className="text-xs text-muted-foreground">CSV/Excel</p>
                                </div>
                                <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 border rounded">
                                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                    <Building2 className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium">BRI</p>
                                    <p className="text-xs text-muted-foreground">CSV/Excel</p>
                                </div>
                                <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 border rounded">
                                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                                    <Building2 className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium">BNI</p>
                                    <p className="text-xs text-muted-foreground">CSV/Excel</p>
                                </div>
                                <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* File Upload Component */}
                <FatFileUpload
                    allowedTypes={["BANK"]}
                    defaultType="BANK"
                    onUploadSuccess={handleUploadSuccess}
                    onUploadError={handleUploadError}
                />

                {/* Processing Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Statements Processed</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">281</div>
                            <p className="text-xs text-muted-foreground">total files processed</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Auto-Match Rate</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">94.2%</div>
                            <p className="text-xs text-muted-foreground">transactions matched</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Processing</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1.8s</div>
                            <p className="text-xs text-muted-foreground">per statement</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Bank Uploads */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Bank Uploads</CardTitle>
                        <CardDescription>History upload rekening koran terbaru</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentUploads.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <Building2 className="h-8 w-8 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">{item.filename}</p>
                                            <p className="text-sm text-muted-foreground">{item.uploadTime} • {item.bank}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            <p className="text-sm font-medium">{item.records} records</p>
                                            {item.status === 'completed' && (
                                                <p className="text-sm text-green-600">{item.matched}/{item.records} matched</p>
                                            )}
                                        </div>
                                        <Badge
                                            variant={
                                                item.status === "completed"
                                                    ? "default"
                                                    : item.status === "processing"
                                                        ? "secondary"
                                                        : "destructive"
                                            }
                                        >
                                            {item.status}
                                        </Badge>
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Next Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Aksi Selanjutnya</CardTitle>
                        <CardDescription>Setelah upload bank statement berhasil</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-2">
                            <Button variant="outline" className="h-16 flex-col gap-2" disabled>
                                <CheckCircle className="h-5 w-5" />
                                <span className="text-sm">Start Auto Matching</span>
                            </Button>
                            <Button variant="outline" className="h-16 flex-col gap-2" disabled>
                                <AlertCircle className="h-5 w-5" />
                                <span className="text-sm">Review Differences</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}