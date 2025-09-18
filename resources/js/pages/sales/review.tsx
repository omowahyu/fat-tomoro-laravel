import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TrendingUp, AlertTriangle, CheckCircle, XCircle, Eye, Edit, ArrowRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Penjualan & Rekonsiliasi', href: '/sales' },
    { title: 'Review Selisih', href: '/sales/review' },
];

const differences = [
    {
        id: 1,
        channel: 'GoFood',
        date: '2024-03-15',
        biAmount: 7950000,
        bankAmount: 7900000,
        difference: -50000,
        percentage: -0.63,
        status: 'minor',
        reason: 'Bank processing fee',
        action: 'approved'
    },
    {
        id: 2,
        channel: 'GrabFood',
        date: '2024-03-15',
        biAmount: 7050000,
        bankAmount: 7050000,
        difference: 0,
        percentage: 0,
        status: 'matched',
        reason: 'Perfect match',
        action: 'auto-approved'
    },
    {
        id: 3,
        channel: 'ShopeeFood',
        date: '2024-03-15',
        biAmount: 2500000,
        bankAmount: 0,
        difference: -2500000,
        percentage: -100,
        status: 'major',
        reason: 'Payment not received (T+1)',
        action: 'pending'
    },
    {
        id: 4,
        channel: 'Offline',
        date: '2024-03-15',
        biAmount: 1200000,
        bankAmount: 1150000,
        difference: -50000,
        percentage: -4.17,
        status: 'minor',
        reason: 'Cash shortage',
        action: 'pending'
    }
];

export default function SalesReview() {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'matched':
                return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Matched</Badge>;
            case 'minor':
                return <Badge variant="secondary"><AlertTriangle className="w-3 h-3 mr-1" />Minor</Badge>;
            case 'major':
                return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Major</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getActionBadge = (action: string) => {
        switch (action) {
            case 'approved':
                return <Badge variant="default">Approved</Badge>;
            case 'auto-approved':
                return <Badge variant="default">Auto-Approved</Badge>;
            case 'pending':
                return <Badge variant="secondary">Pending Review</Badge>;
            default:
                return <Badge variant="outline">{action}</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Review Selisih - Penjualan" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Review Selisih</h1>
                            <p className="text-muted-foreground">Review dan approve selisih antara BI Sales vs Bank Statement</p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        Step 5 of 6
                    </Badge>
                </div>

                {/* Summary Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Perfect Match</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">1</div>
                            <p className="text-xs text-muted-foreground">channels matched</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Minor Issues</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">2</div>
                            <p className="text-xs text-muted-foreground">need review</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Major Issues</CardTitle>
                            <XCircle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">1</div>
                            <p className="text-xs text-muted-foreground">critical review</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Difference</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">Rp 2.6M</div>
                            <p className="text-xs text-muted-foreground">to investigate</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Alert for Major Issues */}
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                        Ditemukan 1 selisih major yang memerlukan investigasi lebih lanjut. 
                        ShopeeFood belum menerima pembayaran (kemungkinan T+1 settlement).
                    </AlertDescription>
                </Alert>

                {/* Differences Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Detail Selisih per Channel</CardTitle>
                        <CardDescription>Review selisih dan tentukan action yang diperlukan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Channel</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>BI Amount</TableHead>
                                    <TableHead>Bank Amount</TableHead>
                                    <TableHead>Difference</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Reason</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Controls</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {differences.map((diff) => (
                                    <TableRow key={diff.id}>
                                        <TableCell>
                                            <Badge variant="outline">{diff.channel}</Badge>
                                        </TableCell>
                                        <TableCell>{diff.date}</TableCell>
                                        <TableCell>Rp {diff.biAmount.toLocaleString('id-ID')}</TableCell>
                                        <TableCell>Rp {diff.bankAmount.toLocaleString('id-ID')}</TableCell>
                                        <TableCell>
                                            <div className={`font-medium ${diff.difference === 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {diff.difference === 0 ? 'Perfect' : `Rp ${Math.abs(diff.difference).toLocaleString('id-ID')}`}
                                            </div>
                                            {diff.difference !== 0 && (
                                                <div className="text-xs text-muted-foreground">
                                                    {diff.percentage > 0 ? '+' : ''}{diff.percentage.toFixed(2)}%
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>{getStatusBadge(diff.status)}</TableCell>
                                        <TableCell className="max-w-[200px]">
                                            <div className="text-sm">{diff.reason}</div>
                                        </TableCell>
                                        <TableCell>{getActionBadge(diff.action)}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                {diff.action === 'pending' && (
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <Button variant="outline">
                                Back to Verification
                            </Button>
                            <div className="flex gap-3">
                                <Button variant="outline">
                                    Export Report
                                </Button>
                                <Button className="flex items-center gap-2">
                                    Continue to Resume
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
