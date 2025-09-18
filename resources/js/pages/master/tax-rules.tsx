import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Shield, Settings, Plus, AlertTriangle, CheckCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Master & Mapping', href: '/master' },
    { title: 'Tax Rules', href: '/master/tax-rules' },
];

export default function MasterTaxRules() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tax Rules - Master Data" />
            
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Shield className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Tax Rules Configuration</h1>
                            <p className="text-muted-foreground">Konfigurasi aturan pajak untuk berbagai jenis transaksi</p>
                        </div>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Tax Rule
                    </Button>
                </div>

                {/* Tax Rules Overview */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">tax configurations</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">PPN Rate</CardTitle>
                            <Shield className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">11%</div>
                            <p className="text-xs text-muted-foreground">current VAT rate</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tax Categories</CardTitle>
                            <Settings className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-muted-foreground">different categories</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Compliance</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">100%</div>
                            <p className="text-xs text-muted-foreground">regulation compliance</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Current Tax Configuration */}
                <Card>
                    <CardHeader>
                        <CardTitle>Current Tax Configuration</CardTitle>
                        <CardDescription>
                            Aturan pajak yang sedang berlaku untuk berbagai jenis transaksi
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded">
                                <div>
                                    <p className="font-medium">PPN - Pajak Pertambahan Nilai</p>
                                    <p className="text-sm text-muted-foreground">Berlaku untuk semua penjualan makanan dan minuman</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-semibold">11%</div>
                                    <Badge variant="default">Active</Badge>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div>
                                    <p className="font-medium">Service Charge</p>
                                    <p className="text-sm text-muted-foreground">Biaya layanan untuk dine-in dan delivery</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-semibold">10%</div>
                                    <Badge variant="secondary">Optional</Badge>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div>
                                    <p className="font-medium">Delivery Fee Tax</p>
                                    <p className="text-sm text-muted-foreground">Pajak untuk biaya pengiriman online delivery</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-semibold">11%</div>
                                    <Badge variant="default">Active</Badge>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded">
                                <div>
                                    <p className="font-medium">Platform Fee Tax</p>
                                    <p className="text-sm text-muted-foreground">Pajak yang dikenakan platform untuk komisi</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-semibold">11%</div>
                                    <Badge variant="default">Active</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tax by Channel */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tax Rules by Sales Channel</CardTitle>
                        <CardDescription>Konfigurasi pajak spesifik untuk setiap channel penjualan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Online Delivery Platforms</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">GoFood</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">PPN 11%</span>
                                            <Badge variant="outline" className="text-xs">Auto</Badge>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">GrabFood</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">PPN 11%</span>
                                            <Badge variant="outline" className="text-xs">Auto</Badge>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">ShopeeFood</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">PPN 11%</span>
                                            <Badge variant="outline" className="text-xs">Auto</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Physical Store</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Dine-in</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">PPN 11% + Service 10%</span>
                                            <Badge variant="outline" className="text-xs">Manual</Badge>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Takeaway</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">PPN 11%</span>
                                            <Badge variant="outline" className="text-xs">Manual</Badge>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">Pickup Orders</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">PPN 11%</span>
                                            <Badge variant="outline" className="text-xs">Manual</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                {/* Tax Calculation Examples */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tax Calculation Examples</CardTitle>
                        <CardDescription>Contoh perhitungan pajak untuk berbagai skenario</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded border">
                                <h4 className="font-medium mb-3">Example 1: GoFood Order</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Food Subtotal:</span>
                                        <span>Rp 50,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>PPN (11%):</span>
                                        <span>Rp 5,500</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Delivery Fee:</span>
                                        <span>Rp 5,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Delivery Fee Tax (11%):</span>
                                        <span>Rp 550</span>
                                    </div>
                                    <hr />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span>Rp 61,050</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded border">
                                <h4 className="font-medium mb-3">Example 2: Dine-in Order</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Food Subtotal:</span>
                                        <span>Rp 75,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Service Charge (10%):</span>
                                        <span>Rp 7,500</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Subtotal + Service:</span>
                                        <span>Rp 82,500</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>PPN (11%):</span>
                                        <span>Rp 9,075</span>
                                    </div>
                                    <hr />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span>Rp 91,575</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Compliance Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tax Compliance Status</CardTitle>
                        <CardDescription>Status kepatuhan terhadap regulasi pajak terkini</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="font-medium text-green-800">PPN Rate Updated</p>
                                    <p className="text-sm text-green-600">Tax rate updated to 11% per latest regulation (UU HPP 2021)</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="font-medium text-green-800">e-Faktur Compliant</p>
                                    <p className="text-sm text-green-600">All tax calculations are ready for e-Faktur generation</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="font-medium text-green-800">Platform Tax Handling</p>
                                    <p className="text-sm text-green-600">Automatic tax calculation for online delivery platforms</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}