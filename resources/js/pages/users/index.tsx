import { ServerSideDataTable } from '@/base-components/base-data-table';
import { PageHeader } from '@/base-components/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { BreadcrumbItem, ColumnFilter, DataTableColumn, User } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Edit, Eye, Plus, Trash2, UserCheck, UserX } from 'lucide-react';

interface PaginatedUsers {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

interface UsersPageProps {
    users: PaginatedUsers;
    filterOptions: {
        user_types: string[];
        statuses: string[];
        blood_groups: string[];
    };
    stats: {
        total: number;
        active: number;
        drivers: number;
        admins: number;
    };
    queryParams: {
        search?: string;
        sort?: string;
        direction?: 'asc' | 'desc';
        filters?: Record<string, any>;
        per_page?: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/users' },
];

export default function UsersIndex({ users, filterOptions, stats, queryParams }: UsersPageProps) {
    // Define table columns
    const columns: DataTableColumn<User>[] = [
        {
            key: 'id',
            label: 'ID',
            sortable: true,
            className: 'w-16',
        },
        {
            key: 'name',
            label: 'User',
            sortable: true,
            render: (value, row) => (
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        {row.image ? (
                            <img className="h-8 w-8 rounded-full" src={row.image} alt={row.name} />
                        ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                    {row.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium">{value}</div>
                        <div className="text-sm text-muted-foreground">{row.email}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'phone',
            label: 'Phone',
            sortable: true,
            render: (value) => value || 'N/A',
        },
        {
            key: 'user_type',
            label: 'Type',
            sortable: true,
            filterable: true,
            render: (value) => (
                <Badge variant="outline" className="capitalize">
                    {value || 'User'}
                </Badge>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            filterable: true,
            render: (value) => {
                const variants = {
                    active: 'default',
                    inactive: 'secondary',
                    suspended: 'destructive',
                } as const;

                const icons = {
                    active: <UserCheck className="h-3 w-3" />,
                    inactive: <UserX className="h-3 w-3" />,
                    suspended: <UserX className="h-3 w-3" />,
                };

                return (
                    <Badge variant={variants[value as keyof typeof variants]} className="gap-1">
                        {icons[value as keyof typeof icons]}
                        {value}
                    </Badge>
                );
            },
        },
        {
            key: 'blood_group',
            label: 'Blood Group',
            sortable: true,
            filterable: true,
            render: (value) => (
                <span className="font-mono text-sm">{value || 'N/A'}</span>
            ),
        },
        {
            key: 'created_at',
            label: 'Created',
            sortable: true,
            render: (value) =>
                new Date(value).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                }),
            className: 'text-muted-foreground',
        },
        {
            key: 'actions' as keyof User,
            label: 'Actions',
            render: (_, row) => (
                <div className="flex items-center space-x-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.visit(route('users.show', row.id));
                        }}
                        title="View user"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.visit(route('users.edit', row.id));
                        }}
                        title="Edit user"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Are you sure you want to delete ${row.name}?`)) {
                                router.delete(route('users.destroy', row.id), {
                                    preserveScroll: true,
                                });
                            }
                        }}
                        title="Delete user"
                        className="text-destructive hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    // Define filters
    const filters: ColumnFilter[] = [
        {
            key: 'user_type',
            label: 'User Type',
            type: 'multiselect',
            options: filterOptions.user_types.map((type) => ({
                label: type.charAt(0).toUpperCase() + type.slice(1),
                value: type,
            })),
        },
        {
            key: 'status',
            label: 'Status',
            type: 'multiselect',
            options: filterOptions.statuses.map((status) => ({
                label: status.charAt(0).toUpperCase() + status.slice(1),
                value: status,
            })),
        },
        {
            key: 'blood_group',
            label: 'Blood Group',
            type: 'multiselect',
            options: filterOptions.blood_groups.map((group) => ({
                label: group,
                value: group,
            })),
        },
    ];

    const handleRowClick = (user: User) => {
        router.visit(route('users.show', user.id));
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="space-y-6">
                <PageHeader
                    title="Users"
                    description="Manage system users with advanced filtering and search."
                    actions={[
                        {
                            label: 'Add User',
                            icon: <Plus className="mr-2 h-4 w-4" />,
                            href: route('users.create'),
                        },
                    ]}
                    stats={[
                        {
                            label: 'Total Users',
                            value: stats.total,
                        },
                        {
                            label: 'Active Users',
                            value: stats.active,
                        },
                        {
                            label: 'Drivers',
                            value: stats.drivers,
                        },
                        {
                            label: 'Admins',
                            value: stats.admins,
                        },
                    ]}
                />

                {/* Data Table */}
                <ServerSideDataTable
                    data={users}
                    columns={columns}
                    queryParams={queryParams}
                    filterOptions={filterOptions}
                    filters={filters}
                    searchPlaceholder="Search users..."
                    exportable={false}
                    onRowClick={handleRowClick}
                    emptyMessage="No users found. Add your first user to get started."
                />
            </div>
        </AppSidebarLayout>
    );
}
