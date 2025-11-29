import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class RsaService {
  private publicKey: string;
  private privateKey: string;

  constructor() {
    const keysDir = path.join(process.cwd(), 'keys');
    try {
      this.publicKey = fs.readFileSync(path.join(keysDir, 'public.pem'), 'utf8');
      this.privateKey = fs.readFileSync(path.join(keysDir, 'private.pem'), 'utf8');
    } catch (err) {
      throw new InternalServerErrorException('RSA keys not found in /keys');
    }
  }

  encrypt(payload: string): string {
    const buffer = Buffer.from(payload, 'utf8');
    try {
      const encrypted = crypto.publicEncrypt({ key: this.publicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer);
      return encrypted.toString('base64');
    } catch (err) {
      throw new InternalServerErrorException('Encryption failed');
    }
  }

  decrypt(base64Encrypted: string): string {
    const buffer = Buffer.from(base64Encrypted, 'base64');
    try {
      const decrypted = crypto.privateDecrypt({ key: this.privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer);
      return decrypted.toString('utf8');
    } catch (err) {
      throw new InternalServerErrorException('Decryption failed');
    }
  }
}
