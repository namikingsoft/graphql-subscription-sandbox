import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoomInput {
  @Field()
  name: string;
}
