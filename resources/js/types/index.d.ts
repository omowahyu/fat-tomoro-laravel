import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

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
    href: NonNullable<InertiaLinkProps['href']> | string;
    icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
    isActive?: boolean;
    children?: NavItem[];
    tag?: 'Dev' | 'Soon' | 'New' | string;
}

// Bridging-specific interfaces
export interface FileUploadData {
    id: string;
    type: 'BOH' | 'BI' | 'BANK';
    name: string;
    size: number;
    status: 'uploaded' | 'parsing' | 'validated' | 'mapped' | 'posted' | 'error';
    meta?: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export interface RawRowData {
    id: string;
    file_id: string;
    row_json: Record<string, any>;
    row_number: number;
}

export interface MappingRule {
    id: string;
    type: 'column' | 'item' | 'channel' | 'coa' | 'bank';
    source: string;
    target: string;
    confidence: number;
    rules?: Record<string, any>;
    is_active: boolean;
}

export interface TransformedRowData {
    id: string;
    file_id: string;
    normalized_json: Record<string, any>;
    valid_flag: boolean;
    errors?: string[];
    warnings?: string[];
}

export interface PostingBatch {
    id: string;
    file_id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    idempotency_key: string;
    total_rows: number;
    success_count: number;
    error_count: number;
    created_at: string;
    updated_at: string;
}

export interface AccurateApiResult {
    id: string;
    batch_id: string;
    endpoint: string;
    status: 'success' | 'error';
    request_data: Record<string, any>;
    response_data: Record<string, any>;
    error_message?: string;
    created_at: string;
}

export interface ReconciliationData {
    id: string;
    date: string;
    channel: string;
    bi_gross: number;
    bi_fee: number;
    bi_ads: number;
    bi_nett: number;
    bank_amount: number;
    difference: number;
    status: 'matched' | 'unmatched' | 'reviewed';
    notes?: string;
}

export interface DashboardStats {
    total_files_today: number;
    success_rate: number;
    pending_reconciliation: number;
    total_difference_amount: number;
    last_sync_time: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
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
