import { Inject, Injectable } from '@nestjs/common';
import { WhatsAppMessage, WhatsappWebhookPayload } from './bot.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { userSession } from './bot.interface';
import { ConfigService } from '@nestjs/config';
import { SessionService } from './session/session.service';
import { ResponseService } from './responses/response.service';

@Injectable()
export class BotService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManeger: Cache,
        private readonly configService: ConfigService,
        private readonly session: SessionService,
        private readonly response: ResponseService,){}

   async parsePayload(body: WhatsappWebhookPayload): Promise<{ usr_phone: string; response: string; message_type: string } | null > {

        try {
        

        const message_type = 'text'; 
        const messagePayload = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body;
        const query = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
        const statusPayload = body?.entry?.[0]?.changes?.[0]?.value?.statuses?.[0];


        if (query && query.type === 'text') {

            let response: string;
            let usr_phone = query.from; 
            let session = await this.session.retrieveSession(usr_phone);


            if(!session || messagePayload === '0'){

                const novaSessao: userSession = { step: "MENU_PRINCIPAL"};
                await this.session.saveSession(usr_phone, novaSessao);
                response = this.response.createResponse(novaSessao);

            }else{

                const selecao = parseInt(messagePayload);
                if(!isNaN(selecao)){

                    response = await this.response.responseText(usr_phone, selecao, session.step);
                } else{
                    response = 'não entendi, poderia escolher uma opção?'
                }
            }

            if (response) {
                return { usr_phone, response, message_type: 'text' };
            }
            
        }else if(statusPayload) {
            console.log("atualização de status recebida.")
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




// if(!session || message === '0'){
                
//     const novaSessao: userSession = { step: "MENU_PRINCIPAL"};
//     await this.saveSession(usr_phone, novaSessao);

//     response = await this.criarResponse(novaSessao);

// } else if(!isNaN(indice)){
    
//     if(indice >= 0 && indice <=5){

//         let navegacao = this.navegarMenu(indice);
        
//         const novaSessao: userSession = {step: navegacao};

//         await this.saveSession(usr_phone, novaSessao);

//         response = await this.criarResponse(novaSessao);

//     }else{
    
//         response = "Desculpe, mas a opção digitada é inválida. Por favor escolha uma opção válida";
//     }


//-----------------------------------------------------------------------------------------


//switch (message.type) {
    //         case 'text':
    //             const command = message.text.body.toLowerCase().trim();
    //             switch (command) {
    //                 case "!pong":
    //                     response = 'Pong';
    //                     break;
    //                 case "olá":
    //                     response = 'Olá no que posso lhe ajudar?';
    //                     break;
    //                 default:
    //                     response = 'Infelizmente não consegui entender sua mensagem.';
    //                     break;
    //             }
    //             break; 

    //         case 'reaction':
    //             console.log('Emoji recebido: ', message.reaction.emoji);
    //             response = 'Infelizmente não posso responder emojis 🙂';
    //             break;

    //         case 'image':
    //             console.log("Imagem recebida: ", message.image.id);
    //             response = 'Infelizmente não posso visualizar imagens';
    //             break;

    //         case 'audio':
    //             console.log('Audio recebido: ', message.audio.id);
    //             response = "Não evolui o suficiente para ouvir áudios, o bot está claramente desconfortável.";
    //             break;

    //         default:
    //             console.log(`Tipo de mensagem não tratado: ${message.type}`);
    //             response = 'Não sei processar este tipo de mensagem.';
    //             break;
    //     }
        
        
    //     return { message_type, usr_phone, response };
        
    // } else if(statuses){

    //     switch(status){
            
    //         case('enqueued'):
    //             console.log('A mensagem enviada foi recebido pela META, aguardando para ser enviado ao usuário.')
    //             break;
    //         case('sent'): 
    //             console.log('Mensagem enviada ao usuário.')
    //             break;
    //         case('delivered'):
    //             console.log('A mesagem chegou ao usuário.')
    //             break;
    //         case('read'):
    //             console.log('Mensagem lida pelo usuário.')
    //             break;
    //         case('failed'):
    //             console.log('Falha ao enviar mensagem para usuário.')
    //             break;
    //         case('mismatch'):
    //             console.log('O formato da mensagem enviada é inválido.')
    //             break
    //     }

    //     return null}