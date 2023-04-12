import { IsString, IsNotEmpty, MinLength, IsOptional } from "class-validator";

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(2)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(2)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bio: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  website: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  country: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  github: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  linkedin: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  twitter: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  instagram: string;
}
