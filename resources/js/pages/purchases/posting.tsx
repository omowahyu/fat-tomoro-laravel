import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ShoppingCart, Send, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pembelian', href: '/purchases' },
    { title: 'Posting ke Accurate', href: '/purchases/posting' },
];

export default function PurchasePosting() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posting ke Accurate - Pembelian" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShoppingCart className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Posting ke Accurate</h1>
                            <p className="text-muted-foreground">Review final dan posting data BOH ke Accurate</p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        Step 4 of 5
                    </Badge>
                </div>

                {/* Posting Summary */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Ready to Post</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">124</div>
                            <p className="text-xs text-muted-foreground">purchase orders</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                            <Clock className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">15</div>
                            <p className="text-xs text-muted-foreground">posting now</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Failed</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">3</div>
                            <p className="text-xs text-muted-foreground">need attention</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                            <Send className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">89%</div>
                            <Progress value={89} className="mt-2 h-2" />
                        </CardContent>
                    </Card>
                </div>

                {/* Final Review */}
                <Card>
                    <CardHeader>
                        <CardTitle>Final Review</CardTitle>
                        <CardDescription>Review data sebelum posting ke Accurate</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h4 className="font-medium mb-2">Data Summary</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Total Purchase Orders:</span>
                                        <span className="font-medium">124</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Total Amount:</span>
                                        <span className="font-medium">Rp 145,670,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Unique Suppliers:</span>
                                        <span className="font-medium">8</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax Amount:</span>
                                        <span className="font-medium">Rp 14,567,000</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Validation Status</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <span className="text-sm">All items mapped to COA</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <span className="text-sm">All suppliers verified</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <span className="text-sm">Tax calculations correct</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                                        <span className="text-sm">3 items need price verification</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Posting Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle>Posting Progress</CardTitle>
                        <CardDescription>Real-time posting status to Accurate</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Overall Progress</span>
                                <span className="text-sm text-muted-foreground">89/124 completed</span>
                            </div>
                            <Progress value={72} className="h-2" />
                            
                            <div className="grid gap-3 md:grid-cols-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-600"></div>
                                    <span>Posted Successfully: 89</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                    <span>In Progress: 15</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-600"></div>
                                    <span>Failed: 3</span>
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
                                Back to Mapping
                            </Button>
                            <div className="flex gap-3">
                                <Button variant="outline">
                                    Download Report
                                </Button>
                                <Button className="flex items-center gap-2">
                                    <Send className="h-4 w-4" />
                                    Start Posting to Accurate
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}