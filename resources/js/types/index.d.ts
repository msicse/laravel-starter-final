import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    flash: {
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    status: 'active' | 'inactive' | 'pending';
    created_at: string;
    updated_at: string;
}

export interface Vehicle {
    id: number;
    brand: string;
    model: string;
    color: string;
    registration_number: string;
    vendor: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface ActionButton {
    label: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive';
}


// DataTable Types
export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
    key: string;
    direction: SortDirection;
}

export interface FilterOption {
    label: string;
    value: string | number;
}

export interface ColumnFilter {
    key: string;
    label: string;
    options: FilterOption[];
    type: 'select' | 'multiselect';
}

export interface DataTableColumn<T = any> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    filterable?: boolean;
    filterOptions?: FilterOption[];
    render?: (value: any, row: T) => React.ReactNode;
    className?: string;
    headerClassName?: string;
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    startItem: number;
    endItem: number;
}

export interface DataTableProps<T = any> {
    data: T[];
    columns: DataTableColumn<T>[];
    searchable?: boolean;
    searchPlaceholder?: string;
    filterable?: boolean;
    filters?: ColumnFilter[];
    sortable?: boolean;
    paginated?: boolean;
    itemsPerPage?: number;
    loading?: boolean;
    emptyMessage?: string;
    className?: string;
    onRowClick?: (row: T) => void;
}

