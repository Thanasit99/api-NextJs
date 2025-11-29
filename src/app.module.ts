import { Module } from '@nestjs/common';
import { RsaModule } from './rsa/rsa.module';

@Module({
  imports: [RsaModule],
})
export class AppModule {}
