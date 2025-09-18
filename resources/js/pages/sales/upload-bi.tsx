import { FatFileUpload } from '@/components/fat-file-upload';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TrendingUp, Upload, FileText, AlertCircle, CheckCircle, XCircle, Eye, Calendar, ArrowRight } from 'lucide-react';

interface File {
    id: number;
    original_name: string;
    type: string;
    status: string;
    size_bytes: number;
    rows_detected: number;
    created_at: string;
    created_by: {
        name: string;
    };
}

interface Props {
    recentFiles: File[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Penjualan & Rekonsiliasi', href: '/sales' },
    { title: 'Upload Penjualan BI', href: '/sales/upload-bi' },
];

const statusConfig = {
    uploaded: { label: 'Uploaded', icon: Upload, variant: 'secondary' as const },
    parsed: { label: 'Parsed', icon: FileText, variant: 'default' as const },
    validated: { label: 'Validated', icon: CheckCircle, variant: 'default' as const },
    committed: { label: 'Committed', icon: CheckCircle, variant: 'default' as const },
    failed: { label: 'Failed', icon: XCircle, variant: 'destructive' as const },
};

export default function SalesUploadBi({ recentFiles }: Props) {
    const handleUploadSuccess = (fileData: any) => {
        console.log('Upload BI successful:', fileData);
        // Refresh the page to show new file
        window.location.reload();
    };

    const handleUploadError = (error: string) => {
        console.error('Upload BI error:', error);
        // Show error message
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('id-ID');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Upload Penjualan BI - Penjualan" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Upload Penjualan BI</h1>
                            <p className="text-muted-foreground">Upload data penjualan dari BI Tomoro (All Channel, per tanggal)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-sm">CSV / Excel</Badge>
                        <Button onClick={() => (window.location.href = '/sales/upload-bank')} className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4" />
                            Lanjut ke Upload Bank
                        </Button>
                    </div>
                </div>

                {/* Instructions */}
                <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                        Upload file ekspor penjualan dari BI Tomoro dalam format CSV/Excel. File harus berisi data: tanggal,
                        channel, gross sales, diskon/fee/ads, nett sales, dan detail item per transaksi.
                    </AlertDescription>
                </Alert>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Files Today</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">files uploaded</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">479</div>
                            <p className="text-xs text-muted-foreground">total processed</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Channels</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4</div>
                            <p className="text-xs text-muted-foreground">active channels</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Rp 65.8M</div>
                            <p className="text-xs text-muted-foreground">gross sales</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Preview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Preview</CardTitle>
                        <CardDescription>Preview data yang berhasil diparse dari file BI</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="p-4 border rounded-lg">
                                    <h4 className="font-medium mb-2">Channel Breakdown</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span>GoFood:</span><span className="font-medium">Rp 22.5M (45%)</span></div>
                                        <div className="flex justify-between"><span>GrabFood:</span><span className="font-medium">Rp 18.2M (37%)</span></div>
                                        <div className="flex justify-between"><span>ShopeeFood:</span><span className="font-medium">Rp 8.1M (16%)</span></div>
                                        <div className="flex justify-between"><span>Offline:</span><span className="font-medium">Rp 1.0M (2%)</span></div>
                                    </div>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <h4 className="font-medium mb-2">Fee & Discount Summary</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span>Total Commission:</span><span className="font-medium text-red-600">Rp -4.25M</span></div>
                                        <div className="flex justify-between"><span>Total Ads:</span><span className="font-medium text-red-600">Rp -250K</span></div>
                                        <div className="flex justify-between"><span>Net Sales:</span><span className="font-medium text-green-600">Rp 45.3M</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <span className="font-medium text-green-800">Data Successfully Parsed</span>
                                </div>
                                <p className="text-sm text-green-700 mt-1">Semua channel terdeteksi dengan benar. Diskon otomatis digenerate dari gross ke nett sales.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* File Upload Component */}
                <FatFileUpload
                    allowedTypes={["BI"]}
                    defaultType="BI"
                    onUploadSuccess={handleUploadSuccess}
                    onUploadError={handleUploadError}
                />


                {/* Recent BI Files */}
                <Card>
                    <CardHeader>
                        <CardTitle>File BI Terbaru</CardTitle>
                        <CardDescription>History upload BI sales files</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recentFiles.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                Belum ada file BI yang diupload. Upload file BI pertama Anda di atas.
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama File</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Ukuran</TableHead>
                                        <TableHead>Baris</TableHead>
                                        <TableHead>Upload By</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentFiles.map((file) => {
                                        const status = statusConfig[file.status as keyof typeof statusConfig];
                                        const StatusIcon = status.icon;

                                        return (
                                            <TableRow key={file.id}>
                                                <TableCell className="font-medium">
                                                    {file.original_name}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={status.variant} className="flex items-center gap-1 w-fit">
                                                        <StatusIcon className="h-3 w-3" />
                                                        {status.label}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{formatFileSize(file.size_bytes)}</TableCell>
                                                <TableCell>{file.rows_detected?.toLocaleString() || '-'}</TableCell>
                                                <TableCell>{file.created_by.name}</TableCell>
                                                <TableCell>{formatDate(file.created_at)}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="h-4 w-4 mr-1" />
                                                            Lihat
                                                        </Button>
                                                        {file.status === 'parsed' && (
                                                            <Button size="sm">
                                                                Process
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}