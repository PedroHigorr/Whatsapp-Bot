import { Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';
import { BotService } from './bot.service';
import { WhatsappWebhookPayload } from './bot.dto';

@Controller('bot')
export class BotController {

    private readonly VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    
    constructor(
        private readonly whatsapp: WhatsappService,
        private readonly botService: BotService){}

        @Post('/webhook')
        @HttpCode(HttpStatus.OK)
        async handleWebhook(@Body() body: WhatsappWebhookPayload){

            
            console.log(' ============================== \n')
            console.log('Webhook recebido \n')
            console.log(' ============================== \n')

            console.log('Body recebido: ', JSON.stringify(body, null, 2))

            try {
                
                const parsed = await this.botService.parsePayload(body);

                if(parsed != null){
                    
                    const phone = parsed.usr_phone;
                    const response = parsed.response;
                    const message_type = parsed.message_type;
                    const message_Id = parsed.message_id;

                    console.log("\n\n Message_ID recebido: ",message_Id);
                    await this.whatsapp.markMessageAsRead(message_Id);

                    await this.whatsapp.sendMessage(phone, message_type, response);
                }


            } catch (e) {
             
                console.log("erro ao enviar mensagem dados não recebidos.");

                throw new Error("Menssagem não enviada.")
                }
            }



        @Get('/webhook')
        @HttpCode(HttpStatus.OK)
        verifyToken(@Query() query: any){

            const mode = query['hub.mode'];
            const challenge = query['hub.challenge']
            const token = query['hub.verify_token'];

            if(mode === 'subscribe' && token === this.VERIFY_TOKEN){

                console.log('Webhook verificado')

                return challenge;
            }

            throw new ForbiddenException('Token não validado');

        }
    }

