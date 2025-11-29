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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RsaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const encrypt_dto_1 = require("./dto/encrypt.dto");
const decrypt_dto_1 = require("./dto/decrypt.dto");
const rsa_service_1 = require("./rsa.service");
let RsaController = class RsaController {
    constructor(rsaService) {
        this.rsaService = rsaService;
    }
    getEncryptData(body) {
        const encrypted = this.rsaService.encrypt(body.payload);
        const mid = Math.ceil(encrypted.length / 2);
        const data1 = encrypted.slice(0, mid);
        const data2 = encrypted.slice(mid);
        return {
            successful: true,
            error_code: null,
            data: {
                data1,
                data2,
            },
        };
    }
    getDecryptData(body) {
        const merged = `${body.data1}${body.data2}`;
        const payload = this.rsaService.decrypt(merged);
        return {
            successful: true,
            error_code: null,
            data: {
                payload,
            },
        };
    }
};
exports.RsaController = RsaController;
__decorate([
    (0, common_1.Post)('get-encrypt-data'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBody)({ type: encrypt_dto_1.EncryptDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Encrypt response' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [encrypt_dto_1.EncryptDto]),
    __metadata("design:returntype", void 0)
], RsaController.prototype, "getEncryptData", null);
__decorate([
    (0, common_1.Post)('get-decrypt-data'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBody)({ type: decrypt_dto_1.DecryptDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Decrypt response' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [decrypt_dto_1.DecryptDto]),
    __metadata("design:returntype", void 0)
], RsaController.prototype, "getDecryptData", null);
exports.RsaController = RsaController = __decorate([
    (0, swagger_1.ApiTags)('RSA'),
    (0, common_1.Controller)('rsa'),
    __metadata("design:paramtypes", [rsa_service_1.RsaService])
], RsaController);
//# sourceMappingURL=rsa.controller.js.map