# NestJS RSA Encrypt/Decrypt API

Simple NestJS project that implements these endpoints:

- POST /get-encrypt-data
- POST /get-decrypt-data

Features:
- Swagger UI at `/api-docs`
- Unit tests with Jest
- Uses RSA keys in `keys/` folder

## Setup

1. Install dependencies

```bash
npm install
```


2. Start in development mode

```bash
npm run start:dev
```

Swagger: http://localhost:3000/api-docs

encrpt data :http://localhost:3000/rsa/get-encrypt-data
{
    payload: "string | required | 0 - 2000 characters"
}
decrypt data :http://localhost:3000/rsa/get-decrypt-data

{
    data1: "string | required",
    data2: "string | required"
}

3. Run tests

```bash
npm test
```
