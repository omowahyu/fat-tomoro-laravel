import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Calculator, Settings, Upload, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Integration', href: '/integration' },
    { title: 'Accurate Accounting', href: '/integration/accurate' },
];

export default function IntegrationAccurate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Accurate Integration - Tomoro Bridging" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Calculator className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Accurate Accounting Integration</h1>
                            <p className="text-muted-foreground">Export data ke Accurate Online untuk accounting & reporting</p>
                        </div>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Export to Accurate
                    </Button>
                </div>

                {/* Accurate Connection Status */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Connection Status</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">Connected</div>
                            <p className="text-xs text-muted-foreground">API credentials valid</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Last Export</CardTitle>
                            <Clock className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1h ago</div>
                            <p className="text-xs text-muted-foreground">Jan 15, 2024 data</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Records Exported</CardTitle>
                            <FileText className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4,582</div>
                            <p className="text-xs text-muted-foreground">journal entries</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">99.2%</div>
                            <p className="text-xs text-muted-foreground">export accuracy</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Current Export Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Current Export Status</CardTitle>
                        <CardDescription>
                            Status export data terbaru ke Accurate Online
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Sales Journal Entries</span>
                                    <span>4,582 / 4,582</span>
                                </div>
                                <Progress value={100} className="h-2" />
                                <div className="flex items-center gap-2 mt-1">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-xs text-green-600">Successfully exported to Accurate</span>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Expense Entries</span>
                                    <span>245 / 245</span>
                                </div>
                                <Progress value={100} className="h-2" />
                                <div className="flex items-center gap-2 mt-1">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-xs text-green-600">Export completed</span>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Inventory Adjustments</span>
                                    <span>1,245 / 1,245</span>
                                </div>
                                <Progress value={100} className="h-2" />
                                <div className="flex items-center gap-2 mt-1">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span className="text-xs text-green-600">All records processed</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Accurate Configuration */}
                <Card>
                    <CardHeader>
                        <CardTitle>Accurate Online Configuration</CardTitle>
                        <CardDescription>Konfigurasi koneksi dan mapping ke Accurate Online</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Accurate Company Database</label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded border">
                                        <code className="text-sm">PT. Tomoro Food Indonesia</code>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">API Endpoint</label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded border">
                                        <code className="text-sm">https://api.accurate.id/api/v1/</code>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Export Schedule</label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded border">
                                        <code className="text-sm">Daily at 01:00 WIB (Auto)</code>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Chart of Accounts</label>
                                    <div className="mt-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">Sales Revenue - Mapped</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">Cost of Goods Sold - Mapped</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">Operating Expenses - Mapped</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">Tax Accounts - Configured</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Last API Response</label>
                                    <div className="mt-1 p-3 bg-green-50 rounded border border-green-200">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm text-green-700">200 OK - Export successful</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Export History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Export History</CardTitle>
                        <CardDescription>Riwayat export data ke Accurate Online</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">January 15, 2024 - Daily Export</p>
                                        <p className="text-sm text-muted-foreground">Sales: 4,582 entries • Expenses: 245 entries • Inventory: 1,245 adjustments</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant="default">Success</Badge>
                                    <p className="text-sm text-muted-foreground mt-1">3m 42s</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">January 14, 2024 - Daily Export</p>
                                        <p className="text-sm text-muted-foreground">Sales: 4,198 entries • Expenses: 198 entries • Inventory: 1,156 adjustments</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant="default">Success</Badge>
                                    <p className="text-sm text-muted-foreground mt-1">3m 18s</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                                    <div>
                                        <p className="font-medium">January 13, 2024 - Daily Export</p>
                                        <p className="text-sm text-muted-foreground">Sales: 3,847 entries • Expenses: 156 entries • Warning: 3 duplicate entries skipped</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant="secondary">Warning</Badge>
                                    <p className="text-sm text-muted-foreground mt-1">2m 56s</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">January 12, 2024 - Daily Export</p>
                                        <p className="text-sm text-muted-foreground">Sales: 4,321 entries • Expenses: 234 entries • Inventory: 1,387 adjustments</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant="default">Success</Badge>
                                    <p className="text-sm text-muted-foreground mt-1">4m 12s</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Mapping Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Mapping Overview</CardTitle>
                        <CardDescription>How data flows to Accurate Chart of Accounts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Revenue Accounts</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>GoFood Sales:</span>
                                        <span className="font-medium">4-10100-001</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>GrabFood Sales:</span>
                                        <span className="font-medium">4-10100-002</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Store Sales:</span>
                                        <span className="font-medium">4-10100-003</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Service Charges:</span>
                                        <span className="font-medium">4-10200-001</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Expense Accounts</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>COGS - Food:</span>
                                        <span className="font-medium">5-50100-001</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>COGS - Packaging:</span>
                                        <span className="font-medium">5-50100-002</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Platform Fees:</span>
                                        <span className="font-medium">6-60100-001</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Delivery Costs:</span>
                                        <span className="font-medium">6-60200-001</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Tax & Other</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>PPN Output:</span>
                                        <span className="font-medium">2-20100-001</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>PPN Input:</span>
                                        <span className="font-medium">1-11300-001</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Bank Settlements:</span>
                                        <span className="font-medium">1-11100-001</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>E-Wallet Balance:</span>
                                        <span className="font-medium">1-11100-002</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                {/* Export Controls */}
                <Card>
                    <CardHeader>
                        <CardTitle>Export Controls</CardTitle>
                        <CardDescription>Manual export dan management tools</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                Export Today's Data
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Generate Preview
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Settings className="h-4 w-4" />
                                Test Connection
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                View Export Log
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Financial Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Financial Summary</CardTitle>
                        <CardDescription>Ringkasan keuangan yang akan di-export ke Accurate</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Revenue Breakdown</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm">GoFood Sales</span>
                                            <span className="font-semibold">Rp 215,450,000</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">GrabFood Sales</span>
                                            <span className="font-semibold">Rp 165,230,000</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Store Sales</span>
                                            <span className="font-semibold">Rp 104,320,000</span>
                                        </div>
                                        <hr />
                                        <div className="flex justify-between">
                                            <span className="font-medium">Total Revenue</span>
                                            <span className="text-lg font-bold">Rp 485,000,000</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Tax & Deductions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm">PPN Output (11%)</span>
                                            <span className="font-semibold">Rp 53,350,000</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Platform Commission</span>
                                            <span className="font-semibold">Rp 76,200,000</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Delivery Fees</span>
                                            <span className="font-semibold">Rp 28,500,000</span>
                                        </div>
                                        <hr />
                                        <div className="flex justify-between">
                                            <span className="font-medium">Net Settlement</span>
                                            <span className="text-lg font-bold">Rp 326,950,000</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}