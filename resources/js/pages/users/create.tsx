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
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    official_phone: string;
    personal_phone: string;
    emergency_phone: string;
    user_type: string;
    blood_group: string;
    image: string;
    status: string;
    address: string;
    whatsapp_id: string;
    department_id: string;
    // Driver-specific fields
    driving_license_no: string;
    nid_number: string;
    present_address: string;
    permanent_address: string;
    emergency_contact_name: string;
    emergency_contact_phone: string;
    emergency_contact_relation: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/users' },
    { title: 'Create User', href: '#' },
];

export default function CreateUser({ userTypes, bloodGroups, statuses }: CreateUserProps) {
    const { data, setData, post, processing, errors } = useForm<UserForm>({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        official_phone: '',
        personal_phone: '',
        emergency_phone: '',
        user_type: 'none',
        blood_group: '',
        image: '',
        status: 'active',
        address: '',
        whatsapp_id: '',
        department_id: '',
        // Driver-specific fields
        driving_license_no: '',
        nid_number: '',
        present_address: '',
        permanent_address: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        emergency_contact_relation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Transform data before submission
        const submitData = {
            ...data,
            user_type: data.user_type === 'none' ? null : data.user_type
        };

        // Client-side validation for driver requirements
        if (data.user_type === 'driver') {
            if (!data.username.trim()) {
                // This will be caught by server validation, but we can provide immediate feedback
                console.warn('Username is required for drivers');
            }
        } else if (data.user_type !== 'none') {
            if (!data.email.trim()) {
                console.warn('Email is required for non-driver users');
            }
        }

        post(route('users.store'), {
            data: submitData
        });
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
                    {/* User Type Requirements Info */}
                    {data.user_type && data.user_type !== 'none' && (
                        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                                Requirements for {data.user_type.charAt(0).toUpperCase() + data.user_type.slice(1)}:
                            </h4>
                            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                                {data.user_type === 'driver' ? (
                                    <>
                                        <li>• Username is <strong>required</strong></li>
                                        <li>• Email is <strong>optional</strong></li>
                                        <li>• Driving license number is <strong>required</strong></li>
                                        <li>• NID number is <strong>required</strong></li>
                                        <li>• Official phone is <strong>required</strong></li>
                                        <li>• Present & permanent addresses are <strong>required</strong></li>
                                        <li>• Emergency contact details are <strong>required</strong></li>
                                    </>
                                ) : (
                                    <>
                                        <li>• Email is <strong>required</strong></li>
                                        <li>• Username is <strong>optional</strong></li>
                                        <li>• Phone numbers are optional</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    )}

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
                                label="Username"
                                name="username"
                                value={data.username}
                                onChange={(value) => setData('username', value)}
                                error={errors.username}
                                required={data.user_type === 'driver'}
                                placeholder="e.g., john.doe"
                                helpText={data.user_type === 'driver' ? 'Required for drivers' : 'Optional for other user types'}
                            />

                            <FormField
                                label="Email Address"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={(value) => setData('email', value)}
                                error={errors.email}
                                required={data.user_type !== 'driver'}
                                placeholder="e.g., john@example.com"
                                helpText={data.user_type === 'driver' ? 'Optional for drivers' : 'Required for other user types'}
                            />

                            <FormSelect
                                label="User Type"
                                name="user_type"
                                value={data.user_type}
                                onChange={(value) => setData('user_type', value)}
                                error={errors.user_type}
                                required
                                options={[
                                    { label: 'Select User Type', value: 'none' },
                                    ...userTypes.map(type => ({
                                        label: type.charAt(0).toUpperCase() + type.slice(1),
                                        value: type
                                    }))
                                ]}
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
                                label="Official Phone"
                                name="official_phone"
                                value={data.official_phone}
                                onChange={(value) => setData('official_phone', value)}
                                error={errors.official_phone}
                                placeholder="e.g., +1234567890"
                            />

                            <FormField
                                label="Personal Phone"
                                name="personal_phone"
                                value={data.personal_phone}
                                onChange={(value) => setData('personal_phone', value)}
                                error={errors.personal_phone}
                                placeholder="e.g., +1234567890"
                            />

                            <FormField
                                label="Emergency Phone"
                                name="emergency_phone"
                                value={data.emergency_phone}
                                onChange={(value) => setData('emergency_phone', value)}
                                error={errors.emergency_phone}
                                placeholder="e.g., +1234567890"
                            />

                            {/* Driver-specific fields */}
                            {data.user_type === 'driver' && (
                                <>
                                    <FormField
                                        label="Driving License Number"
                                        name="driving_license_no"
                                        value={data.driving_license_no}
                                        onChange={(value) => setData('driving_license_no', value)}
                                        error={errors.driving_license_no}
                                        required
                                        placeholder="e.g., DL-123456789"
                                    />

                                    <FormField
                                        label="NID Number"
                                        name="nid_number"
                                        value={data.nid_number}
                                        onChange={(value) => setData('nid_number', value)}
                                        error={errors.nid_number}
                                        required
                                        placeholder="e.g., 1234567890123"
                                    />

                                    <FormField
                                        label="Present Address"
                                        name="present_address"
                                        value={data.present_address}
                                        onChange={(value) => setData('present_address', value)}
                                        error={errors.present_address}
                                        required
                                        multiline
                                        rows={2}
                                        placeholder="Current residential address"
                                    />

                                    <FormField
                                        label="Permanent Address"
                                        name="permanent_address"
                                        value={data.permanent_address}
                                        onChange={(value) => setData('permanent_address', value)}
                                        error={errors.permanent_address}
                                        required
                                        multiline
                                        rows={2}
                                        placeholder="Permanent residential address"
                                    />

                                    <FormField
                                        label="Emergency Contact Name"
                                        name="emergency_contact_name"
                                        value={data.emergency_contact_name}
                                        onChange={(value) => setData('emergency_contact_name', value)}
                                        error={errors.emergency_contact_name}
                                        required
                                        placeholder="e.g., John Doe"
                                    />

                                    <FormField
                                        label="Emergency Contact Phone"
                                        name="emergency_contact_phone"
                                        value={data.emergency_contact_phone}
                                        onChange={(value) => setData('emergency_contact_phone', value)}
                                        error={errors.emergency_contact_phone}
                                        required
                                        placeholder="e.g., +1234567890"
                                    />

                                    <FormField
                                        label="Emergency Contact Relation"
                                        name="emergency_contact_relation"
                                        value={data.emergency_contact_relation}
                                        onChange={(value) => setData('emergency_contact_relation', value)}
                                        error={errors.emergency_contact_relation}
                                        required
                                        placeholder="e.g., Father, Mother, Spouse"
                                    />
                                </>
                            )}

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
