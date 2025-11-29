import { EncryptDto } from './dto/encrypt.dto';
import { DecryptDto } from './dto/decrypt.dto';
import { RsaService } from './rsa.service';
export declare class RsaController {
    private readonly rsaService;
    constructor(rsaService: RsaService);
    getEncryptData(body: EncryptDto): {
        successful: boolean;
        error_code: any;
        data: {
            data1: string;
            data2: string;
        };
    };
    getDecryptData(body: DecryptDto): {
        successful: boolean;
        error_code: any;
        data: {
            payload: string;
        };
    };
}
