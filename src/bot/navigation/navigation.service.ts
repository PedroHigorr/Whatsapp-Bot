import { Injectable } from "@nestjs/common";
import { userSession } from "../bot.interface";
import { TypesOfMessage } from "../responses/types.response.service";


@Injectable()
export class NavigationService{
    constructor(
        private readonly type: TypesOfMessage,
    ){}

    NavigationMenu(indice: number): userSession['step'] {

        let navegacao: userSession['step'];

        switch(indice){
            case 0:
                navegacao = "MENU_PRINCIPAL";
            break;
            case 1:
                navegacao = "PROJETOS";
            break;
            case 2: 
                navegacao = "HABILIDADES";
            break;
            case 3: 
                navegacao = "CONTATOS";
            break;
            case 4:
                navegacao = "QUEM_SOU";
            break;
            case 5:
                navegacao = "FILOSOFIA";
            break;
            default:
                navegacao = "MENU_PRINCIPAL"
            break;
            }
        
            return navegacao;

    }

    navigationSkills(indice: number):userSession['step'] {
        let nav: userSession['step'];

        switch(indice){
            case 1:
                nav = 'HABILIDADES_TECNOLOGIAS'
                break;
            case 2: 
                nav = 'HABILIDADES_ENGENHARIA'
                break;
            case 3: 
                nav = "HABILIDADES_SOFT_SKILLS"
                break;
            case 0: 
                nav = 'MENU_PRINCIPAL';
                break;
            default:
                nav = 'HABILIDADES';
                break;
        }

        return nav;
    }

  async retriveMessageType(user_phone: string, messagePayload: string, messageType: string){

        let response: string;

        switch(messageType){

            case 'text':
                response = await this.type.caseText(user_phone, messagePayload);
                break;
            case 'reaction':
                response = "😁"
                break;
            case 'image':
                response = "Infelizmente não posso visualizar imagens. Escolha uma opção suportada"
                break;
            case 'audio':
                response = "Não posso reproduzir áudios, por favor escolha uma opção suportada."
                break;
            case 'sticker':
                response = "😁"
                break;
            default:
                console.log('Tipo de mensagem não tratado: ', messageType);
                response = "Infelizmente não sou capaz de processar tal mensagem.";
                break;                
        }

        return response;
    }
}