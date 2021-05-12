import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubsubModule } from '../pubsub/pubsub.module';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { MessageEntity } from './message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity]), PubsubModule],
  providers: [MessageResolver, MessageService],
})
export class MessageModule {}
