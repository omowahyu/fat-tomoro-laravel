import { AIMatchingEngine } from '@/components/ai-matching-engine';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TrendingUp, Eye, Edit, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Penjualan & Rekonsiliasi', href: '/sales' },
    { title: 'Match & Verifikasi', href: '/sales/verification' },
];

// Sample data
const biData = [
  {
    id: 1,
    channel: "GoFood",
    date: "2024-03-15",
    grossSales: 10000000,
    comFee: 2000000,
    ads: 50000,
    nettSales: 7950000,
    transactions: 45,
  },
  {
    id: 2,
    channel: "GrabFood", 
    date: "2024-03-15",
    grossSales: 9000000,
    comFee: 1800000,
    ads: 150000,
    nettSales: 7050000,
    transactions: 38,
  },
  {
    id: 3,
    channel: "ShopeeFood",
    date: "2024-03-15", 
    grossSales: 3000000,
    comFee: 450000,
    ads: 50000,
    nettSales: 2500000,
    transactions: 22,
  },
];

const matchingResults = [
  {
    id: 1,
    channel: "GoFood",
    biAmount: 7950000,
    bankAmount: 7900000,
    difference: -50000,
    status: "partial",
    rule: "T vs T+1",
    confidence: 95,
  },
  {
    id: 2,
    channel: "GrabFood",
    biAmount: 7050000,
    bankAmount: 7050000,
    difference: 0,
    status: "matched",
    rule: "T vs T+1", 
    confidence: 100,
  },
  {
    id: 3,
    channel: "ShopeeFood",
    biAmount: 2500000,
    bankAmount: 0,
    difference: -2500000,
    status: "unmatched",
    rule: "T vs T+1",
    confidence: 0,
  },
];

export default function SalesVerification() {
    const [activeTab, setActiveTab] = useState('matching');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Match & Verifikasi - Penjualan" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Match & Verifikasi</h1>
                            <p className="text-muted-foreground">Matching otomatis BI Sales vs Bank Statement (T vs T+1)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Select defaultValue="2024-03-15">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Pilih tanggal" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2024-03-15">15 Mar 2024</SelectItem>
                                <SelectItem value="2024-03-14">14 Mar 2024</SelectItem>
                                <SelectItem value="2024-03-13">13 Mar 2024</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4" />
                            Run Matching
                        </Button>
                    </div>
                </div>

                {/* Matching Summary */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Matched</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">1</div>
                            <p className="text-xs text-muted-foreground">100% confidence</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Partial Match</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">1</div>
                            <p className="text-xs text-muted-foreground">small difference</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unmatched</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">1</div>
                            <p className="text-xs text-muted-foreground">need attention</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Difference</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">Rp 2.55M</div>
                            <p className="text-xs text-muted-foreground">to investigate</p>
                        </CardContent>
                    </Card>
                </div>

                {/* AI Matching Engine */}
                <AIMatchingEngine />

                {/* Tab Navigation */}
                <Card>
                    <CardHeader>
                        <CardTitle>Verification Results</CardTitle>
                        <CardDescription>Hasil matching dan data untuk verifikasi</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-1 border-b mb-4">
                            <button
                                onClick={() => setActiveTab('matching')}
                                className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
                                    activeTab === 'matching' 
                                        ? 'bg-background text-foreground border-b-2 border-primary' 
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Matching Results
                            </button>
                            <button
                                onClick={() => setActiveTab('bi-data')}
                                className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
                                    activeTab === 'bi-data' 
                                        ? 'bg-background text-foreground border-b-2 border-primary' 
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                BI Sales Data
                            </button>
                            <button
                                onClick={() => setActiveTab('bank-data')}
                                className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
                                    activeTab === 'bank-data' 
                                        ? 'bg-background text-foreground border-b-2 border-primary' 
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Bank Statement
                            </button>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'matching' && (
                            <div className="space-y-4">
                                {matchingResults.map((result) => (
                                    <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <Badge variant="outline">{result.channel}</Badge>
                                            <div>
                                                <p className="font-medium">BI: Rp {result.biAmount.toLocaleString('id-ID')}</p>
                                                <p className="text-sm text-muted-foreground">Bank: Rp {result.bankAmount.toLocaleString('id-ID')}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <p className={`text-sm font-medium ${result.difference === 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {result.difference === 0 ? 'Perfect Match' : `Diff: Rp ${Math.abs(result.difference).toLocaleString('id-ID')}`}
                                                </p>
                                                <p className="text-xs text-muted-foreground">{result.confidence}% confidence</p>
                                            </div>
                                            <Badge
                                                variant={result.status === "matched" ? "default" : result.status === "partial" ? "secondary" : "destructive"}
                                            >
                                                {result.status}
                                            </Badge>
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'bi-data' && (
                            <div className="space-y-4">
                                {biData.map((item) => (
                                    <div key={item.id} className="grid gap-4 md:grid-cols-6 p-4 border rounded-lg">
                                        <div>
                                            <Badge variant="outline">{item.channel}</Badge>
                                            <p className="text-sm text-muted-foreground mt-1">{item.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Gross: Rp {item.grossSales.toLocaleString('id-ID')}</p>
                                            <p className="text-xs text-muted-foreground">{item.transactions} transaksi</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Fee: Rp {item.comFee.toLocaleString('id-ID')}</p>
                                            <p className="text-xs text-muted-foreground">{((item.comFee / item.grossSales) * 100).toFixed(1)}%</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Ads: Rp {item.ads.toLocaleString('id-ID')}</p>
                                            <p className="text-xs text-muted-foreground">{((item.ads / item.grossSales) * 100).toFixed(1)}%</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Nett: Rp {item.nettSales.toLocaleString('id-ID')}</p>
                                            <p className="text-xs text-muted-foreground">{((item.nettSales / item.grossSales) * 100).toFixed(1)}%</p>
                                        </div>
                                        <div>
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <Button variant="outline">
                                Back to Upload
                            </Button>
                            <div className="flex gap-3">
                                <Button variant="outline">
                                    Export Exceptions
                                </Button>
                                <Button>
                                    Continue to Review
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}