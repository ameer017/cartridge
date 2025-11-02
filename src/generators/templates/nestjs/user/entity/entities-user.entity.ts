import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email: string;

    @Prop({ required: true, minlength: 6 })
    password: string;

    @Prop({ required: true, trim: true })
    name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

