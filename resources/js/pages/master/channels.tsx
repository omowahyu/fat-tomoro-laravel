import { MappingTable } from '@/components/mapping-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Database, TrendingUp, Plus, Settings } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Master & Mapping', href: '/master' },
    { title: 'Channel Mapping', href: '/master/channels' },
];

// Sample channel mapping data
const channelMappingData = [
    { id: '1', source: 'GOFOOD', target: 'GoFood - Online Delivery', status: 'active' as const, confidence: 100, lastUpdated: '2024-01-15', updatedBy: 'System' },
    { id: '2', source: 'GRABFOOD', target: 'GrabFood - Online Delivery', status: 'active' as const, confidence: 100, lastUpdated: '2024-01-15', updatedBy: 'System' },
    { id: '3', source: 'SHOPEEFOOD', target: 'ShopeeFood - Online Delivery', status: 'active' as const, confidence: 98, lastUpdated: '2024-01-14', updatedBy: 'Admin' },
    { id: '4', source: 'OFFLINE', target: 'Store - Offline Sales', status: 'active' as const, confidence: 100, lastUpdated: '2024-01-14', updatedBy: 'System' },
    { id: '5', source: 'PICKUP', target: 'Store - Pickup Orders', status: 'pending' as const, confidence: 85, lastUpdated: '2024-01-13', updatedBy: 'AI Suggestion' },
];

const channelOptions = [
    { value: 'gofood', label: 'GoFood - Online Delivery' },
    { value: 'grabfood', label: 'GrabFood - Online Delivery' },
    { value: 'shopeefood', label: 'ShopeeFood - Online Delivery' },
    { value: 'offline', label: 'Store - Offline Sales' },
    { value: 'pickup', label: 'Store - Pickup Orders' },
    { value: 'delivery', label: 'Store - Direct Delivery' },
    { value: 'catering', label: 'Catering - Bulk Orders' },
];

export default function MasterChannels() {
    const handleAdd = (item: any) => {
        console.log('Adding channel mapping:', item);
    };

    const handleEdit = (id: string, item: any) => {
        console.log('Editing channel mapping:', id, item);
    };

    const handleDelete = (id: string) => {
        console.log('Deleting channel mapping:', id);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Channel Mapping - Master Data" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Channel Mapping</h1>
                            <p className="text-muted-foreground">Mapping channel penjualan dari BI ke kategori internal</p>
                        </div>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Channel
                    </Button>
                </div>

                {/* Channel Statistics */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Channels</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4</div>
                            <p className="text-xs text-muted-foreground">delivery channels</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Online Channels</CardTitle>
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">digital platforms</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Offline Channels</CardTitle>
                            <TrendingUp className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1</div>
                            <p className="text-xs text-muted-foreground">physical store</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Setup</CardTitle>
                            <Settings className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1</div>
                            <p className="text-xs text-muted-foreground">need configuration</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Channel Mapping Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Channel Mapping Configuration</CardTitle>
                        <CardDescription>
                            Mapping channel dari BI sales ke kategori internal untuk rekonsiliasi
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MappingTable
                            title="Sales Channel Mapping"
                            data={channelMappingData}
                            sourceLabel="BI Channel"
                            targetLabel="Internal Channel"
                            targetOptions={channelOptions}
                            onAdd={handleAdd}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </CardContent>
                </Card>

                {/* Channel Performance */}
                <Card>
                    <CardHeader>
                        <CardTitle>Channel Performance Overview</CardTitle>
                        <CardDescription>Revenue contribution per channel (last 30 days)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <div>
                                        <p className="font-medium">GoFood</p>
                                        <p className="text-sm text-muted-foreground">Online Delivery</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">Rp 485M</p>
                                    <p className="text-sm text-muted-foreground">42% share</p>
                                </div>
                                <Badge variant="default">Active</Badge>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                    <div>
                                        <p className="font-medium">GrabFood</p>
                                        <p className="text-sm text-muted-foreground">Online Delivery</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">Rp 365M</p>
                                    <p className="text-sm text-muted-foreground">32% share</p>
                                </div>
                                <Badge variant="default">Active</Badge>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                                    <div>
                                        <p className="font-medium">Store Offline</p>
                                        <p className="text-sm text-muted-foreground">Physical Store</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">Rp 220M</p>
                                    <p className="text-sm text-muted-foreground">19% share</p>
                                </div>
                                <Badge variant="default">Active</Badge>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                                    <div>
                                        <p className="font-medium">ShopeeFood</p>
                                        <p className="text-sm text-muted-foreground">Online Delivery</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">Rp 85M</p>
                                    <p className="text-sm text-muted-foreground">7% share</p>
                                </div>
                                <Badge variant="secondary">Growing</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Channel Rules */}
                <Card>
                    <CardHeader>
                        <CardTitle>Channel Rules & Configuration</CardTitle>
                        <CardDescription>Business rules untuk setiap channel</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Fee Structure</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>GoFood:</span>
                                        <span className="font-medium">20% + Ads</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>GrabFood:</span>
                                        <span className="font-medium">18% + Ads</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>ShopeeFood:</span>
                                        <span className="font-medium">15% + Ads</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Offline:</span>
                                        <span className="font-medium">0%</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Settlement Period</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>GoFood:</span>
                                        <span className="font-medium">T+1</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>GrabFood:</span>
                                        <span className="font-medium">T+1</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>ShopeeFood:</span>
                                        <span className="font-medium">T+2</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Offline:</span>
                                        <span className="font-medium">T+0</span>
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