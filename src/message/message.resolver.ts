import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { MessageInput } from './dto/message.input';

@Resolver()
export class MessageResolver {
  constructor(private messageService: MessageService) {}

  @Query(() => [Message], { name: 'messages' })
  async getMessages() {
    return this.messageService.gets();
  }

  @Mutation(() => Message)
  async postMessage(@Args('messageInput') messageInput: MessageInput) {
    return this.messageService.save(messageInput);
  }
}
