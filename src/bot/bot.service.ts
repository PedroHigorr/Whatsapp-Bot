import { Inject, Injectable } from '@nestjs/common';
import { WhatsAppMessage, WhatsappWebhookPayload } from './bot.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { userSession } from './bot.interface';
import { ConfigService } from '@nestjs/config';
import { SessionService } from './session/session.service';
import { ResponseService } from './responses/response.service';
import { NavigationService } from './navigation/navigation.service';

@Injectable()
export class BotService {
    constructor(

        private readonly nav: NavigationService,
   ){}

   async parsePayload(body: WhatsappWebhookPayload): Promise<{ usr_phone: string; response: string; message_type: string, message_id: string } | null > {

        try {
        
        const messagePayload = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body;
        const query = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
        const statusPayload = body?.entry?.[0]?.changes?.[0]?.value?.statuses?.[0];


        if (query) {

            let response: string;
            let usr_phone = query.from; 
            let message_id = query.id;

                response = await this.nav.retriveMessageType(usr_phone, messagePayload, query.type);
                

            if (response) {
                return { usr_phone, response, message_type: 'text', message_id };
            }
            
        }else if(statusPayload) {
            console.log("atualização de status: ", statusPayload.status)
            return null;
        }

        console.log('Webhook recebido não é um status nem mensagem.')
        return null;

        } catch (e) {
            
            console.error('Erro ao receber ou enviar mensagem. ', e.message);

            return null;
        }

    }

    
}

