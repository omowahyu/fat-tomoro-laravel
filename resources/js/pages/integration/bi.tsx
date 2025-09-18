import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BarChart3, Settings, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Integration', href: '/integration' },
    { title: 'BI System', href: '/integration/bi' },
];

export default function IntegrationBI() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="BI Integration - Tomoro Bridging" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <BarChart3 className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">BI System Integration</h1>
                            <p className="text-muted-foreground">Business Intelligence data import dan sales analysis</p>
                        </div>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Configure BI
                    </Button>
                </div>

                {/* BI Connection Status */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Connection Status</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">Connected</div>
                            <p className="text-xs text-muted-foreground">BI dashboard active</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
                            <BarChart3 className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-muted-foreground">active data feeds</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
                            <Clock className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">15m ago</div>
                            <p className="text-xs text-muted-foreground">sales data updated</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Data Quality</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">98.5%</div>
                            <p className="text-xs text-muted-foreground">accuracy rate</p>
                        </CardContent>
                    </Card>
                </div>

                {/* BI Data Sources */}
                <Card>
                    <CardHeader>
                        <CardTitle>Connected BI Data Sources</CardTitle>
                        <CardDescription>
                            Sales channels yang terhubung dengan BI system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <div>
                                        <p className="font-medium">GoFood Sales Dashboard</p>
                                        <p className="text-sm text-muted-foreground">Real-time transaction data • Last sync: 2 min ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="default">Live</Badge>
                                    <span className="text-sm text-muted-foreground">2,458 orders today</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <div>
                                        <p className="font-medium">GrabFood Analytics</p>
                                        <p className="text-sm text-muted-foreground">Hourly batch updates • Last sync: 15 min ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="default">Active</Badge>
                                    <span className="text-sm text-muted-foreground">1,834 orders today</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <div>
                                        <p className="font-medium">ShopeeFood Merchant</p>
                                        <p className="text-sm text-muted-foreground">Daily reports • Last sync: 1 hour ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="default">Active</Badge>
                                    <span className="text-sm text-muted-foreground">756 orders today</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                    <div>
                                        <p className="font-medium">POS System - Store</p>
                                        <p className="text-sm text-muted-foreground">Real-time sync • Connected via API</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="default">Live</Badge>
                                    <span className="text-sm text-muted-foreground">892 transactions today</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                                    <div>
                                        <p className="font-medium">Manual Upload Portal</p>
                                        <p className="text-sm text-muted-foreground">Excel/CSV imports • Last upload: 3 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="secondary">Manual</Badge>
                                    <span className="text-sm text-muted-foreground">245 records uploaded</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Sales Performance Today */}
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Sales Performance</CardTitle>
                        <CardDescription>Real-time sales metrics dari semua channel</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Total Orders</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">6,185</div>
                                    <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                                        <span>↗</span>
                                        <span>+12.5% vs yesterday</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Total Revenue</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">Rp 485M</div>
                                    <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                                        <span>↗</span>
                                        <span>+8.3% vs yesterday</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Average Order</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">Rp 78,400</div>
                                    <div className="flex items-center gap-1 text-sm text-red-600 mt-1">
                                        <span>↘</span>
                                        <span>-3.2% vs yesterday</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Completion Rate</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">96.8%</div>
                                    <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                                        <span>↗</span>
                                        <span>+1.1% vs yesterday</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Processing Pipeline */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Processing Pipeline</CardTitle>
                        <CardDescription>Alur pemrosesan data dari BI ke Accurate Accounting</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <BarChart3 className="h-4 w-4" />
                                        1. Data Collection
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        <span>Real-time APIs</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span>Batch imports</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                        <span>Manual uploads</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                        <span>POS integrations</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <Zap className="h-4 w-4" />
                                        2. Data Validation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        <span>Format validation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span>Duplicate detection</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                        <span>Business rules check</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                        <span>AI anomaly detection</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <Settings className="h-4 w-4" />
                                        3. Data Transformation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        <span>Channel mapping</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span>Item categorization</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                        <span>Tax calculations</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                        <span>Currency conversion</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4" />
                                        4. Export Ready
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        <span>Accurate format</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span>Journal entries</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                        <span>Trial balance</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                        <span>Financial reports</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                {/* Quality Metrics */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Quality Metrics</CardTitle>
                        <CardDescription>Kualitas data dan accuracy rates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Processing Success Rate</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">GoFood</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 h-2 bg-gray-200 rounded-full">
                                                    <div className="w-19 h-2 bg-green-600 rounded-full"></div>
                                                </div>
                                                <span className="text-sm font-medium">99.2%</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">GrabFood</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 h-2 bg-gray-200 rounded-full">
                                                    <div className="w-18 h-2 bg-green-600 rounded-full"></div>
                                                </div>
                                                <span className="text-sm font-medium">98.7%</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">ShopeeFood</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 h-2 bg-gray-200 rounded-full">
                                                    <div className="w-17 h-2 bg-yellow-600 rounded-full"></div>
                                                </div>
                                                <span className="text-sm font-medium">97.1%</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">POS Store</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 h-2 bg-gray-200 rounded-full">
                                                    <div className="w-20 h-2 bg-green-600 rounded-full"></div>
                                                </div>
                                                <span className="text-sm font-medium">100%</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Recent Issues</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                                            <span>ShopeeFood: 12 missing items today</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span>All duplicate orders resolved</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span>Format validation passed</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span>Tax calculations verified</span>
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