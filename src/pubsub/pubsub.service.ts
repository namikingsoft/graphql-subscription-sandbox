import { Injectable, OnModuleInit } from '@nestjs/common';
import { PubSub } from 'apollo-server-express';
import { PostgresPubSub } from 'graphql-postgres-subscriptions';
import { Client } from 'pg';
import * as ormconfig from '../../ormconfig';

@Injectable()
export class PubsubService implements OnModuleInit {
  private pubSub: PubSub;

  onModuleInit() {
    const client = new Client({ connectionString: ormconfig.url });
    client.connect();
    this.pubSub = new PostgresPubSub({ client });
  }

  publish(triggerName: string, payload: any) {
    return this.pubSub.publish(triggerName, payload);
  }

  asyncIterator(triggerName: string) {
    return this.pubSub.asyncIterator(triggerName);
  }
}
