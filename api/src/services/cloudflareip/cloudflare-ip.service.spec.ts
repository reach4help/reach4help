import { Test, TestingModule } from '@nestjs/testing';
import { CloudflareIpService } from './cloudflare-ip.service';

describe('CloudflareIpService', () => {
  let service: CloudflareIpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudflareIpService],
    }).compile();

    service = module.get<CloudflareIpService>(CloudflareIpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
