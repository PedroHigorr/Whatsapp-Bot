import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => {

        const store = await redisStore({

          url: ConfigService.getOrThrow<string>('URL_REDIS'),
        });

        return { 
          store: () => store, 
          ttl: ConfigService.getOrThrow<number>('CACHE_TTL')
        };
      },
      isGlobal: true
    }),

    BotModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
