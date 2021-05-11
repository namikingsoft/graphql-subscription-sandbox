import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';

@Module({
  imports: [TypeOrmModule.forRoot(), MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
