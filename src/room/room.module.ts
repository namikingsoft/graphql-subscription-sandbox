import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubsubModule } from '../pubsub/pubsub.module';
import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';
import { RoomEntity } from './room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity]), PubsubModule],
  exports: [RoomService],
  providers: [RoomResolver, RoomService],
})
export class RoomModule {}
