import { Injectable, OnModuleInit } from '@nestjs/common';
import next from 'next';

type NextServer = ReturnType<typeof next>;

@Injectable()
export class AppService implements OnModuleInit {
  private server: NextServer;

  async onModuleInit(): Promise<void> {
    try {
      this.server = next({ dev: true, dir: './src/client' });
      await this.server.prepare();
    } catch (error) {
      console.log(error);
    }
  }

  getNextServer(): NextServer {
    return this.server;
  }
}
