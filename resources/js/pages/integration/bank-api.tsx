import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CreditCard, Settings, CheckCircle, AlertCircle, Clock, Zap } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Integration', href: '/integration' },
    { title: 'Bank API', href: '/integration/bank-api' },
];

export default function IntegrationBankAPI() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bank API Integration" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <CreditCard className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Bank API Integration</h1>
                            <p className="text-muted-foreground">Automated bank statement import via API connections</p>
                        </div>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Configure Bank APIs
                    </Button>
                </div>

                {/* Bank API Status */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Connected Banks</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">active connections</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Auto Sync</CardTitle>
                            <Zap className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Every 2h</div>
                            <p className="text-xs text-muted-foreground">sync frequency</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Today's Sync</CardTitle>
                            <Clock className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">245</div>
                            <p className="text-xs text-muted-foreground">transactions fetched</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">API Health</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">100%</div>
                            <p className="text-xs text-muted-foreground">uptime today</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Bank Connections */}
                <Card>
                    <CardHeader>
                        <CardTitle>Bank API Connections</CardTitle>
                        <CardDescription>
                            Status koneksi API dengan berbagai bank untuk auto-sync
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">BCA</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">BCA - Rekening Operasional</p>
                                        <p className="text-sm text-muted-foreground">Account: ***1234 • Last sync: 2 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="default">Connected</Badge>
                                    <span className="text-sm text-muted-foreground">89 txn today</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-8 bg-yellow-600 rounded flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">MDR</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Mandiri - Giro Bisnis</p>
                                        <p className="text-sm text-muted-foreground">Account: ***5678 • Last sync: 5 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="default">Connected</Badge>
                                    <span className="text-sm text-muted-foreground">156 txn today</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-8 bg-orange-600 rounded flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">BNI</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">BNI - Tabungan Cadangan</p>
                                        <p className="text-sm text-muted-foreground">Account: ***9012 • Manual upload only</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="secondary">Manual</Badge>
                                    <span className="text-sm text-muted-foreground">0 txn today</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded border-dashed">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-8 bg-gray-300 rounded flex items-center justify-center">
                                        <span className="text-gray-600 text-xs font-bold">BSI</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-500">BSI - Setup Pending</p>
                                        <p className="text-sm text-muted-foreground">API credentials required for connection</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="outline">Setup Required</Badge>
                                    <Button size="sm" variant="outline">Configure</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* API Configuration */}
                <Card>
                    <CardHeader>
                        <CardTitle>API Configuration Settings</CardTitle>
                        <CardDescription>Konfigurasi endpoint dan authentication untuk bank APIs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Sync Frequency</label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded border">
                                        <code className="text-sm">Every 2 hours (08:00-22:00)</code>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">API Timeout</label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded border">
                                        <code className="text-sm">30 seconds per request</code>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Retry Policy</label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded border">
                                        <code className="text-sm">3 attempts with backoff</code>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Security</label>
                                    <div className="mt-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">TLS 1.3 encryption</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">API key rotation</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">IP whitelist enabled</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">Request logging</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Transaction Processing */}
                <Card>
                    <CardHeader>
                        <CardTitle>Transaction Processing Pipeline</CardTitle>
                        <CardDescription>Alur pemrosesan data dari bank API ke sistem internal</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <CreditCard className="h-4 w-4" />
                                        1. API Fetch
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span>Connect to bank API</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        <span>Authenticate session</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                        <span>Fetch new transactions</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                        <span>Parse response data</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4" />
                                        2. Data Validation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span>Format validation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        <span>Duplicate checking</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                        <span>Business rule validation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                        <span>Error flagging</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <Zap className="h-4 w-4" />
                                        3. Data Transformation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span>Account mapping</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        <span>Category assignment</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                        <span>Currency standardization</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                        <span>Reference matching</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <Settings className="h-4 w-4" />
                                        4. System Integration
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span>Database storage</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        <span>Reconciliation queue</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                        <span>Accurate export prep</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                        <span>Notification alerts</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent API Calls */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent API Activity</CardTitle>
                        <CardDescription>Log aktivitas terbaru dari bank API calls</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">BCA API - 14:00</p>
                                        <p className="text-sm text-green-600">Fetched 45 transactions successfully in 1.2s</p>
                                    </div>
                                </div>
                                <Badge variant="default">200 OK</Badge>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">Mandiri API - 14:00</p>
                                        <p className="text-sm text-green-600">Fetched 67 transactions successfully in 2.1s</p>
                                    </div>
                                </div>
                                <Badge variant="default">200 OK</Badge>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">BCA API - 12:00</p>
                                        <p className="text-sm text-green-600">Fetched 23 transactions successfully in 0.8s</p>
                                    </div>
                                </div>
                                <Badge variant="default">200 OK</Badge>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                                    <div>
                                        <p className="font-medium">Mandiri API - 12:00</p>
                                        <p className="text-sm text-yellow-600">Timeout after 30s, retrying in 60s</p>
                                    </div>
                                </div>
                                <Badge variant="secondary">Timeout</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* API Management */}
                <Card>
                    <CardHeader>
                        <CardTitle>API Management</CardTitle>
                        <CardDescription>Tools untuk manage dan troubleshoot bank API connections</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                Test All Connections
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Force Sync Now
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Settings className="h-4 w-4" />
                                Update Credentials
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                View API Logs
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}