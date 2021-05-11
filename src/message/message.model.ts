import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: string;

  @Field()
  text: string;

  @Field()
  createdAt: number;
}
