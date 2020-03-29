import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { CloudflareIpService } from '../../services/cloudflareip/cloudflare-ip.service';
import { inRange } from 'range_check';

@Injectable()
export class CloudflareFilterMiddleware implements NestMiddleware {
  constructor(private cloudflareIpService: CloudflareIpService) {}

  use(req: Request, res: Response, next: (any?) => void) {
    if (process.env.NODE_ENV !== 'development') {
      const ipType = req.ip.match(':') ? 6 : 4;
      this.cloudflareIpService.getIPs(ipType).toPromise().then(
        cidrs => {
          const checks = cidrs.map(cidr => inRange(req.ip, cidr));
          if (checks.some(el => !el)) {
            next(new HttpException(
              // TODO: once checked on dev platform, msg should be made more generic
              'Forbidden IP: ' + req.ip,
              HttpStatus.FORBIDDEN
            ));
          }
        }
      ).then(() => next());
    } else {
      next();
    }
  }
}
