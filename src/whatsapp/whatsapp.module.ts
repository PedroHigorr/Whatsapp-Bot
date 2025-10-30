import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { ConfigModule } from '@nestjs/config';

@Module({

    imports: [HttpModule, ConfigModule],
    providers: [WhatsappService],
    exports: [WhatsappService]
})
export class WhatsappModule {}
