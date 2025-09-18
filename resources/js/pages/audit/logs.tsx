import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileText, Search, Filter, Download, Clock, User, Database } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Audit & Monitoring', href: '/audit' },
    { title: 'System Logs', href: '/audit/logs' },
];

export default function AuditLogs() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('all');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Logs - Audit" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">System Logs</h1>
                            <p className="text-muted-foreground">Activity logs dan system events untuk monitoring dan debugging</p>
                        </div>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Export Logs
                    </Button>
                </div>

                {/* Log Statistics */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Logs Today</CardTitle>
                            <FileText className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8,547</div>
                            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Info Level</CardTitle>
                            <Clock className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">7,823</div>
                            <p className="text-xs text-muted-foreground">normal operations</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
                            <Badge className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">587</div>
                            <p className="text-xs text-muted-foreground">require attention</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Errors</CardTitle>
                            <Badge className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">137</div>
                            <p className="text-xs text-muted-foreground">need investigation</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Log Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filter & Search</CardTitle>
                        <CardDescription>Filter logs berdasarkan level, waktu, dan keyword</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search logs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <select
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                className="px-3 py-2 border rounded-md"
                            >
                                <option value="all">All Levels</option>
                                <option value="info">Info</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                                <option value="debug">Debug</option>
                            </select>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                More Filters
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Last 24 Hours
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Logs */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Log Entries</CardTitle>
                        <CardDescription>Latest system events dan application logs</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 border rounded">
                                <Badge variant="default" className="mt-1">INFO</Badge>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">BOH Data Import Completed</p>
                                        <span className="text-sm text-muted-foreground">15:23:45</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Successfully imported 4,582 sales records from BOH system. Processing time: 2m 34s
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            System
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Database className="h-3 w-3" />
                                            BOH.ImportService
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 border rounded">
                                <Badge variant="secondary" className="mt-1">WARN</Badge>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">API Rate Limit Approaching</p>
                                        <span className="text-sm text-muted-foreground">15:20:12</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        BCA API rate limit at 85% (85/100 requests). Consider implementing request throttling.
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            System
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Database className="h-3 w-3" />
                                            Bank.APIService
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 border rounded">
                                <Badge variant="default" className="mt-1">INFO</Badge>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">User Login Successful</p>
                                        <span className="text-sm text-muted-foreground">15:18:33</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        User 'admin@tomoro.com' successfully authenticated from IP 192.168.1.100
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            admin@tomoro.com
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Database className="h-3 w-3" />
                                            Auth.LoginController
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 border rounded border-red-200">
                                <Badge variant="destructive" className="mt-1">ERROR</Badge>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">Database Connection Timeout</p>
                                        <span className="text-sm text-muted-foreground">15:15:28</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Connection to database 'tomoro_bridging' timed out after 30 seconds. Retrying connection...
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            System
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Database className="h-3 w-3" />
                                            Database.ConnectionManager
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 border rounded">
                                <Badge variant="default" className="mt-1">INFO</Badge>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">Accurate Export Initiated</p>
                                        <span className="text-sm text-muted-foreground">15:12:45</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Started export of 4,582 journal entries to Accurate Online. Estimated completion: 3-4 minutes
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            System
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Database className="h-3 w-3" />
                                            Accurate.ExportService
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 border rounded">
                                <Badge variant="secondary" className="mt-1">WARN</Badge>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium">Data Validation Warning</p>
                                        <span className="text-sm text-muted-foreground">15:10:17</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        3 records failed validation during BI sales import. Records flagged for manual review.
                                    </p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            System
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Database className="h-3 w-3" />
                                            BI.ValidationService
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <Button variant="outline">Load More Logs</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Log Categories */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">System Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Application Startup</span>
                                    <Badge variant="outline">23</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Scheduled Jobs</span>
                                    <Badge variant="outline">156</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Database Operations</span>
                                    <Badge variant="outline">2,847</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>API Requests</span>
                                    <Badge variant="outline">4,521</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">User Activities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Login Attempts</span>
                                    <Badge variant="outline">45</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>File Uploads</span>
                                    <Badge variant="outline">12</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Data Exports</span>
                                    <Badge variant="outline">8</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Configuration Changes</span>
                                    <Badge variant="outline">3</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Integration Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>BOH Imports</span>
                                    <Badge variant="outline">24</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>BI Syncs</span>
                                    <Badge variant="outline">48</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Accurate Exports</span>
                                    <Badge variant="outline">24</Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span>Bank API Calls</span>
                                    <Badge variant="outline">72</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}