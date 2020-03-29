import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  NestModule
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CountriesModule } from './countries/countries.module';
import { AddressesModule } from './addresses/addresses.module';
import { CloudflareIpService } from './services/cloudflareip/cloudflare-ip.service';
import { CloudflareFilterMiddleware } from './middleware/cloudflare-filter/cloudflare-filter.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    CountriesModule,
    AddressesModule,
    HttpModule
  ],
  controllers: [],
  providers: [CloudflareIpService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(CloudflareFilterMiddleware).forRoutes('');
  }
}
