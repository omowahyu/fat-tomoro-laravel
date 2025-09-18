import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TrendingUp, Settings, Zap, CheckCircle, AlertTriangle, Calculator } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Penjualan & Rekonsiliasi', href: '/sales' },
    { title: 'Auto Generate Diskon', href: '/sales/auto-discount' },
];

const channelRules = [
    {
        channel: 'GoFood',
        commissionRate: 20,
        adsRate: 5,
        enabled: true,
        lastProcessed: '2024-03-15 08:30:00',
        status: 'active'
    },
    {
        channel: 'GrabFood',
        commissionRate: 18,
        adsRate: 4,
        enabled: true,
        lastProcessed: '2024-03-15 08:30:00',
        status: 'active'
    },
    {
        channel: 'ShopeeFood',
        commissionRate: 15,
        adsRate: 3,
        enabled: true,
        lastProcessed: '2024-03-15 08:30:00',
        status: 'active'
    },
    {
        channel: 'Offline',
        commissionRate: 0,
        adsRate: 0,
        enabled: false,
        lastProcessed: 'Never',
        status: 'disabled'
    }
];

export default function SalesAutoDiscount() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Auto Generate Diskon - Penjualan" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Auto Generate Diskon</h1>
                            <p className="text-muted-foreground">Otomatis hitung diskon dari gross ke nett sales per channel</p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        Step 3 of 6
                    </Badge>
                </div>

                {/* Processing Summary */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Gross</CardTitle>
                            <Calculator className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Rp 65.8M</div>
                            <p className="text-xs text-muted-foreground">from BI data</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Commission</CardTitle>
                            <TrendingUp className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">Rp 12.1M</div>
                            <p className="text-xs text-muted-foreground">18.4% average</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Ads Fee</CardTitle>
                            <TrendingUp className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">Rp 2.9M</div>
                            <p className="text-xs text-muted-foreground">4.4% average</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Net Sales</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">Rp 50.8M</div>
                            <p className="text-xs text-muted-foreground">77.2% of gross</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Channel Rules */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Settings className="h-5 w-5" />
                            Channel Discount Rules
                        </CardTitle>
                        <CardDescription>Aturan perhitungan diskon per channel delivery</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {channelRules.map((rule) => (
                                <div key={rule.channel} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <Switch checked={rule.enabled} />
                                            <Label>{rule.channel}</Label>
                                        </div>
                                        <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                                            {rule.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <div className="text-center">
                                            <p className="text-sm font-medium">{rule.commissionRate}%</p>
                                            <p className="text-xs text-muted-foreground">Commission</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium">{rule.adsRate}%</p>
                                            <p className="text-xs text-muted-foreground">Ads</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium">{100 - rule.commissionRate - rule.adsRate}%</p>
                                            <p className="text-xs text-muted-foreground">Net</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-muted-foreground">Last: {rule.lastProcessed}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Processing Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle>Processing Progress</CardTitle>
                        <CardDescription>Status pemrosesan discount calculation</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Overall Progress</span>
                                <span className="text-sm text-muted-foreground">3/4 channels processed</span>
                            </div>
                            <Progress value={75} className="h-2" />
                            
                            <div className="grid gap-3 md:grid-cols-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <span>Processed: 3 channels</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                    <span>Disabled: 1 channel</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                    <span>Ready for matching</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <Button variant="outline">
                                Back to Upload
                            </Button>
                            <div className="flex gap-3">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Settings className="h-4 w-4" />
                                    Configure Rules
                                </Button>
                                <Button className="flex items-center gap-2">
                                    <Zap className="h-4 w-4" />
                                    Start Auto Processing
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
