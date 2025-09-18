import { FatFileUpload } from '@/components/fat-file-upload';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ShoppingCart, Upload, FileText, CheckCircle, XCircle, Eye, Edit, Save, X } from 'lucide-react';
import { useState } from 'react';

interface SalesOrderItem {
    id: number;
    file_id: number;
    line_no: string;
    product_code: string;
    product_name: string;
    price_incl_tax: number;
    qty: number;
    uom: string;
    amt_incl_tax: number;
}

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
    sales_order_items?: SalesOrderItem[];
}

interface Props {
    recentFiles: File[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pembelian', href: '/purchases' },
    { title: 'Import BOH', href: '/purchases/import' },
];

const statusConfig = {
    uploaded: { label: 'Uploaded', icon: Upload, variant: 'secondary' as const },
    parsed: { label: 'Parsed', icon: FileText, variant: 'default' as const },
    validated: { label: 'Validated', icon: CheckCircle, variant: 'default' as const },
    committed: { label: 'Committed', icon: CheckCircle, variant: 'default' as const },
    failed: { label: 'Failed', icon: XCircle, variant: 'destructive' as const },
};

export default function PurchaseImport({ recentFiles }: Props) {
    const [editingItem, setEditingItem] = useState<number | null>(null);
    const [editingData, setEditingData] = useState<Partial<SalesOrderItem>>({});

    // Debug: log recent files to see if sales order items are loaded
    console.log('Recent files:', recentFiles);

    const handleUploadSuccess = (fileData: any) => {
        console.log('Upload successful:', fileData);
        // Refresh the page to show new file
        window.location.reload();
    };

    const handleUploadError = (error: string) => {
        console.error('Upload error:', error);
        // Show error message
    };

    const handleEditItem = (item: SalesOrderItem) => {
        setEditingItem(item.id);
        setEditingData(item);
    };

    const handleSaveItem = async (itemId: number) => {
        try {
            const response = await fetch(`/purchases/sales-order-items/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify(editingData),
            });

            if (response.ok) {
                setEditingItem(null);
                setEditingData({});
                window.location.reload(); // Refresh to show updated data
            } else {
                console.error('Failed to update item');
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingItem(null);
        setEditingData({});
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
            <Head title="Import BOH - Pembelian" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                    <ShoppingCart className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Import BOH</h1>
                            <p className="text-muted-foreground">Upload file BOH untuk diproses ke Accurate</p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        CSV / Excel
                    </Badge>
                </div>

                {/* Process Flow */}
                {/* <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Alur Proses BOH → Accurate
                        </CardTitle>
                        <CardDescription>
                            Proses otomatis dari upload file BOH hingga posting ke Accurate
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-5">
                            <div className="text-center">
                                <div className="mb-2 rounded-full bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center mx-auto font-semibold">1</div>
                                <p className="text-sm font-medium">Upload BOH</p>
                                <p className="text-xs text-muted-foreground">CSV/Excel</p>
                            </div>
                            <div className="text-center opacity-60">
                                <div className="mb-2 rounded-full bg-muted text-muted-foreground w-8 h-8 flex items-center justify-center mx-auto font-semibold">2</div>
                                <p className="text-sm font-medium">Parse & Preview</p>
                                <p className="text-xs text-muted-foreground">Validasi format</p>
                            </div>
                            <div className="text-center opacity-60">
                                <div className="mb-2 rounded-full bg-muted text-muted-foreground w-8 h-8 flex items-center justify-center mx-auto font-semibold">3</div>
                                <p className="text-sm font-medium">Mapping</p>
                                <p className="text-xs text-muted-foreground">COA, Supplier</p>
                            </div>
                            <div className="text-center opacity-60">
                                <div className="mb-2 rounded-full bg-muted text-muted-foreground w-8 h-8 flex items-center justify-center mx-auto font-semibold">4</div>
                                <p className="text-sm font-medium">Validasi</p>
                                <p className="text-xs text-muted-foreground">Final check</p>
                            </div>
                            <div className="text-center opacity-60">
                                <div className="mb-2 rounded-full bg-muted text-muted-foreground w-8 h-8 flex items-center justify-center mx-auto font-semibold">5</div>
                                <p className="text-sm font-medium">Post Accurate</p>
                                <p className="text-xs text-muted-foreground">Auto posting</p>
                            </div>
                        </div>
                    </CardContent>
                </Card> */}

                {/* File Upload Component */}
                <FatFileUpload
                    allowedTypes={["BOH"]}
                    defaultType="BOH"
                    onUploadSuccess={handleUploadSuccess}
                    onUploadError={handleUploadError}
                />

                {/* Recent Files */}
                <Card>
                    <CardHeader>
                        <CardTitle>File Terbaru</CardTitle>
                        <CardDescription>History upload BOH purchase files</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recentFiles.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                Belum ada file yang diupload. Upload file BOH pertama Anda di atas.
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
                                                            <Button size="sm" onClick={async () => {
                                                                try {
                                                                    const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                                                                    const res = await fetch('/purchases/process-transform', {
                                                                        method: 'POST',
                                                                        headers: {
                                                                            'X-CSRF-TOKEN': csrf,
                                                                            'Accept': 'application/json',
                                                                            'Content-Type': 'application/json',
                                                                        },
                                                                        body: JSON.stringify({ file_id: file.id }),
                                                                    })
                                                                    const json = await res.json()
                                                                    if (json.success) {
                                                                        window.location.href = '/purchases/posting'
                                                                    } else {
                                                                        alert(json.message || 'Transform failed')
                                                                    }
                                                                } catch (e) {
                                                                    alert('Transform error')
                                                                }
                                                            }}>
                                                                Transform
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

                {/* Sales Order Items for parsed files */}
                {(() => {
                    const filesWithItems = recentFiles.filter(file => file.sales_order_items && file.sales_order_items.length > 0);
                    console.log('Files with sales order items:', filesWithItems);
                    return filesWithItems;
                })().map((file) => (
                    <Card key={`items-${file.id}`}>
                        <CardHeader>
                            <CardTitle>Data Sales Order - {file.original_name}</CardTitle>
                            <CardDescription>Data yang telah diparse dari file CSV/Excel (dapat diedit)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Line No</TableHead>
                                        <TableHead>Product Code</TableHead>
                                        <TableHead>Product Name</TableHead>
                                        <TableHead>Price Incl Tax</TableHead>
                                        <TableHead>Qty</TableHead>
                                        <TableHead>UOM</TableHead>
                                        <TableHead>Amt Incl Tax</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {file.sales_order_items?.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.line_no}</TableCell>
                                            <TableCell>
                                                {editingItem === item.id ? (
                                                    <Input
                                                        value={editingData.product_code || ''}
                                                        onChange={(e) => setEditingData({...editingData, product_code: e.target.value})}
                                                        className="w-full"
                                                    />
                                                ) : (
                                                    item.product_code
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {editingItem === item.id ? (
                                                    <Input
                                                        value={editingData.product_name || ''}
                                                        onChange={(e) => setEditingData({...editingData, product_name: e.target.value})}
                                                        className="w-full"
                                                    />
                                                ) : (
                                                    item.product_name
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {editingItem === item.id ? (
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        value={editingData.price_incl_tax || 0}
                                                        onChange={(e) => setEditingData({...editingData, price_incl_tax: parseFloat(e.target.value)})}
                                                        className="w-full"
                                                    />
                                                ) : (
                                                    `Rp ${item.price_incl_tax.toLocaleString('id-ID')}`
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {editingItem === item.id ? (
                                                    <Input
                                                        type="number"
                                                        step="0.001"
                                                        value={editingData.qty || 0}
                                                        onChange={(e) => setEditingData({...editingData, qty: parseFloat(e.target.value)})}
                                                        className="w-full"
                                                    />
                                                ) : (
                                                    item.qty
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {editingItem === item.id ? (
                                                    <Input
                                                        value={editingData.uom || ''}
                                                        onChange={(e) => setEditingData({...editingData, uom: e.target.value})}
                                                        className="w-full"
                                                    />
                                                ) : (
                                                    item.uom
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {editingItem === item.id ? (
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        value={editingData.amt_incl_tax || 0}
                                                        onChange={(e) => setEditingData({...editingData, amt_incl_tax: parseFloat(e.target.value)})}
                                                        className="w-full"
                                                    />
                                                ) : (
                                                    `Rp ${item.amt_incl_tax.toLocaleString('id-ID')}`
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {editingItem === item.id ? (
                                                    <div className="flex gap-2">
                                                        <Button size="sm" onClick={() => handleSaveItem(item.id)}>
                                                            <Save className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <Button size="sm" variant="outline" onClick={() => handleEditItem(item)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}