import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class EncryptDto {
  @ApiProperty({ type: String, maxLength: 2000 })
  @IsString()
  @MaxLength(2000)
  payload: string;
}
