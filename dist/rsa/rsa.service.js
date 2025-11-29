"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RsaService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
let RsaService = class RsaService {
    constructor() {
        const keysDir = path.join(process.cwd(), 'keys');
        try {
            this.publicKey = fs.readFileSync(path.join(keysDir, 'public.pem'), 'utf8');
            this.privateKey = fs.readFileSync(path.join(keysDir, 'private.pem'), 'utf8');
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('RSA keys not found in /keys');
        }
    }
    encrypt(payload) {
        const buffer = Buffer.from(payload, 'utf8');
        try {
            const encrypted = crypto.publicEncrypt({ key: this.publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer);
            return encrypted.toString('base64');
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Encryption failed');
        }
    }
    decrypt(base64Encrypted) {
        const buffer = Buffer.from(base64Encrypted, 'base64');
        try {
            const decrypted = crypto.privateDecrypt({ key: this.privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer);
            return decrypted.toString('utf8');
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Decryption failed');
        }
    }
};
exports.RsaService = RsaService;
exports.RsaService = RsaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RsaService);
//# sourceMappingURL=rsa.service.js.map