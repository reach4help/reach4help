import { Injectable, HttpService, Module } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { CLOUDFLARE_RANGES_BASE_URL } from '../../constants';
import { Observable } from 'rxjs';

@Module({
  imports: [HttpService]
})
@Injectable()
export class CloudflareIpService {
  constructor(private http: HttpService){}

  getIPs(ipVersion: number): Observable<Array<string>> {
    return this.http.get(CLOUDFLARE_RANGES_BASE_URL + ipVersion).pipe(
      map(resp => resp.data.toString().split('\n'))
    )
  }
}
