import { MappingTable } from '@/components/mapping-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Building2, Plus, DollarSign, Settings, Clock } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Master & Mapping', href: '/master' },
    { title: 'Bank Mapping', href: '/master/banks' },
];

// Sample bank mapping data
const bankMappingData = [
    { id: '1', source: 'BCA_SAVING_001', target: 'BCA - Rekening Operasional Utama', status: 'active' as const, confidence: 100, lastUpdated: '2024-01-15', updatedBy: 'Admin' },
    { id: '2', source: 'MANDIRI_CURRENT_001', target: 'Mandiri - Rekening Giro Bisnis', status: 'active' as const, confidence: 100, lastUpdated: '2024-01-15', updatedBy: 'Admin' },
    { id: '3', source: 'BNI_SAVING_002', target: 'BNI - Rekening Tabungan Cadangan', status: 'active' as const, confidence: 98, lastUpdated: '2024-01-14', updatedBy: 'System' },
    { id: '4', source: 'GOPAY_WALLET', target: 'GoPay - E-Wallet Operasional', status: 'active' as const, confidence: 95, lastUpdated: '2024-01-14', updatedBy: 'System' },
    { id: '5', source: 'OVO_MERCHANT', target: 'OVO - Merchant Account', status: 'pending' as const, confidence: 85, lastUpdated: '2024-01-13', updatedBy: 'AI Suggestion' },
    { id: '6', source: 'DANA_BUSINESS', target: 'DANA - Business Account', status: 'inactive' as const, confidence: 90, lastUpdated: '2024-01-12', updatedBy: 'Admin' },
];

const bankAccountTypes = [
    { value: 'savings', label: 'Savings Account - Tabungan' },
    { value: 'current', label: 'Current Account - Giro' },
    { value: 'deposit', label: 'Time Deposit - Deposito' },
    { value: 'credit', label: 'Credit Account - Kredit' },
    { value: 'ewallet', label: 'E-Wallet - Dompet Digital' },
    { value: 'merchant', label: 'Merchant Account - Akun Merchant' },
    { value: 'escrow', label: 'Escrow Account - Rekening Penampungan' },
];

