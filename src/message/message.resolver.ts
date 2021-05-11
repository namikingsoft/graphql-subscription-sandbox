import { Resolver, Args, Query, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { MessageInput } from './dto/message.input';

const pubSub = new PubSub();

@Resolver()
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  @Query(() => [Message], { name: 'messages' })
  async getMessages() {
    return this.messageService.gets();
  }

  @Mutation(() => Message)
  async postMessage(@Args('messageInput') messageInput: MessageInput) {
    const message = this.messageService.save(messageInput);
    pubSub.publish('messageAdded', { messageAdded: message });
    return message;
  }

  @Subscription(() => Message)
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }
}
