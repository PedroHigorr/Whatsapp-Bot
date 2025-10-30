import { Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';
import { BotService } from './bot.service';
import { stringify } from 'querystring';

@Controller('bot')
export class BotController {

    private readonly VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    
    constructor(
        private readonly whatsapp: WhatsappService,
        private readonly parsedData: BotService){}

        @Post('/webhook')
        @HttpCode(HttpStatus.OK)
        async handleWebhook(@Body() body: any){

            
            console.log(' ============================== \n')
            console.log('Webhook recebido \n')
            console.log(' ============================== \n')

            console.log('Body recebido: ', JSON.stringify(body, null, 2))

            try {
                
                const usr_data = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

                const message_type = usr_data.type
                const usr_phone = usr_data.from;
                const usr_message = usr_data.text.body;
                let message: string;
    
                if(usr_data && usr_phone && message_type === 'text'){
    
                        switch(usr_message){
                            case("!pong"):
                                message = 'pong';
                                break;
                            default:
                                message = "Não consegui compreender, por favor explique como posso te ajudar."
                        }
    
                        const send = await this.whatsapp.sendMessage(usr_phone, message_type, message);
    
                        return HttpStatus.OK;
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


// 





    // @Post('/webhook')
//     @HttpCode(HttpStatus.OK)
//     async handleWebhook(@Body() body: any){
// // Log para debug
//         console.log('------------------------------------')
//         console.log("Tipo do body: ", typeof body)
//         console.log('------------------------------------')

//         // console.log('Conteúdo de body: ', JSON.stringify(body));
       
//          const payloadDataParsed = await this.parsedData.parseData(body);

//          console.log("Body parseado: ", body)
//          console.log("\n Body: ", JSON.stringify(body))

//         if(payloadDataParsed && payloadDataParsed.isTextMessage && payloadDataParsed.senderId && payloadDataParsed.messageText){

//             const senderId = payloadDataParsed.senderId;
//             const command = payloadDataParsed.messageText.toLowerCase().trim();
//             let responseMessage: string;

//             console.log(`Mensagem de texto parseada de ${senderId}: "${command}"`);

//             switch(command){
//                 case '!ping':
//                     responseMessage = 'Pong!';
//                     break;
//                 default:
//                     responseMessage = 'Olá seja bem vindo ao menu principal!'
//                     break;
//             }

//         try {

//             await this.whatsapp.sendMessage(senderId, responseMessage);

//         } catch (error) {
//             console.error(`Erro ai enviar resposta para ${senderId}. \n`, error)
//             }
//         }

//         else if( payloadDataParsed ){
//             console.log(`Recebido payload parsead, mas não é um texto: Tipo ${payloadDataParsed.messageType}`)
//         } else{
//             console.log('Payload não parseado. ')
//         }

//     }

//     @Get('/webhook')
//     verifyToken(@Query() query: any){
        
//         const mode = query['hub.mode'];
//         const challenge = query['hub.challenge'];
//         const token = query['hub.verify_token'];

//         console.log('--- verificação iniciada ---');
//         console.log('Token recbido da Meta: ', token);
//         console.log('Token esperado do .env: ', this.VERIFY_TOKEN)
    
//         if(mode && token && mode === 'subscribe' && token === this.VERIFY_TOKEN ){
//             console.log('Webhook verificado com sucesso!')

//             return challenge
//         }

//         console.log('Falha ao verificar o Webhook.')
//         throw new ForbiddenException('token de verificação inválido.');

//     }