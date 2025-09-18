import { MappingTable } from '@/components/mapping-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Package, Plus, BarChart, TrendingUp, Settings } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Master & Mapping', href: '/master' },
    { title: 'Item Mapping', href: '/master/items' },
];

// Sample item mapping data
const itemMappingData = [
    { id: '1', source: 'AYAM GEPREK ORIGINAL', target: 'Ayam Geprek Original - Pedas Level 1', status: 'active' as const, confidence: 98, lastUpdated: '2024-01-15', updatedBy: 'AI' },
    { id: '2', source: 'AYAM GEPREK KEJU', target: 'Ayam Geprek Keju - Pedas Level 1', status: 'active' as const, confidence: 95, lastUpdated: '2024-01-15', updatedBy: 'AI' },
    { id: '3', source: 'NASI PUTIH', target: 'Nasi Putih - Porsi Sedang', status: 'active' as const, confidence: 100, lastUpdated: '2024-01-14', updatedBy: 'System' },
    { id: '4', source: 'ES TEH MANIS', target: 'Es Teh Manis - 500ml', status: 'active' as const, confidence: 90, lastUpdated: '2024-01-14', updatedBy: 'AI' },
    { id: '5', source: 'AYAM BAKAR MADU', target: 'Ayam Bakar Madu - Half Chicken', status: 'pending' as const, confidence: 85, lastUpdated: '2024-01-13', updatedBy: 'AI Suggestion' },
    { id: '6', source: 'PAKET HEMAT A', target: 'Paket Hemat A - Ayam + Nasi + Minum', status: 'pending' as const, confidence: 75, lastUpdated: '2024-01-13', updatedBy: 'AI Suggestion' },
];

const menuCategories = [
    { value: 'main-dish', label: 'Main Dish - Hidangan Utama' },
    { value: 'appetizer', label: 'Appetizer - Pembuka' },
    { value: 'beverages', label: 'Beverages - Minuman' },
    { value: 'dessert', label: 'Dessert - Penutup' },
    { value: 'side-dish', label: 'Side Dish - Lauk Tambahan' },
    { value: 'combo-package', label: 'Combo Package - Paket Hemat' },
    { value: 'rice-noodles', label: 'Rice & Noodles - Nasi & Mie' },
    { value: 'snacks', label: 'Snacks - Cemilan' },
];

export default function MasterItems() {
    const handleAdd = (item: any) => {
        console.log('Adding item mapping:', item);
    };

    const handleEdit = (id: string, item: any) => {
        console.log('Editing item mapping:', id, item);
    };

    const handleDelete = (id: string) => {
        console.log('Deleting item mapping:', id);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Item Mapping - Master Data" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Package className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Item Mapping</h1>
                            <p className="text-muted-foreground">Mapping menu items dari BI ke database produk internal</p>
                        </div>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Item
                    </Button>
                </div>

                {/* Item Statistics */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                            <Package className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">186</div>
                            <p className="text-xs text-muted-foreground">menu items mapped</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Items</CardTitle>
                            <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">142</div>
                            <p className="text-xs text-muted-foreground">currently selling</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Best Sellers</CardTitle>
                            <BarChart className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">28</div>
                            <p className="text-xs text-muted-foreground">top performers</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Need Review</CardTitle>
                            <Settings className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">require attention</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Item Mapping Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Item Mapping Configuration</CardTitle>
                        <CardDescription>
                            Mapping menu items dari BI sales ke database produk internal
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MappingTable
                            title="Menu Item Mapping"
                            data={itemMappingData}
                            sourceLabel="BI Item Name"
                            targetLabel="Internal Product Name"
                            targetOptions={menuCategories}
                            onAdd={handleAdd}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </CardContent>
                </Card>

                {/* Top Performing Items */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Performing Items</CardTitle>
                        <CardDescription>Best selling items (last 30 days)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <div>
                                        <p className="font-medium">Ayam Geprek Original</p>
                                        <p className="text-sm text-muted-foreground">Main Dish</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">2,458 sold</p>
                                    <p className="text-sm text-muted-foreground">Rp 185M revenue</p>
                                </div>
                                <Badge variant="default">Best Seller</Badge>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                    <div>
                                        <p className="font-medium">Ayam Geprek Keju</p>
                                        <p className="text-sm text-muted-foreground">Main Dish</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">1,985 sold</p>
                                    <p className="text-sm text-muted-foreground">Rp 158M revenue</p>
                                </div>
                                <Badge variant="default">Best Seller</Badge>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                                    <div>
                                        <p className="font-medium">Es Teh Manis</p>
                                        <p className="text-sm text-muted-foreground">Beverages</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">3,242 sold</p>
                                    <p className="text-sm text-muted-foreground">Rp 32M revenue</p>
                                </div>
                                <Badge variant="secondary">Popular</Badge>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                                    <div>
                                        <p className="font-medium">Paket Hemat A</p>
                                        <p className="text-sm text-muted-foreground">Combo Package</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">1,156 sold</p>
                                    <p className="text-sm text-muted-foreground">Rp 92M revenue</p>
                                </div>
                                <Badge variant="outline">Growing</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Category Analysis */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Category Performance</CardTitle>
                            <CardDescription>Revenue by category</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Main Dish</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                                            <div className="w-16 h-2 bg-green-600 rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-medium">65%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Beverages</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                                            <div className="w-6 h-2 bg-blue-600 rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-medium">18%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Combo Package</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                                            <div className="w-4 h-2 bg-purple-600 rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-medium">12%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Side Dish</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                                            <div className="w-1 h-2 bg-orange-600 rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-medium">5%</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>AI Mapping Quality</CardTitle>
                            <CardDescription>Confidence levels for AI suggestions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">High Confidence (95-100%)</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                                            <div className="w-14 h-2 bg-green-600 rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-medium">72%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Medium Confidence (85-94%)</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                                            <div className="w-5 h-2 bg-yellow-600 rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-medium">21%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Low Confidence (&lt;85%)</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                                            <div className="w-1 h-2 bg-red-600 rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-medium">7%</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}