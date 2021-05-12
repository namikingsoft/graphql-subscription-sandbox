import { Resolver, Args, Query, Mutation, Subscription } from '@nestjs/graphql';
import { PostgresPubSub } from 'graphql-postgres-subscriptions';
import { Client } from 'pg';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { MessageInput } from './dto/message.input';
import * as ormconfig from '../../ormconfig';

// TODO: Dependency Injection
const client = new Client({ connectionString: ormconfig.url });
client.connect();
const pubSub = new PostgresPubSub({ client });

@Resolver()
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  @Query(() => [Message], { name: 'messages' })
  async getMessages() {
    return this.messageService.gets();
  }

  @Mutation(() => Message)
  async postMessage(@Args('messageInput') messageInput: MessageInput) {
    const message = await this.messageService.save(messageInput);
    pubSub.publish('messageAdded', { messageAdded: message });
    return message;
  }

  @Subscription(() => Message)
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }
}
