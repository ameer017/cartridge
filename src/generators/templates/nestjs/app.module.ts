import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/user-auth-db';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URI),
    UsersModule,
  ],
})
export class AppModule {}

