import {ItexpayProps, ItexpayTransactionsProps, SessionContextProps, SessionProps} from './index';

export interface StoreData {
    accessToken?: string;
    scope?: string;
    storeHash: string;
}

export interface UserData {
    email: string;
    username?: string;
}

export interface ItexpayData {
    email: string;
    username?: string;
}


export interface Db {
    hasStoreUser(storeHash: string, userId: string): Promise<boolean> | boolean;
    setUser(session: SessionProps): Promise<void>;
    setItexpay(session: SessionContextProps, itexkeys: ItexpayProps): Promise<void>;
    getItexpay(session: SessionContextProps): Promise<ItexpayProps>;

    setItexpayTransaction(session: SessionContextProps, ItexpayTransaction: ItexpayTransactionsProps): Promise<void>;
    getItexpayTransactions(session: SessionContextProps, ItexpayTransaction: ItexpayTransactionsProps): Promise<void>;

    setStore(session: SessionProps): Promise<void>;
    setStoreUser(session: SessionProps): Promise<void>;
    getStoreToken(storeId: string): Promise<string> | null;
    deleteStore(session: SessionProps): Promise<void>;
    deleteUser(session: SessionProps): Promise<void>;
}
