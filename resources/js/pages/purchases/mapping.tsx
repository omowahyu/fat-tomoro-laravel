import { MappingTable } from '@/components/mapping-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ShoppingCart, Settings, ArrowRight, Database } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pembelian', href: '/purchases' },
    { title: 'Mapping & Validasi', href: '/purchases/mapping' },
];

// Sample data untuk mapping tables
const coaMappingData = [
    { id: '1', source: 'Coffee Beans', target: '5001 - Inventory Coffee', status: 'active' as const, confidence: 95, lastUpdated: '2024-01-15', updatedBy: 'System' },
    { id: '2', source: 'Milk', target: '5002 - Inventory Milk', status: 'active' as const, confidence: 90, lastUpdated: '2024-01-15', updatedBy: 'Admin' },
];

const supplierMappingData = [
    { id: '1', source: 'PT Kopi Nusantara', target: 'SUP001 - PT Kopi Nusantara', status: 'active' as const, confidence: 100, lastUpdated: '2024-01-15', updatedBy: 'System' },
    { id: '2', source: 'CV Susu Segar', target: 'SUP002 - CV Susu Segar', status: 'pending' as const, confidence: 85, lastUpdated: '2024-01-15', updatedBy: 'Admin' },
];

const warehouseMappingData = [
    { id: '1', source: 'Gudang Utama', target: 'WH001 - Warehouse Central', status: 'active' as const, confidence: 100, lastUpdated: '2024-01-15', updatedBy: 'System' },
];

export default function PurchaseMapping() {
    const [activeTab, setActiveTab] = useState('coa');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mapping & Validasi - Pembelian" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShoppingCart className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Mapping & Validasi</h1>
                            <p className="text-muted-foreground">Mapping data BOH ke master data Accurate</p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        Step 3 of 5
                    </Badge>
                </div>

                {/* Mapping Summary */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">COA Mapping</CardTitle>
                            <Database className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">95%</div>
                            <p className="text-xs text-muted-foreground">items mapped successfully</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Supplier Mapping</CardTitle>
                            <Database className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">85%</div>
                            <p className="text-xs text-muted-foreground">suppliers identified</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Warehouse Mapping</CardTitle>
                            <Database className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">100%</div>
                            <p className="text-xs text-muted-foreground">all warehouses mapped</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Mapping Tables */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5" />
                            Data Mapping Configuration
                        </CardTitle>
                        <CardDescription>Configure mapping untuk setiap jenis data</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Tab Navigation */}
                        <div className="flex space-x-1 border-b">
                            <button
                                onClick={() => setActiveTab('coa')}
                                className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
                                    activeTab === 'coa' 
                                        ? 'bg-background text-foreground border-b-2 border-primary' 
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                COA Mapping
                            </button>
                            <button
                                onClick={() => setActiveTab('supplier')}
                                className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
                                    activeTab === 'supplier' 
                                        ? 'bg-background text-foreground border-b-2 border-primary' 
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Supplier Mapping
                            </button>
                            <button
                                onClick={() => setActiveTab('warehouse')}
                                className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
                                    activeTab === 'warehouse' 
                                        ? 'bg-background text-foreground border-b-2 border-primary' 
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Warehouse Mapping
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-4">
                            {activeTab === 'coa' && (
                                <MappingTable
                                    title="Chart of Account Mapping"
                                    data={coaMappingData}
                                    sourceLabel="BOH Item"
                                    targetLabel="Accurate COA"
                                    targetOptions={[
                                        { value: '5001', label: '5001 - Inventory Coffee' },
                                        { value: '5002', label: '5002 - Inventory Milk' },
                                        { value: '5003', label: '5003 - Inventory Sugar' },
                                    ]}
                                />
                            )}

                            {activeTab === 'supplier' && (
                                <MappingTable
                                    title="Supplier Mapping"
                                    data={supplierMappingData}
                                    sourceLabel="BOH Supplier"
                                    targetLabel="Accurate Supplier"
                                    targetOptions={[
                                        { value: 'SUP001', label: 'SUP001 - PT Kopi Nusantara' },
                                        { value: 'SUP002', label: 'SUP002 - CV Susu Segar' },
                                        { value: 'SUP003', label: 'SUP003 - PT Gula Manis' },
                                    ]}
                                />
                            )}

                            {activeTab === 'warehouse' && (
                                <MappingTable
                                    title="Warehouse Mapping"
                                    data={warehouseMappingData}
                                    sourceLabel="BOH Warehouse"
                                    targetLabel="Accurate Warehouse"
                                    targetOptions={[
                                        { value: 'WH001', label: 'WH001 - Warehouse Central' },
                                        { value: 'WH002', label: 'WH002 - Warehouse Branch' },
                                    ]}
                                />
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <Button variant="outline">
                                Back to Transform
                            </Button>
                            <div className="flex gap-3">
                                <Button variant="outline">
                                    Auto-Map Suggestions
                                </Button>
                                <Button className="flex items-center gap-2">
                                    Continue to Posting
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}