import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PubsubModule } from './pubsub/pubsub.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      // For test on production
      // https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/#enabling-graphql-playground-in-production
      playground: true,
      introspection: true,
    }),
    PubsubModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
