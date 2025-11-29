import { Test, TestingModule } from '@nestjs/testing';
import { RsaService } from '../src/rsa/rsa.service';
import * as fs from 'fs';
import * as path from 'path';

describe('RsaService', () => {
  let service: RsaService;
  const keysDir = path.join(process.cwd(), 'keys');

  beforeAll(() => {
    if (!fs.existsSync(keysDir)) fs.mkdirSync(keysDir);
    const priv = path.join(keysDir, 'private.pem');
    const pub = path.join(keysDir, 'public.pem');

    if (!fs.existsSync(priv) || !fs.existsSync(pub)) {
      const { generateKeyPairSync } = require('crypto');
      const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      });
      fs.writeFileSync(priv, privateKey);
      fs.writeFileSync(pub, publicKey);
    }
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RsaService],
    }).compile();

    service = module.get<RsaService>(RsaService);
  });

  it('should encrypt and decrypt a payload', () => {
    const payload = 'hello test';
    const encrypted = service.encrypt(payload);
    const decrypted = service.decrypt(encrypted);
    expect(decrypted).toBe(payload);
  });
});
