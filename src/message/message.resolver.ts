import { Resolver, Args, Query, Mutation, Subscription } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { MessageInput } from './dto/message.input';
import { RoomArgs } from './dto/room.args';
import { PubsubService } from '../pubsub/pubsub.service';

@Resolver()
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    private pubsubService: PubsubService,
  ) {}

  @Query(() => [Message], { name: 'messages' })
  async getMessages(@Args() { roomId }: RoomArgs) {
    return this.messageService.gets(roomId);
  }

  @Mutation(() => Message)
  async postMessage(@Args('messageInput') messageInput: MessageInput) {
    const message = await this.messageService.save(messageInput);
    this.pubsubService.publish(`/rooms/${messageInput.roomId}/messageAdded`, {
      messageAdded: message,
    });
    return message;
  }

  @Subscription(() => Message)
  messageAdded(@Args() { roomId }: RoomArgs) {
    return this.pubsubService.asyncIterator(`/rooms/${roomId}/messageAdded`);
  }
}
