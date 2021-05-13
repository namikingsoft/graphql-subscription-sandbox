import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { Message } from './message.model';
import { MessageEntity } from './message.entity';
import { MessageInput } from './dto/message.input';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async gets(roomId: string): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      room: Raw((alias) => `${alias} = :roomId`, { roomId }),
    });
    return messages.map(MessageService.mapToModel);
  }

  async save({ roomId, ...rest }: MessageInput): Promise<Message> {
    const message = await this.messageRepository.save({
      ...rest,
      room: { id: roomId },
    });
    return MessageService.mapToModel(message);
  }

  static mapToModel(entity: MessageEntity): Message {
    return { ...entity, createdAt: entity.createdAt.getTime() };
  }
}
