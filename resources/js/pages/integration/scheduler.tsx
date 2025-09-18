import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Calendar, Settings, Play, Pause, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Integration', href: '/integration' },
    { title: 'Scheduler', href: '/integration/scheduler' },
];

export default function IntegrationScheduler() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Scheduler - Integration" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Calendar className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Automated Scheduler</h1>
                            <p className="text-muted-foreground">Schedule dan otomasi untuk data import, export, dan synchronization</p>
                        </div>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Configure Schedule
                    </Button>
                </div>

                {/* Scheduler Status */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                            <Play className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">7</div>
                            <p className="text-xs text-muted-foreground">scheduled tasks</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Next Run</CardTitle>
                            <Clock className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">23:00</div>
                            <p className="text-xs text-muted-foreground">BOH import tonight</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">98.5%</div>
                            <p className="text-xs text-muted-foreground">last 30 days</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Failed Jobs</CardTitle>
                            <AlertCircle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2</div>
                            <p className="text-xs text-muted-foreground">need attention</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Active Schedules */}
                <Card>
                    <CardHeader>
                        <CardTitle>Active Schedules</CardTitle>
                        <CardDescription>
                            Daftar schedule yang sedang aktif untuk automated tasks
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <div>
                                        <p className="font-medium">BOH Data Import</p>
                                        <p className="text-sm text-muted-foreground">Daily at 23:00 WIB • Import sales & inventory from BOH system</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="default">Running</Badge>
                                    <span className="text-sm text-muted-foreground">Next: 23:00</span>
                                    <Button size="sm" variant="outline">
                                        <Pause className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <div>
                                        <p className="font-medium">Accurate Export</p>
                                        <p className="text-sm text-muted-foreground">Daily at 01:00 WIB • Export processed data to Accurate Online</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="default">Running</Badge>
                                    <span className="text-sm text-muted-foreground">Next: 01:00</span>
                                    <Button size="sm" variant="outline">
                                        <Pause className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                    <div>
                                        <p className="font-medium">BI Sales Sync</p>
                                        <p className="text-sm text-muted-foreground">Every 30 minutes • Sync real-time sales data from BI dashboards</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="default">Running</Badge>
                                    <span className="text-sm text-muted-foreground">Next: 15:30</span>
                                    <Button size="sm" variant="outline">
                                        <Pause className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <div>
                                        <p className="font-medium">Bank Statement Fetch</p>
                                        <p className="text-sm text-muted-foreground">Every 2 hours • Auto-fetch bank statements via API</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="default">Running</Badge>
                                    <span className="text-sm text-muted-foreground">Next: 16:00</span>
                                    <Button size="sm" variant="outline">
                                        <Pause className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                                    <div>
                                        <p className="font-medium">Data Validation Check</p>
                                        <p className="text-sm text-muted-foreground">Every 6 hours • Validate data integrity and flag anomalies</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="secondary">Warning</Badge>
                                    <span className="text-sm text-muted-foreground">Next: 18:00</span>
                                    <Button size="sm" variant="outline">
                                        <Play className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Job History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Job History</CardTitle>
                        <CardDescription>Status dan hasil execution job yang terbaru</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">BI Sales Sync - 15:00</p>
                                        <p className="text-sm text-green-600">Successfully synced 1,245 records in 2.3s</p>
                                    </div>
                                </div>
                                <Badge variant="default">Success</Badge>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">Bank Statement Fetch - 14:00</p>
                                        <p className="text-sm text-green-600">Retrieved 89 new transactions from BCA API</p>
                                    </div>
                                </div>
                                <Badge variant="default">Success</Badge>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">Data Validation Check - 12:00</p>
                                        <p className="text-sm text-green-600">All validation rules passed, no anomalies detected</p>
                                    </div>
                                </div>
                                <Badge variant="default">Success</Badge>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                                    <div>
                                        <p className="font-medium">BI Sales Sync - 14:30</p>
                                        <p className="text-sm text-yellow-600">Partial sync: 3 records failed validation, 1,242 processed</p>
                                    </div>
                                </div>
                                <Badge variant="secondary">Warning</Badge>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">Accurate Export - 01:00</p>
                                        <p className="text-sm text-green-600">Exported 4,582 journal entries successfully</p>
                                    </div>
                                </div>
                                <Badge variant="default">Success</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule Configuration */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Schedule Configuration</CardTitle>
                            <CardDescription>Timing dan frequency untuk automated jobs</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Timezone</label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded border">
                                        <code className="text-sm">Asia/Jakarta (WIB)</code>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Business Hours</label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded border">
                                        <code className="text-sm">08:00 - 22:00 (Operations)</code>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Maintenance Window</label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded border">
                                        <code className="text-sm">02:00 - 04:00 (System Updates)</code>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Error Handling</CardTitle>
                            <CardDescription>Retry policies dan notification settings</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium">Retry Policy</label>
                                    <div className="mt-1 p-3 bg-gray-50 rounded border">
                                        <code className="text-sm">3 attempts with exponential backoff</code>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Notifications</label>
                                    <div className="mt-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">Email alerts on failure</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">Slack notifications enabled</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">SMS for critical failures</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Manual controls untuk scheduler management</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Play className="h-4 w-4" />
                                Run All Jobs Now
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Pause className="h-4 w-4" />
                                Pause All Schedules
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Settings className="h-4 w-4" />
                                Edit Schedules
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                View Error Logs
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}