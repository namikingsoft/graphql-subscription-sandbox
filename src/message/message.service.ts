import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.model';
import { MessageEntity } from './message.entity';
import { MessageInput } from './dto/message.input';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async gets(): Promise<Message[]> {
    const messages = await this.messageRepository.find();
    return messages.map(MessageService.mapToModel);
  }

  async save(messageInput: MessageInput): Promise<Message> {
    const message = await this.messageRepository.save(messageInput);
    return MessageService.mapToModel(message);
  }

  static mapToModel(entity: MessageEntity): Message {
    return { ...entity, createdAt: entity.createdAt.getTime() };
  }

  static mapToEntity(model: Message): MessageEntity {
    return { ...model, createdAt: new Date(model.createdAt) };
  }
}
