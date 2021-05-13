import { Resolver, Args, Query, Mutation, Subscription } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { Room } from './room.model';
import { RoomInput } from './dto/room.input';
import { PubsubService } from '../pubsub/pubsub.service';

@Resolver()
export class RoomResolver {
  constructor(
    private roomService: RoomService,
    private pubsubService: PubsubService,
  ) {}

  @Query(() => [Room], { name: 'rooms' })
  async getRooms() {
    return this.roomService.gets();
  }

  @Mutation(() => Room)
  async postRoom(@Args('roomInput') roomInput: RoomInput) {
    const room = await this.roomService.save(roomInput);
    this.pubsubService.publish('/roomAdded', { roomAdded: room });
    return room;
  }

  @Subscription(() => Room)
  roomAdded() {
    return this.pubsubService.asyncIterator('/roomAdded');
  }
}
