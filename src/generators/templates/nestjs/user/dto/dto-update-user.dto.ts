import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    name?: string;
}

