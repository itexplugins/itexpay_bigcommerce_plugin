export interface User {
    email: string;
    id: number;
    username?: string;
}

export interface SessionProps {
    access_token?: string;
    context: string;
    owner?: User;
    scope?: string;
    store_hash?: string;
    sub?: string;
    timestamp?: number;
    user: User;
}

export interface ItexpayProps {
    isActive: boolean;
    current_mode: string;
    test_public_key: string;
    test_private_key: string;
    test_encryption_key: string;
    live_public_key: string;
    live_private_key: string;
    live_encryption_key: string;
    // description: string;
    // type: string;
}

export interface ItexpayTransactionsProps {
    userId: number;
    email: string;
    description: string;
    amount: string;
    status: string;
    date: string;
    transactionRef: string;
}

export interface SessionContextProps {
    accessToken: string;
    storeHash: string;
    user: User;
}

export interface QueryParams {
    [key: string]: string | string[];
}

export interface ApiConfig {
    apiUrl?: string;
    loginUrl?: string;
}
