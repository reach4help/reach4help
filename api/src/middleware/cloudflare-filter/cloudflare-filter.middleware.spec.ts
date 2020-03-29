import { CloudflareFilterMiddleware } from './cloudflare-filter.middleware';
import { HttpService } from '@nestjs/common';
import { CloudflareIpService } from '../../services/cloudflareip/cloudflare-ip.service';

describe('CloudflarefilterMiddleware', () => {
  it('should be defined', () => {
    expect(new CloudflareFilterMiddleware(
      new CloudflareIpService(
        new HttpService()))
    ).toBeDefined();
  });
});
