import { Test, TestingModule } from '@nestjs/testing';
import { PubsubService } from './pubsub.service';

describe('PubSubService', () => {
  let provider: PubsubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubsubService],
    }).compile();

    provider = module.get<PubsubService>(PubsubService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
