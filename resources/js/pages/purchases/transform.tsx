import { FatFileUpload } from '@/components/fat-file-upload';
import { FilePreview } from '@/components/file-preview';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ShoppingCart, Eye, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Pembelian', href: '/purchases' },
    { title: 'Transform & Preview', href: '/purchases/transform' },
];

export default function PurchaseTransform() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transform & Preview - Pembelian" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShoppingCart className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Transform & Preview</h1>
                            <p className="text-muted-foreground">Preview dan transformasi data BOH sebelum posting</p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                        Step 2 of 5
                    </Badge>
                </div>

                {/* File Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Eye className="h-5 w-5" />
                            File Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline">Filename</Badge>
                                <span className="font-medium">BOH_2024-01-15.xlsx</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="outline">Rows</Badge>
                                <span className="font-medium">127 items</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="outline">Status</Badge>
                                <Badge variant="default">Parsing Complete</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Preview Data */}
                <Card>
                    <CardHeader>
                        <CardTitle>Data Preview</CardTitle>
                        <CardDescription>Preview 10 baris pertama hasil parsing</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FilePreview fileId="sample-file-id" />
                    </CardContent>
                </Card>

                {/* Transformation Summary */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                Valid Records
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-600">124</div>
                            <p className="text-sm text-muted-foreground">records passed validation</p>
                            <Progress value={97.6} className="mt-2 h-2" />
                            <p className="text-xs text-muted-foreground mt-1">97.6% success rate</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-orange-600" />
                                Issues Found
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-orange-600">3</div>
                            <p className="text-sm text-muted-foreground">records need attention</p>
                            <div className="mt-3 space-y-1">
                                <div className="text-xs">• 2 missing supplier codes</div>
                                <div className="text-xs">• 1 invalid price format</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <Button variant="outline">
                                Back to Import
                            </Button>
                            <div className="flex gap-3">
                                <Button variant="outline">
                                    Fix Issues
                                </Button>
                                <Button className="flex items-center gap-2">
                                    Continue to Mapping
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