interface Metadata {
    key: string;
    value: string;
}

export interface Transaction {
    id: number;
    date: string;
    internalAccountToDebit: string;
    amount: number;
    currency: string;
    feePaidByReceiver: boolean;
    destination: string;
    metadata: Metadata[];
}
