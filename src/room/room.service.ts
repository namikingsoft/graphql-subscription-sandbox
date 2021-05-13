import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.model';
import { RoomEntity } from './room.entity';
import { RoomInput } from './dto/room.input';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async gets(): Promise<Room[]> {
    const messages = await this.roomRepository.find();
    return messages.map(RoomService.mapToModel);
  }

  async save(messageInput: RoomInput): Promise<Room> {
    const message = await this.roomRepository.save(messageInput);
    return RoomService.mapToModel(message);
  }

  static mapToModel(entity: RoomEntity): Room {
    return { ...entity, createdAt: entity.createdAt.getTime() };
  }

  static mapToEntity(model: Room): RoomEntity {
    return { ...model, createdAt: new Date(model.createdAt) };
  }
}
