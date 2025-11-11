import { Inject, Injectable } from '@nestjs/common';
import { WhatsappWebhookPayload } from './bot.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { userSession } from './bot.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BotService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManeger: Cache,
        private readonly configService: ConfigService){}

   async parsePayload(body: WhatsappWebhookPayload): Promise<{ usr_phone: string; response: string; message_type: string } | null > {

        try {
        
        let response: string;
        let usr_phone: string;
        const message_type = 'text'; 

        const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]
        const statuses = body?.entry?.[0]?.changes?.[0]?.value?.statuses?.[0]

        const status = statuses?.status;




        if (message) {
                
            usr_phone = message.from; 

            
            let session = await this.retrieveSession(usr_phone);

            if(!session || null){

                response = "h";
                
                const novaSessao: userSession = { step: "MENU_PRINCIPAL"};
                await this.saveSession(usr_phone, novaSessao);

                return{ message_type, usr_phone, response} 

            } else if(session && session !== null){
                
                let step = session.step;
                
                switch(step){
                    case "MENU_PRINCIPAL":

                        break;
                    case "CONTATOS":

                        break;
                    case "HABILIDADES":

                        break;
                    case "FILOSOFIA":

                        break;
                    case "PROJETOS":

                        break;
                }

            }
            else{ return {message_type, usr_phone, response:"bye"}}

        // 
        }

    console.log('Webhook recebido não é um status nem mensagem.')

    return null;

        } catch (e) {
            
            console.error('Erro ao receber ou enviar mensagem. ', e.message)

            return null;
        }

    }

    //Retornar dados da sessão
    async retrieveSession(key: string): Promise< userSession | null > {
        
        const session = await this.cacheManeger.get<userSession>(key);

        return session || null;
    }


    // Salvar uma sessão, Criar.
    async saveSession(key: string, session: userSession){

        const ttl = this.configService.getOrThrow<number>('CACHE_TTL');

        await this.cacheManeger.set(key, session, ttl)

        console.log('Sessão criada.\n\n')
    }

    //Criar respostas para navegação do MENU
    criarResponse(indice: number, menu: true | null): string {
        
        let response: string;


        if(menu === null || menu === true){
            return " *Olá! Seja bem vindo* \nEste é meu portfólio pessoal e interativo.\n~..................................................................................~ \nAqui você encontrará dados sobre o desenvolvedor _Pedro Higor._ \n*O que deseja saber* \n\n```Menu Principal``` \n1. *Projetos* \n2. *Habilidades* \n3. *Contatos* \n4. *Quem sou* \n5. *Filosofia* \n6. *Tecnologias utilizadas* "
        }

        //1. *Projetos* \n2. *Habilidades* \n3. *Contatos* \n4. *Quem sou* \n5. *Filosofia* \n6. *Tecnologias utilizadas* 
        switch(indice){
            case 1:
                response = "_PROJETOS:_ \nAqui você encontrará todos projetos já realizados por mim \n- *API de Tarefas (CRUD)*: API RESTful completa para um sistema 'To-Do', com autenticação JWT e tratamento de erros. (Tech: NestJS, Prisma, JWT) - $* \n- *Bot de Atendimento (WhatsApp)*: Bot de menu interativo conectado à API Oficial da Meta, usando Redis para gerenciamento de sessão e timeout de ociosidade. (Tech: NestJS, Redis, Meta API)* \n1. *Retornar para o _menu_ principal* \n Você pode conferir todos estes projetos no meu github: \n https://github.com/PedroHigorr"
                break;
            case 2:
                response = "_HABILIDADES_ \nAqui você encontrará minhas principais habilidades. \n1. "
                break;
            case 3: 

                break;
            case 4:

                break;
            case 5:

                break;
            case 6:

                break;
        }

        return ;
    }
}







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

    //     return null;