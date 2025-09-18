import { MappingTable } from '@/components/mapping-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Database, Plus, Download, Upload, Settings } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Master & Mapping', href: '/master' },
    { title: 'COA Mapping', href: '/master/coa' },
];

// Sample COA mapping data
const coaMappingData = [
    { id: '1', source: 'Coffee Beans', target: '5001 - Raw Material Coffee', status: 'active' as const, confidence: 98, lastUpdated: '2024-01-15', updatedBy: 'System AI' },
    { id: '2', source: 'Milk', target: '5002 - Raw Material Milk', status: 'active' as const, confidence: 95, lastUpdated: '2024-01-15', updatedBy: 'Admin' },
    { id: '3', source: 'Sugar', target: '5003 - Raw Material Sugar', status: 'active' as const, confidence: 92, lastUpdated: '2024-01-14', updatedBy: 'System AI' },
    { id: '4', source: 'Cups', target: '5010 - Packaging Materials', status: 'active' as const, confidence: 88, lastUpdated: '2024-01-14', updatedBy: 'Admin' },
    { id: '5', source: 'Coffee Equipment', target: '1300 - Equipment', status: 'pending' as const, confidence: 75, lastUpdated: '2024-01-13', updatedBy: 'AI Suggestion' },
];

const accurateCoaOptions = [
    { value: '5001', label: '5001 - Raw Material Coffee' },
    { value: '5002', label: '5002 - Raw Material Milk' },
    { value: '5003', label: '5003 - Raw Material Sugar' },
    { value: '5004', label: '5004 - Raw Material Syrup' },
    { value: '5010', label: '5010 - Packaging Materials' },
    { value: '5011', label: '5011 - Packaging Cups' },
    { value: '5012', label: '5012 - Packaging Lids' },
    { value: '1300', label: '1300 - Equipment' },
    { value: '1301', label: '1301 - Equipment Coffee Machine' },
    { value: '1302', label: '1302 - Equipment POS System' },
    { value: '6001', label: '6001 - Operating Expenses' },
    { value: '6002', label: '6002 - Marketing Expenses' },
];

export default function MasterCoa() {
    const handleAdd = (item: any) => {
        console.log('Adding COA mapping:', item);
        // API call to add mapping
    };

    const handleEdit = (id: string, item: any) => {
        console.log('Editing COA mapping:', id, item);
        // API call to edit mapping
    };

    const handleDelete = (id: string) => {
        console.log('Deleting COA mapping:', id);
        // API call to delete mapping
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="COA Mapping - Master Data" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Database className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">COA Mapping</h1>
                            <p className="text-muted-foreground">Mapping Chart of Account dari BOH ke Accurate</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Export Template
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Import Mapping
                        </Button>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Mapping
                        </Button>
                    </div>
                </div>

                {/* Mapping Statistics */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Mappings</CardTitle>
                            <Database className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">127</div>
                            <p className="text-xs text-muted-foreground">active mappings</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Auto-Mapped</CardTitle>
                            <Settings className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">96%</div>
                            <p className="text-xs text-muted-foreground">by AI engine</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                            <Settings className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">12</div>
                            <p className="text-xs text-muted-foreground">need validation</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
                            <Settings className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">94.2%</div>
                            <p className="text-xs text-muted-foreground">mapping accuracy</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Instructions */}
                <Alert>
                    <Settings className="h-4 w-4" />
                    <AlertDescription>
                        COA Mapping digunakan untuk mencocokkan item dari BOH dengan Chart of Account di Accurate. 
                        Sistem AI akan memberikan saran mapping berdasarkan nama item dan historical data. 
                        Confidence score menunjukkan tingkat akurasi mapping.
                    </AlertDescription>
                </Alert>

                {/* COA Mapping Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>COA Mapping Configuration</CardTitle>
                        <CardDescription>
                            Konfigurasi mapping item BOH ke Chart of Account Accurate
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MappingTable
                            title="Chart of Account Mapping"
                            data={coaMappingData}
                            sourceLabel="BOH Item"
                            targetLabel="Accurate COA"
                            targetOptions={accurateCoaOptions}
                            onAdd={handleAdd}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Aksi cepat untuk management COA mapping</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-4">
                            <Button variant="outline" className="h-16 flex-col gap-2">
                                <Settings className="h-5 w-5" />
                                <span className="text-sm">Auto-Map All</span>
                            </Button>
                            <Button variant="outline" className="h-16 flex-col gap-2">
                                <Download className="h-5 w-5" />
                                <span className="text-sm">Export Mappings</span>
                            </Button>
                            <Button variant="outline" className="h-16 flex-col gap-2">
                                <Upload className="h-5 w-5" />
                                <span className="text-sm">Bulk Import</span>
                            </Button>
                            <Button variant="outline" className="h-16 flex-col gap-2">
                                <Database className="h-5 w-5" />
                                <span className="text-sm">Sync Accurate</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Aktivitas terbaru COA mapping</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded">
                                <div className="flex items-center gap-3">
                                    <Settings className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">Auto-mapped 'Coffee Equipment'</p>
                                        <p className="text-sm text-muted-foreground">5 minutes ago by AI Engine</p>
                                    </div>
                                </div>
                                <Badge variant="secondary">75% confidence</Badge>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 border rounded">
                                <div className="flex items-center gap-3">
                                    <Plus className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="font-medium">New mapping added: 'Plastic Cups'</p>
                                        <p className="text-sm text-muted-foreground">1 hour ago by Admin</p>
                                    </div>
                                </div>
                                <Badge variant="default">Active</Badge>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 border rounded">
                                <div className="flex items-center gap-3">
                                    <Download className="h-5 w-5 text-purple-600" />
                                    <div>
                                        <p className="font-medium">Bulk import: 25 mappings</p>
                                        <p className="text-sm text-muted-foreground">2 hours ago by Admin</p>
                                    </div>
                                </div>
                                <Badge variant="default">Completed</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}