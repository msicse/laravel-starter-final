import { BaseForm, FormField, FormSelect } from '@/base-components/base-form';
import { PageHeader } from '@/base-components/page-header';
import { Button } from '@/components/ui/button';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus } from 'lucide-react';

interface CreateUserProps {
    userTypes: string[];
    bloodGroups: string[];
    statuses: Array<{ label: string; value: string }>;
}

type UserForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    user_type: string;
    blood_group: string;
    image: string;
    status: string;
    address: string;
    whatsapp_id: string;
    department_id: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/users' },
    { title: 'Create User', href: '#' },
];

export default function CreateUser({ userTypes, bloodGroups, statuses }: CreateUserProps) {
    const { data, setData, post, processing, errors } = useForm<UserForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        user_type: '',
        blood_group: '',
        image: '',
        status: 'active',
        address: '',
        whatsapp_id: '',
        department_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('users.store'));
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />

            <div className="space-y-6">
                <PageHeader
                    title="Create User"
                    description="Add a new user to the system."
                    actions={[
                        {
                            label: 'Back to Users',
                            icon: <ArrowLeft className="mr-2 h-4 w-4" />,
                            href: route('users.index'),
                            variant: 'outline',
                        },
                    ]}
                />

                <div className="max-w-4xl">
                    <BaseForm onSubmit={submit}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <FormField
                                label="Full Name"
                                name="name"
                                value={data.name}
                                onChange={(value) => setData('name', value)}
                                error={errors.name}
                                required
                                placeholder="e.g., John Doe"
                            />

                            <FormField
                                label="Email Address"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={(value) => setData('email', value)}
                                error={errors.email}
                                required
                                placeholder="e.g., john@example.com"
                            />

                            <FormField
                                label="Password"
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={(value) => setData('password', value)}
                                error={errors.password}
                                required
                                placeholder="Minimum 8 characters"
                            />

                            <FormField
                                label="Confirm Password"
                                name="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(value) => setData('password_confirmation', value)}
                                error={errors.password_confirmation}
                                required
                                placeholder="Confirm your password"
                            />

                            <FormField
                                label="Phone Number"
                                name="phone"
                                value={data.phone}
                                onChange={(value) => setData('phone', value)}
                                error={errors.phone}
                                placeholder="e.g., +1234567890"
                            />

                            <FormSelect
                                label="User Type"
                                name="user_type"
                                value={data.user_type}
                                onChange={(value) => setData('user_type', value)}
                                options={userTypes.map(type => ({
                                    label: type.charAt(0).toUpperCase() + type.slice(1),
                                    value: type
                                }))}
                                error={errors.user_type}
                                placeholder="Select user type"
                            />

                            <FormSelect
                                label="Blood Group"
                                name="blood_group"
                                value={data.blood_group}
                                onChange={(value) => setData('blood_group', value)}
                                options={bloodGroups.map(group => ({
                                    label: group,
                                    value: group
                                }))}
                                error={errors.blood_group}
                                placeholder="Select blood group"
                            />

                            <FormSelect
                                label="Status"
                                name="status"
                                value={data.status}
                                onChange={(value) => setData('status', value)}
                                options={statuses}
                                error={errors.status}
                                required
                            />

                            <FormField
                                label="WhatsApp ID"
                                name="whatsapp_id"
                                value={data.whatsapp_id}
                                onChange={(value) => setData('whatsapp_id', value)}
                                error={errors.whatsapp_id}
                                placeholder="e.g., +1234567890"
                            />

                            <FormField
                                label="Profile Image URL"
                                name="image"
                                value={data.image}
                                onChange={(value) => setData('image', value)}
                                error={errors.image}
                                placeholder="https://example.com/image.jpg"
                            />

                            <div className="sm:col-span-2">
                                <FormField
                                    label="Address"
                                    name="address"
                                    value={data.address}
                                    onChange={(value) => setData('address', value)}
                                    error={errors.address}
                                    placeholder="Full address"
                                />
                            </div>
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
                                <Plus className="h-4 w-4" />
                                Create User
                            </Button>
                        </div>
                    </BaseForm>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
