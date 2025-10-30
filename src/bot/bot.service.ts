import { Injectable } from '@nestjs/common';
import { WhatsappWebhookPayload } from './bot.dto';

@Injectable()
export class BotService {

    parsePayload(body: WhatsappWebhookPayload){
        
    }

}
