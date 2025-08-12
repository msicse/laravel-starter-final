import { PageHeader } from '@/base-components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem, Vehicle } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

interface ShowVehicleProps {
    vehicle: Vehicle;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Vehicles', href: '/vehicles' },
    { title: 'Vehicle Details', href: '#' },
];

export default function ShowVehicle({ vehicle }: ShowVehicleProps) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${vehicle.brand} ${vehicle.model}?`)) {
            router.delete(route('vehicles.destroy', vehicle.id));
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`${vehicle.brand} ${vehicle.model} - Vehicle Details`} />

            <div className="space-y-6">
                <PageHeader
                    title={`${vehicle.brand} ${vehicle.model}`}
                    description="Vehicle details and information."
                    actions={[
                        {
                            label: 'Back to Vehicles',
                            icon: <ArrowLeft className="mr-2 h-4 w-4" />,
                            href: route('vehicles.index'),
                            variant: 'outline',
                        },
                        {
                            label: 'Edit Vehicle',
                            icon: <Edit className="mr-2 h-4 w-4" />,
                            href: route('vehicles.edit', vehicle.id),
                        },
                    ]}
                />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Vehicle Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Vehicle Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Brand</label>
                                    <p className="text-sm font-medium">{vehicle.brand}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Model</label>
                                    <p className="text-sm">{vehicle.model}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Color</label>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="outline" className="capitalize">
                                            {vehicle.color}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Registration Number</label>
                                    <p className="font-mono text-sm">{vehicle.registration_number}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Vendor</label>
                                    <p className="text-sm">{vehicle.vendor || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                                    <div>
                                        <Badge variant={vehicle.is_active ? 'default' : 'secondary'}>
                                            {vehicle.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* System Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>System Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Vehicle ID</label>
                                    <p className="font-mono text-sm">{vehicle.id}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Created At</label>
                                    <p className="text-sm">
                                        {new Date(vehicle.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                                    <p className="text-sm">
                                        {new Date(vehicle.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex space-x-4">
                            <Button
                                onClick={() => router.visit(route('vehicles.edit', vehicle.id))}
                                className="flex items-center"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Vehicle
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                className="flex items-center"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Vehicle
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}
