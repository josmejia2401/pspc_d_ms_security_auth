export interface TokenDTO {
    id: string;
    userId: string;
    username: string;
    token: string;
    audience: string;
    //channel: string;
    expirationAt: string;
    createAt: string;
}

export interface ScanTransactionResponse {
    lastEvaluatedKey: any;
    results: any[];
    segment: number;
    currentRows: number;
}