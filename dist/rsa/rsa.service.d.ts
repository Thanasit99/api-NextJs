export declare class RsaService {
    private publicKey;
    private privateKey;
    constructor();
    encrypt(payload: string): string;
    decrypt(base64Encrypted: string): string;
}
