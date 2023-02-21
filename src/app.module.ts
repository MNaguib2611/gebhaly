import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import 'dotenv/config';

const MongoURL = process.env.MONGODB_URI;

@Module({
  imports: [MongooseModule.forRoot(MongoURL), AuthenticationModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
