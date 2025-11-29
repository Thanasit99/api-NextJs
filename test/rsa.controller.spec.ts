import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as fs from 'fs';
import * as path from 'path';

beforeAll(() => {
  const keysDir = path.join(process.cwd(), 'keys');
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

describe('RSA Controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/get-encrypt-data (POST) returns two parts', async () => {
    const res = await request(app.getHttpServer())
      .post('/rsa/get-encrypt-data')
      .send({ payload: 'integration test payload' })
      .expect(200);

    expect(res.body.successful).toBe(true);
    expect(res.body.data.data1).toBeDefined();
    expect(res.body.data.data2).toBeDefined();
  });

  it('/get-decrypt-data (POST) decrypts', async () => {
    const encRes = await request(app.getHttpServer())
      .post('/rsa/get-encrypt-data')
      .send({ payload: 'roundtrip' })
      .expect(200);

    const { data1, data2 } = encRes.body.data;

    const decRes = await request(app.getHttpServer())
      .post('/rsa/get-decrypt-data')
      .send({ data1, data2 })
      .expect(200);

    expect(decRes.body.successful).toBe(true);
    expect(decRes.body.data.payload).toBe('roundtrip');
  });
});
