import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateResidentDto {
  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsDateString()
  birthDate: string;

  @IsNumber()
  @IsPositive()
  age: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  nickName?: string;

  @Min(1)
  @IsNumber()
  @IsPositive()
  gender: number;

  @IsNumber()
  @Min(1)
  @IsPositive()
  country: number;

  @IsNumber()
  @Min(1)
  @IsPositive()
  city: number;

  @IsString()
  @MinLength(1)
  addressResidence?: string;

  @IsNumber()
  @Min(1)
  @IsPositive()
  typeIdentification: number;

  @IsString()
  @IsOptional()
  @MinLength(5)
  numberIdentification: string;
}
