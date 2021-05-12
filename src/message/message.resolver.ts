import { Resolver, Args, Query, Mutation, Subscription } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { MessageInput } from './dto/message.input';
import { PubsubService } from '../pubsub/pubsub.service';

@Resolver()
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    private pubsubService: PubsubService,
  ) {}

  @Query(() => [Message], { name: 'messages' })
  async getMessages() {
    return this.messageService.gets();
  }

  @Mutation(() => Message)
  async postMessage(@Args('messageInput') messageInput: MessageInput) {
    const message = await this.messageService.save(messageInput);
    this.pubsubService.publish('messageAdded', { messageAdded: message });
    return message;
  }

  @Subscription(() => Message)
  messageAdded() {
    return this.pubsubService.asyncIterator('messageAdded');
  }
}
