import { Module } from '@nestjs/common';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { ConfigModule } from '@nestjs/config';
import { ResponseService } from './responses/response.service';
import { NavigationService } from './navigation/navigation.service';
import { SessionService } from './session/session.service';
import { TypesOfMessage } from './responses/types.response.service';

@Module({
    imports:[WhatsappModule, ConfigModule],
    controllers:[BotController],
    providers:[
        BotService, 
        ResponseService, 
        NavigationService, 
        SessionService,
        TypesOfMessage
    ]
})
export class BotModule {}
