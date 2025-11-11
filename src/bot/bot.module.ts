import { Module } from '@nestjs/common';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports:[WhatsappModule, ConfigModule],
    controllers:[BotController],
    providers:[BotService]
})
export class BotModule {}
