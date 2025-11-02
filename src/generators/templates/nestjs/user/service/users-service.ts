import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UpdateUserDto } from './user/dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async register(createUserDto: CreateUserDto) {
        const { email, password, name } = createUserDto;

        // Check if user already exists
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new UnauthorizedException('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new this.userModel({
            email,
            password: hashedPassword,
            name,
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' },
        );

        return {
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        };
    }

    async login(loginDto: { email: string; password: string }) {
        const { email, password } = loginDto;

        // Find user
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' },
        );

        return {
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        };
    }

    async findAll() {
        return this.userModel.find().select('-password').exec();
    }

    async findOne(id: string) {
        const user = await this.userModel.findById(id).select('-password').exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (updateUserDto.name) user.name = updateUserDto.name;
        if (updateUserDto.email) user.email = updateUserDto.email;

        await user.save();

        return {
            message: 'User updated successfully',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        };
    }

    async remove(id: string) {
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return { message: 'User deleted successfully' };
    }
}

