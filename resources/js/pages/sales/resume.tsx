import { ReconciliationResume } from '@/components/reconciliation-resume';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TrendingUp, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Penjualan & Rekonsiliasi', href: '/sales' },
    { title: 'Resume Rekonsiliasi', href: '/sales/resume' },
];

export default function SalesResume() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resume Rekonsiliasi - Penjualan" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Resume Rekonsiliasi</h1>
                            <p className="text-muted-foreground">Laporan lengkap rekonsiliasi penjualan per channel</p>
                        </div>
                    </div>
                    <Badge variant="default" className="text-sm">
                        Periode: 15 Jan 2024
                    </Badge>
                </div>

                {/* Summary Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Gross</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Rp 45.2M</div>
                            <p className="text-xs text-muted-foreground">total penjualan kotor</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Nett</CardTitle>
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Rp 38.7M</div>
                            <p className="text-xs text-muted-foreground">setelah fee & ads</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Bank In</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Rp 38.2M</div>
                            <p className="text-xs text-muted-foreground">masuk rekening</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Selisih</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">Rp 500K</div>
                            <p className="text-xs text-muted-foreground">perlu investigasi</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Reconciliation Resume Component */}
                <ReconciliationResume />

                {/* Channel Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Breakdown per Channel</CardTitle>
                        <CardDescription>Detail rekonsiliasi per channel delivery</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* GoFood */}
                            <div className="grid gap-4 md:grid-cols-6 p-4 border rounded">
                                <div>
                                    <Badge variant="outline">GoFood</Badge>
                                    <p className="text-sm text-muted-foreground mt-1">Channel #1</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Gross: Rp 18.5M</p>
                                    <p className="text-xs text-muted-foreground">145 transaksi</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Fee: Rp 2.1M</p>
                                    <p className="text-xs text-muted-foreground">11.4%</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Ads: Rp 850K</p>
                                    <p className="text-xs text-muted-foreground">4.6%</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Nett: Rp 15.55M</p>
                                    <p className="text-xs text-muted-foreground">84%</p>
                                </div>
                                <div>
                                    <Badge variant="default" className="text-xs">Matched</Badge>
                                    <p className="text-xs text-muted-foreground mt-1">Bank: Rp 15.55M</p>
                                </div>
                            </div>

                            {/* GrabFood */}
                            <div className="grid gap-4 md:grid-cols-6 p-4 border rounded">
                                <div>
                                    <Badge variant="outline">GrabFood</Badge>
                                    <p className="text-sm text-muted-foreground mt-1">Channel #2</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Gross: Rp 14.2M</p>
                                    <p className="text-xs text-muted-foreground">98 transaksi</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Fee: Rp 1.8M</p>
                                    <p className="text-xs text-muted-foreground">12.7%</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Ads: Rp 650K</p>
                                    <p className="text-xs text-muted-foreground">4.6%</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Nett: Rp 11.75M</p>
                                    <p className="text-xs text-muted-foreground">82.7%</p>
                                </div>
                                <div>
                                    <Badge variant="destructive" className="text-xs">Selisih</Badge>
                                    <p className="text-xs text-muted-foreground mt-1">Bank: Rp 11.25M</p>
                                </div>
                            </div>

                            {/* Offline */}
                            <div className="grid gap-4 md:grid-cols-6 p-4 border rounded">
                                <div>
                                    <Badge variant="outline">Offline</Badge>
                                    <p className="text-sm text-muted-foreground mt-1">Store</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Gross: Rp 12.5M</p>
                                    <p className="text-xs text-muted-foreground">78 transaksi</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Fee: Rp 0</p>
                                    <p className="text-xs text-muted-foreground">0%</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Ads: Rp 0</p>
                                    <p className="text-xs text-muted-foreground">0%</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Nett: Rp 12.5M</p>
                                    <p className="text-xs text-muted-foreground">100%</p>
                                </div>
                                <div>
                                    <Badge variant="default" className="text-xs">Matched</Badge>
                                    <p className="text-xs text-muted-foreground mt-1">Bank: Rp 12.5M</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <Button variant="outline">
                                Back to Review
                            </Button>
                            <div className="flex gap-3">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Export Excel
                                </Button>
                                <Button variant="outline">
                                    Export PDF
                                </Button>
                                <Button>
                                    Post to Accurate
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}