export default function MasterBanks() {
    const handleAdd = (item: any) => {
        console.log('Adding bank mapping:', item);
    };

    const handleEdit = (id: string, item: any) => {
        console.log('Editing bank mapping:', id, item);
    };

    const handleDelete = (id: string) => {
        console.log('Deleting bank mapping:', id);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bank Mapping - Master Data" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Building2 className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Bank Account Mapping</h1>
                            <p className="text-muted-foreground">Konfigurasi rekening bank dan e-wallet untuk reconciliation</p>
                        </div>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Bank Account
                    </Button>
                </div>

                {/* Bank Account Statistics */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                            <Building2 className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4</div>
                            <p className="text-xs text-muted-foreground">connected accounts</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">E-Wallets</CardTitle>
                            <DollarSign className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">digital wallets</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Auto Sync</CardTitle>
                            <Clock className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2</div>
                            <p className="text-xs text-muted-foreground">automated feeds</p>
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

                {/* Bank Mapping Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Bank Account Configuration</CardTitle>
                        <CardDescription>
                            Mapping bank statements ke chart of accounts internal
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MappingTable
                            title="Bank Account Mapping"
                            data={bankMappingData}
                            sourceLabel="Bank Statement Source"
                            targetLabel="Internal Account Name"
                            targetOptions={bankAccountTypes}
                            onAdd={handleAdd}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </CardContent>
                </Card>

                {/* Bank Integration Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Integration Status</CardTitle>
                        <CardDescription>Status koneksi API dan auto-sync untuk setiap bank</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <div>
                                        <p className="font-medium">BCA - Rekening Operasional</p>
                                        <p className="text-sm text-muted-foreground">Auto-sync enabled • Last sync: 2 min ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="default">Connected</Badge>
                                    <button className="w-10 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                                        <div className="w-4 h-4 bg-white rounded-full"></div>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <div>
                                        <p className="font-medium">Mandiri - Giro Bisnis</p>
                                        <p className="text-sm text-muted-foreground">Auto-sync enabled • Last sync: 5 min ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="default">Connected</Badge>
                                    <button className="w-10 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                                        <div className="w-4 h-4 bg-white rounded-full"></div>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                                    <div>
                                        <p className="font-medium">BNI - Tabungan Cadangan</p>
                                        <p className="text-sm text-muted-foreground">Manual upload • Last update: 1 day ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="secondary">Manual</Badge>
                                    <button className="w-10 h-6 bg-gray-300 rounded-full flex items-center justify-start px-1">
                                        <div className="w-4 h-4 bg-white rounded-full"></div>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                    <div>
                                        <p className="font-medium">GoPay - E-Wallet</p>
                                        <p className="text-sm text-muted-foreground">API integration • Real-time sync</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="default">Real-time</Badge>
                                    <button className="w-10 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                                        <div className="w-4 h-4 bg-white rounded-full"></div>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                                    <div>
                                        <p className="font-medium">OVO - Merchant Account</p>
                                        <p className="text-sm text-muted-foreground">Setup pending • API credentials needed</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="outline">Pending</Badge>
                                    <button className="w-10 h-6 bg-gray-300 rounded-full flex items-center justify-start px-1">
                                        <div className="w-4 h-4 bg-white rounded-full"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Transaction Volume */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Transaction Volume</CardTitle>
                            <CardDescription>Volume transaksi per account (current month)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">BCA Operasional</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                                            <div className="w-16 h-2 bg-green-600 rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-medium">2,456 txn</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">GoPay E-Wallet</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                                            <div className="w-12 h-2 bg-blue-600 rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-medium">1,834 txn</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Mandiri Giro</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                                            <div className="w-8 h-2 bg-purple-600 rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-medium">892 txn</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">BNI Tabungan</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                                            <div className="w-3 h-2 bg-orange-600 rounded-full"></div>
                                        </div>
                                        <span className="text-sm font-medium">245 txn</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Balance Summary</CardTitle>
                            <CardDescription>Current balance overview</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">BCA Operasional</span>
                                    <span className="font-semibold text-green-600">Rp 485,234,000</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Mandiri Giro</span>
                                    <span className="font-semibold text-blue-600">Rp 156,890,000</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">BNI Tabungan</span>
                                    <span className="font-semibold text-purple-600">Rp 75,432,000</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">GoPay E-Wallet</span>
                                    <span className="font-semibold text-orange-600">Rp 12,567,000</span>
                                </div>
                                <hr />
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Total Balance</span>
                                    <span className="text-lg font-bold">Rp 730,123,000</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bank Configuration Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Configuration Settings</CardTitle>
                        <CardDescription>Bank-specific settings dan business rules</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Settlement Rules</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>GoPay:</span>
                                        <span className="font-medium">T+1</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>OVO:</span>
                                        <span className="font-medium">T+1</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>DANA:</span>
                                        <span className="font-medium">T+2</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Bank Transfer:</span>
                                        <span className="font-medium">T+0</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Transaction Fees</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>GoPay:</span>
                                        <span className="font-medium">0.7% + Rp 1,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>OVO:</span>
                                        <span className="font-medium">0.8% + Rp 1,500</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Bank Transfer:</span>
                                        <span className="font-medium">Rp 2,500</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Admin Fee:</span>
                                        <span className="font-medium">Rp 5,000/month</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Sync Schedule</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>BCA API:</span>
                                        <span className="font-medium">Every 5 min</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Mandiri API:</span>
                                        <span className="font-medium">Every 10 min</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>E-Wallet APIs:</span>
                                        <span className="font-medium">Real-time</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Manual Upload:</span>
                                        <span className="font-medium">On demand</span>
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