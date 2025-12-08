import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WhatsappService {

    private readonly WHATSAPP_API_VERSION = 'v22.0';
    private readonly PHONE_NUMBER_ID: string;
    private readonly WHATSAPP_ACCESS_TOKEN: string;
    private readonly apiUrl: string;

    constructor( 
        private readonly httpService: HttpService,
        private readonly configService: ConfigService ){
            try {
                this.PHONE_NUMBER_ID = this.configService.getOrThrow<string>('PHONE_NUMBER_ID');
                this.WHATSAPP_ACCESS_TOKEN = this.configService.getOrThrow<string>('WHATSAPP_ACCESS_TOKEN');
    
                this.apiUrl = `https://graph.facebook.com/${this.WHATSAPP_API_VERSION}/${this.PHONE_NUMBER_ID}/messages`


            } catch (error) {
                console.error('Erro ao carregar variáveis de ambiente do Whatsapp: ', error.message);

                throw new Error ('\n\nFalha ao inicializar o serviço do whatsapp devido a um erro interno.');
            }
        }


        async sendMessage(to: string, message_type: string, message_body: string){

            const payload = {
                "messaging_product":"whatsapp", 
                "to": to,
                "type": message_type,
                "text": {"body": message_body,}
            }

            const headers = {
                'Content-Type':"application/json",
                'Authorization': `Bearer ${this.WHATSAPP_ACCESS_TOKEN}`
            }

            try {
                

                const requestObservable = this.httpService.post(this.apiUrl, payload,{headers})

                const response = await lastValueFrom(requestObservable);

                console.log('Mensagem enviada com sucesso!')

                return response;

            } catch (e) {

                if (e.response){

                    console.log('Erro da API meta: ', e.response.data)
                
                }else{
                    console.log('Erro na requisição (HttpService): ', e.message)
                }

                console.error('Erro ao enviar mensagem: ', e);

                throw new BadRequestException('\n Falha ao enviar menssagem para o usuário: ', to);
                
            }

        }

        async markMessageAsRead(messageId: string): Promise<void>{
            const payload = {
                messaging_product: 'whatsapp',
                status: 'read',
                message_id: messageId,
            }

            const headers = {
                'Authorization': `Bearer ${this.WHATSAPP_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            };

            try{

                await lastValueFrom(this.httpService.post(this.apiUrl, payload, {headers}))
                console.log(`\n\nMensagem ${messageId} marcada como lida.`);

            }catch(err){
                console.error('\n\nErro ao marcar mensagem como lida: ', err.message, "\n\n");
            }
        }
}


