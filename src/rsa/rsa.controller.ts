import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EncryptDto } from './dto/encrypt.dto';
import { DecryptDto } from './dto/decrypt.dto';
import { RsaService } from './rsa.service';

@ApiTags('RSA')
@Controller('rsa') 
export class RsaController {
  constructor(private readonly rsaService: RsaService) {}

  @Post('get-encrypt-data')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: EncryptDto })
  @ApiResponse({ status: 200, description: 'Encrypt response' })
  getEncryptData(@Body() body: EncryptDto) {
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

  @Post('get-decrypt-data')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: DecryptDto })
  @ApiResponse({ status: 200, description: 'Decrypt response' })
  getDecryptData(@Body() body: DecryptDto) {
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
}
