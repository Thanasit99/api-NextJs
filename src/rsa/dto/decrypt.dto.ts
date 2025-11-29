import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DecryptDto {
  @ApiProperty({ type: String })
  @IsString()
  data1: string;

  @ApiProperty({ type: String })
  @IsString()
  data2: string;
}
