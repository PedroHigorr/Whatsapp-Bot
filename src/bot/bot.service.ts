import { Injectable } from '@nestjs/common';
import { WhatsappWebhookPayload } from './bot.dto';

@Injectable()
export class BotService {

    parsePayload(body: WhatsappWebhookPayload): { usr_phone: string; response: string; message_type: string } | null {

        try {

        
        let response: string;
        let usr_phone: string;
        const message_type = 'text'; // O tipo da NOSSA RESPOSTA é sempre texto   

        const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]
        const statuses = body?.entry?.[0]?.changes?.[0]?.value?.statuses?.[0]

        const status = statuses?.status;


        if (message) {
                        usr_phone = message.from; // Pegamos o remetente aqui, UMA SÓ VEZ

                        // Agora, fazemos o switch no TIPO da mensagem
                        switch (message.type) {
                            case 'text':
                                const command = message.text.body.toLowerCase().trim();
                                switch (command) {
                                    case "!pong":
                                        response = 'Pong';
                                        break;
                                    case "olá":
                                        response = 'Olá no que posso lhe ajudar?';
                                        break;
                                    default:
                                        response = 'Infelizmente não consegui entender sua mensagem.';
                                        break;
                                }
                                break; // Fim do case 'text'

                            case 'reaction':
                                console.log('Emoji recebido: ', message.reaction.emoji);
                                response = 'Infelizmente não posso responder emojis 🙂';
                                break;

                            case 'image':
                                console.log("Imagem recebida: ", message.image.id);
                                response = 'Infelizmente não posso visualizar imagens';
                                break;

                            case 'audio':
                                console.log('Audio recebido: ', message.audio.id);
                                response = "Não evolui o suficiente para ouvir áudios, o bot está claramente desconfortável.";
                                break;

                            default:
                                console.log(`Tipo de mensagem não tratado: ${message.type}`);
                                response = 'Não sei processar este tipo de mensagem.';
                                break;
                        }
                        
                        // O return de 'mensagem' fica aqui, UMA SÓ VEZ
                        return { message_type, usr_phone, response };
                        
                    } else if(statuses){

                        switch(status){
                            
                            case('enqueued'):
                                console.log('A mensagem enviada foi recebido pela META, aguardando para ser enviado ao usuário.')
                                break;
                            case('sent'): 
                                console.log('Mensagem enviada ao usuário.')
                                break;
                            case('delivered'):
                                console.log('A mesagem chegou ao usuário.')
                                break;
                            case('read'):
                                console.log('Mensagem lida pelo usuário.')
                                break;
                            case('failed'):
                                console.log('Falha ao enviar mensagem para usuário.')
                                break;
                            case('mismatch'):
                                console.log('O formato da mensagem enviada é inválido.')
                                break
                        }

                        return null;
                    }

            console.log('Webhook recebido não é um status nem mensagem.')

            return null;

        } catch (e) {
            
            console.error('Erro ao receber ou enviar mensagem. ', e.message)

            return null;
        }

    }

}
