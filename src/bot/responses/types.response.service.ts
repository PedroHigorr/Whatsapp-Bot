import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { userSession } from "../bot.interface";
import { ResponseService } from "./response.service";
import { SessionService } from "../session/session.service";
import { WhatsappService } from "src/whatsapp/whatsapp.service";

@Injectable()
export class TypesOfMessage{
    constructor(
        @Inject(forwardRef(() => ResponseService))
        private readonly response: ResponseService,
        private readonly session: SessionService,
        private readonly whatsapp: WhatsappService){}

    async caseText(user_phone: string, messagePayload: string){

        let session = await this.session.retrieveSession(user_phone);

        //Em caso de usuário novo ou Reset
        if(!session || messagePayload === '0'){
            
            const novaSessao: userSession = {step: "MENU_PRINCIPAL"};
            await this.session.saveSession(user_phone, novaSessao);

            const greeting = this.greeting(messagePayload);

            if(greeting){
                console.log("\n\n\n Passou em Greeting")
                await this.whatsapp.sendMessage(user_phone, 'text', greeting);
            }else{
                console.log("Não passou em greeting")
            }

            return this.response.createResponse(novaSessao);
        }

        //Em caso de usuário com sessão
        const opcoesMenu = parseInt(messagePayload);

        if(!isNaN(opcoesMenu)){
            return await this.response.responseText(user_phone, opcoesMenu, session.step);
        }

        return "Não entendi. Por favor, escolha uma opção válida.";
    }

    private greeting(text: string): string | null{
        const lowerText = text.toLowerCase();
        console.log("\n\n\nO texto recebido foi: "+ lowerText)
        if(lowerText.includes("bom dia")) return "Bom Dia! 😁\n";
        if(lowerText.includes("boa tarde")) return "Boa Tarde! 😁\n"
        if(lowerText.includes("boa noite")) return "Boa Noite! 😁\n"
        return null;
    }
}