import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Database, Zap, AlertCircle, Settings, Clock, CheckCircle, XCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Integration', href: '/integration' },
    { title: 'BOH System', href: '/integration/boh' },
];

export default function IntegrationBOH() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="BOH Integration - Tomoro Bridging" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Database className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">BOH System Integration</h1>
                            <p className="text-muted-foreground">Back of House system untuk import data harian</p>
                        </div>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Configure BOH
                    </Button>
                </div>

                {/* Connection Status */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Connection Status</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">Connected</div>
                            <p className="text-xs text-muted-foreground">last ping: 30s ago</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Data Sync</CardTitle>
                            <Clock className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Daily</div>
                            <p className="text-xs text-muted-foreground">at 23:00 WIB</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Last Import</CardTitle>
                            <Zap className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2h ago</div>
                            <p className="text-xs text-muted-foreground">4,582 records</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">99.8%</div>
                            <p className="text-xs text-muted-foreground">last 30 days</p>
                        </CardContent>
                    </Card>
                </div>

                {/* BOH Configuration */}
                <Card>
                    <CardHeader>
                        <CardTitle>BOH System Configuration</CardTitle>
                        <CardDescription>
                            Konfigurasi koneksi dan schedule import dari BOH system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">BOH Server URL</label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded border">
                                        <code className="text-sm">https://boh.toromoreport.com/api/v2</code>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Authentication Method</label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded border">
                                        <code className="text-sm">API Key + Basic Auth</code>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Import Schedule</label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded border">
                                        <code className="text-sm">Daily at 23:00 WIB (Auto)</code>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Data Types</label>
                                    <div className="mt-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">Sales Transactions</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">Inventory Movements</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">Expense Records</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">Staff Performance</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Last API Response</label>
                                    <div className="mt-1 p-3 bg-green-50 rounded border border-green-200">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm text-green-700">200 OK - Data received successfully</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Import History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Import History</CardTitle>
                        <CardDescription>Recent data imports from BOH system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">January 15, 2024 - 23:00</p>
                                        <p className="text-sm text-muted-foreground">Sales: 4,582 records • Inventory: 1,245 movements • Expenses: 89 items</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant="default">Success</Badge>
                                    <p className="text-sm text-muted-foreground mt-1">2m 34s</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">January 14, 2024 - 23:00</p>
                                        <p className="text-sm text-muted-foreground">Sales: 4,198 records • Inventory: 1,156 movements • Expenses: 76 items</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant="default">Success</Badge>
                                    <p className="text-sm text-muted-foreground mt-1">2m 18s</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                                    <div>
                                        <p className="font-medium">January 13, 2024 - 23:00</p>
                                        <p className="text-sm text-muted-foreground">Sales: 3,847 records • Inventory: 1,089 movements • Expenses: 0 items (partial failure)</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant="secondary">Partial</Badge>
                                    <p className="text-sm text-muted-foreground mt-1">1m 56s</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">January 12, 2024 - 23:00</p>
                                        <p className="text-sm text-muted-foreground">Sales: 4,321 records • Inventory: 1,387 movements • Expenses: 92 items</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant="default">Success</Badge>
                                    <p className="text-sm text-muted-foreground mt-1">2m 41s</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Flow */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Flow Overview</CardTitle>
                        <CardDescription>How data flows from BOH to Accurate Accounting</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <Database className="h-4 w-4" />
                                        1. BOH System
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span>Daily sales data</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        <span>Inventory movements</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                        <span>Expense records</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                        <span>Staff data</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <Zap className="h-4 w-4" />
                                        2. Data Processing
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span>Format transformation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        <span>Validation rules</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                        <span>COA mapping</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                        <span>Error handling</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4" />
                                        3. Accurate Export
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span>Journal entries</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        <span>Trial balance</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                        <span>Financial reports</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                        <span>Audit trail</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                {/* Current Sync Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle>Current Sync Status</CardTitle>
                        <CardDescription>Real-time progress of today's data import</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Sales Transactions</span>
                                    <span>4,582 / 4,582</span>
                                </div>
                                <Progress value={100} className="h-2" />
                            </div>
                            
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Inventory Movements</span>
                                    <span>1,245 / 1,245</span>
                                </div>
                                <Progress value={100} className="h-2" />
                            </div>
                            
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Expense Records</span>
                                    <span>89 / 89</span>
                                </div>
                                <Progress value={100} className="h-2" />
                            </div>
                            
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Staff Performance</span>
                                    <span>24 / 24</span>
                                </div>
                                <Progress value={100} className="h-2" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>BOH system management and troubleshooting</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                Force Sync Now
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Settings className="h-4 w-4" />
                                Test Connection
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                View Error Logs
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Database className="h-4 w-4" />
                                Export Report
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}