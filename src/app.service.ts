import { Injectable, OnModuleInit } from '@nestjs/common';
import next from 'next';

type NextServer = ReturnType<typeof next>;

@Injectable()
export class AppService implements OnModuleInit {
  private server: NextServer;

  async onModuleInit(): Promise<void> {
    try {
      console.log('NODE_ENV', process.env.NODE_ENV);
      this.server = next({
        dev: process.env.NODE_ENV !== 'production',
        dir: './src/client',
      });
      await this.server.prepare();
    } catch (error) {
      console.log(error);
    }
  }

  getNextRequestHandler() {
    return this.server.getRequestHandler();
  }
}
