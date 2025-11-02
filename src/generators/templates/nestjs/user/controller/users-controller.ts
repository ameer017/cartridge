import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UpdateUserDto } from './user/dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() loginDto: { email: string; password: string }) {
        return this.usersService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}

