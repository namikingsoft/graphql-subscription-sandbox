import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class MessageInput {
  @Field()
  text: string;

  @Field(() => ID)
  roomId: string;
}
