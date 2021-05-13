import { Field, ArgsType, ID } from '@nestjs/graphql';

@ArgsType()
export class RoomArgs {
  @Field(() => ID)
  roomId: string;
}
