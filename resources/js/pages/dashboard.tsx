import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    ShoppingCart,
    TrendingUp,
    Settings,
    FileText,
    Upload,
    CheckCircle,
    AlertTriangle,
    Activity,
    BarChart3
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - FAT Tomoro" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">FAT Tomoro Dashboard</h1>
                    <p className="text-muted-foreground">
                        Bridging system untuk integrasi data BOH, BI, dan Bank ke Accurate
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Files Uploaded Today</CardTitle>
                            <Upload className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Successfully Processed</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">66.7% success rate</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">Requires attention</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Posted to Accurate</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-muted-foreground">Auto-posted</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>
                            Aksi cepat untuk operasional harian
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            <Link href="/purchases/import">
                                <Button variant="outline" className="h-20 w-full flex-col gap-2">
                                    <ShoppingCart className="h-6 w-6" />
                                    <span className="text-sm">Upload BOH</span>
                                </Button>
                            </Link>

                            <Link href="/sales/upload-bi">
                                <Button variant="outline" className="h-20 w-full flex-col gap-2">
                                    <TrendingUp className="h-6 w-6" />
                                    <span className="text-sm">Upload BI Sales</span>
                                </Button>
                            </Link>

                            <Link href="/sales/upload-bank">
                                <Button variant="outline" className="h-20 w-full flex-col gap-2">
                                    <BarChart3 className="h-6 w-6" />
                                    <span className="text-sm">Upload Bank</span>
                                </Button>
                            </Link>

                            <Link href="/master/coa">
                                <Button variant="outline" className="h-20 w-full flex-col gap-2">
                                    <Settings className="h-6 w-6" />
                                    <span className="text-sm">Master Data</span>
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Purchases</CardTitle>
                            <CardDescription>BOH files processed recently</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-4 w-4 text-green-600" />
                                        <div>
                                            <p className="text-sm font-medium">BOH_2024-01-15.xlsx</p>
                                            <p className="text-xs text-muted-foreground">127 rows processed</p>
                                        </div>
                                    </div>
                                    <Badge variant="default">Posted</Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                                        <div>
                                            <p className="text-sm font-medium">BOH_2024-01-14.csv</p>
                                            <p className="text-xs text-muted-foreground">89 rows, mapping issues</p>
                                        </div>
                                    </div>
                                    <Badge variant="destructive">Failed</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                            <CardDescription>BI sales and reconciliation status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-4 w-4 text-green-600" />
                                        <div>
                                            <p className="text-sm font-medium">BI_Sales_2024-01-15.xlsx</p>
                                            <p className="text-xs text-muted-foreground">GoFood: 45, GrabFood: 32</p>
                                        </div>
                                    </div>
                                    <Badge variant="default">Reconciled</Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                        <div>
                                            <p className="text-sm font-medium">Bank_Statement_2024-01-15.csv</p>
                                            <p className="text-xs text-muted-foreground">3 unmatched transactions</p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary">Pending</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
