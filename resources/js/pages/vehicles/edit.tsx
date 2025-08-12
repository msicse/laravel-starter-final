import { BaseForm, FormField, FormSelect } from '@/base-components/base-form';
import { PageHeader } from '@/base-components/page-header';
import { Button } from '@/components/ui/button';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem, Vehicle } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface EditVehicleProps {
    vehicle: Vehicle;
}

type VehicleForm = {
    brand: string;
    model: string;
    color: string;
    registration_number: string;
    vendor: string;
    is_active: boolean;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Vehicles', href: '/vehicles' },
    { title: 'Edit Vehicle', href: '#' },
];

export default function EditVehicle({ vehicle }: EditVehicleProps) {
    const { data, setData, put, processing, errors } = useForm<VehicleForm>({
        brand: vehicle.brand,
        model: vehicle.model,
        color: vehicle.color,
        registration_number: vehicle.registration_number,
        vendor: vehicle.vendor || '',
        is_active: vehicle.is_active,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('vehicles.update', vehicle.id));
    };

    const statusOptions = [
        { label: 'Active', value: true },
        { label: 'Inactive', value: false },
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Vehicle - ${vehicle.brand} ${vehicle.model}`} />

            <div className="space-y-6">
                <PageHeader
                    title={`Edit Vehicle - ${vehicle.brand} ${vehicle.model}`}
                    description="Update vehicle information and settings."
                    actions={[
                        {
                            label: 'Back to Vehicles',
                            icon: <ArrowLeft className="mr-2 h-4 w-4" />,
                            href: route('vehicles.index'),
                            variant: 'outline',
                        },
                    ]}
                />

                <div className="max-w-2xl">
                    <BaseForm onSubmit={submit}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <FormField
                                label="Brand"
                                name="brand"
                                value={data.brand}
                                onChange={(value) => setData('brand', value)}
                                error={errors.brand}
                                required
                                placeholder="e.g., Toyota, Honda, Ford"
                            />

                            <FormField
                                label="Model"
                                name="model"
                                value={data.model}
                                onChange={(value) => setData('model', value)}
                                error={errors.model}
                                required
                                placeholder="e.g., Camry, Civic, F-150"
                            />

                            <FormField
                                label="Color"
                                name="color"
                                value={data.color}
                                onChange={(value) => setData('color', value)}
                                error={errors.color}
                                required
                                placeholder="e.g., Red, Blue, White"
                            />

                            <FormField
                                label="Registration Number"
                                name="registration_number"
                                value={data.registration_number}
                                onChange={(value) => setData('registration_number', value)}
                                error={errors.registration_number}
                                required
                                placeholder="e.g., ABC-123"
                            />

                            <FormField
                                label="Vendor"
                                name="vendor"
                                value={data.vendor}
                                onChange={(value) => setData('vendor', value)}
                                error={errors.vendor}
                                placeholder="Optional vendor name"
                            />

                            <FormSelect
                                label="Status"
                                name="is_active"
                                value={data.is_active}
                                onChange={(value) => setData('is_active', value === 'true')}
                                options={statusOptions.map(option => ({
                                    label: option.label,
                                    value: option.value.toString()
                                }))}
                                error={errors.is_active}
                                required
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                                disabled={processing}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                <Save className="h-4 w-4" />
                                Update Vehicle
                            </Button>
                        </div>
                    </BaseForm>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
