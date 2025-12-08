import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { userSession } from "../bot.interface";
import { NavigationService } from "../navigation/navigation.service";
import { SessionService } from "../session/session.service";


@Injectable()
export class ResponseService{

    constructor(
        @Inject(forwardRef(() => NavigationService))
        private readonly nav: NavigationService,
        private readonly session: SessionService,
    ){}

      //Criar respostas para navegação do MENU
      createResponse(session: userSession): string {
        
        let response: string;

        //1. *Projetos* \n2. *Habilidades* \n3. *Contatos* \n4. *Quem sou* \n5. *Filosofia* \n6. *Tecnologias utilizadas* 
        switch(session.step){
            case 'MENU_PRINCIPAL':
                response = this.returnMenuPrincipal();
            break;
            case 'PROJETOS':
                response = "```PROJETOS:```\n"+
                "\nAqui você encontrará todos projetos que já criei"+
                "\n- *API de Tarefas (CRUD)*: API RESTful completa para um sistema 'To-Do', com autenticação JWT e tratamento de erros. (Tech: NestJS, Prisma, JWT) - $*" +
                "\n- *Bot de Atendimento (WhatsApp)*: Bot de menu interativo conectado à API Oficial da Meta, usando Redis para gerenciamento de sessão e timeout de ociosidade. (Tech: NestJS, Redis, Meta API)*"+
                "\n Você pode conferir todos estes projetos no meu github:"+
                "\n https://github.com/PedroHigorr"+
                "\n\n0. *Retornar para o _menu_ principal*"
                break;
            case 'HABILIDADES':
                response = "```HABILIDADES```\n"+
                "\nAqui você encontrará minhas principais habilidades."+
                "\n1. *Tecnologias & Ferramentas*"+
                "\n2. *Conceitos de Engenharia*"+
                "\n3. *Metodologia & Soft Skills*"+
                "\n0. *Retornar para o _menu_ principal*"
                break;
            case 'CONTATOS': 
                response = "```CONTATOS```\n"+
                "\nAqui você encontrará todos meus contatos."+
                "\n- _Instagram:_ " + "https://www.instagram.com/ph_kallyst/"+
                "\n- _Contato e Whatsapp:_ "+ "12996545316"+
                "\n- _Github:_ " + "https://github.com/PedroHigorr"+
                "\n- _Gmail:_ " + "pedro.higor92@gmail.com"+
                "\n\n0. *Retornar para o _menu_ principal*"
                break;
            case 'QUEM_SOU':
                response = "```QUEM SOU```"+
                "\n\nMe chamo Pedro Higor. Sou Desenvolvedor Back-end focado no ecossistema Node.js."+
                "Minha trajetória não foi linear: vim de trabalhos operacionais,"+
                " o que me ensinou a ter urgência por soluções que funcionem no mundo real, e não apenas no papel. "+ 
                "Minha base é a curiosidade técnica.\n"+
                "Aprendi inglês traduzindo jogos de PS1 palavra por palavra e estudo a estrutura do latim para entender a lógica das linguagens."+
                "\n\n0. *Retornar para o _menu_ principal*"
                break;
            case 'FILOSOFIA':
                response = "```FILOSOFIA```\n"+
                "\nSou movido pela necessidade de entender como as coisas funcionam por baixo do capô."+
                " Seja lendo uma documentação técnica ou depurando um código, meu foco é sempre encontrar os princípios fundamentais do sistema."+
                " Essa curiosidade me torna um desenvolvedor que não se contenta com o 'funciona', mas que busca a robustez e a lógica real por trás da solução"+
                "\n\n0. *Retornar para o _menu_ principal*"
                break;
            case 'HABILIDADES_TECNOLOGIAS':
            response =  "```TECNOLOGIAS & FERRAMENTAS```\n\n" +
                            "Minha stack é focada em soluções para o ecossistema Node.js:\n\n" +
                            "🔹 *Core & Linguagem:*\n" +
                            "- TypeScript \n" +
                            "- Node.js / JavaScript\n\n" +
                            "🔹 *Framework & Arquitetura:*\n" +
                            "- NestJS (Módulos, Injeção de Dependência, Guards)\n" +
                            "- RxJS (Observables)\n\n" +
                            "🔹 *Dados & Cache:*\n" +
                            "- Prisma ORM\n" +
                            "- Redis\n\n" +
                            "🔹 *APIs & Integrações:*\n" +
                            "- RESTful APIs (Swagger/OpenAPI)\n" +
                            "- Webhooks (Integração Meta/WhatsApp)\n" +
                            "- JWT \n\n" +
                            "🔹 *DevOps & Ferramentas:*\n" +
                            "- Docker \n" +
                            "- Git / GitHub\n\n" +
                            "0. *Voltar ao menu principal*\n"+
                            "1. *Voltar ao menu de Habilidades*";
                break;
            case 'HABILIDADES_ENGENHARIA':
                response =  "```CONCEITOS DE ENGENHARIA```\n\n" +
                            "Minha abordagem é focada em clareza do sistema:\n\n" +
                            "🔹 *Separação de Responsabilidades (SoC)*\n" +
                            "Mantenho Controllers 'magros' e deixo toda a regra de negócio para Services. O código deve ser óbvio sobre o que faz.\n\n" +
                            "🔹 *Máquinas de Estado*\n" +
                            "Neste bot, implementei uma máquina de estados finita usando Redis, garantindo que o usuário nunca fique 'preso' em um fluxo lógico quebrado.\n\n" +
                            "🔹 *Tipagem Estrita*\n" +
                            "Uso TypeScript não apenas como sugestão, mas como documentação. DTOs e Interfaces definem contratos claros para evitar erros em tempo de execução.\n\n" +
                            "🔹 *Princípios DRY e YAGNI*\n" +
                            "Evito repetição de código e engenharia excessiva. Construo o necessário para resolver o problema atual com excelência, preparando o terreno para o futuro.\n\n" +
                            "0. *Voltar ao menu principal*\n"+
                            "1. *Voltar ao menu de Habilidades*";
                break;
            case 'HABILIDADES_SOFT_SKILLS':
                response =  "```METODOLOGIA & SOFT SKILLS```\n\n" +
                            "Meu valor não está apenas no que sei, mas em como aprendo o que não sei:\n\n" +
                            "📚 *Autodidatismo Agressivo*\n" +
                            "Tenho o hábito de ir direto à fonte (Documentação Oficial) em vez de depender de tutoriais superficiais. Aprendo fazendo e quebrando.\n\n" +
                            "🔍 *Engenharia Reversa*\n" +
                            "Diante de um bug ou tecnologia nova, minha abordagem é desmontar o problema até encontrar a causa raiz, em vez de aplicar correções aleatórias.\n\n" +
                            "🛡️ *Resiliência Técnica*\n" +
                            "Não me paraliso com erros. Encaro logs de erro e falhas de configuração como pistas para a solução.\n\n" +
                            "0. *Voltar ao menu principal*\n"+
                            "1. *Voltar ao menu de Habilidades*";
                break;      
            }

        return response;
    }

    async responseText(usr_phone: string, messagePayload: number, session: userSession['step']): Promise<string>{

        const indice = messagePayload;

        let proximoPasso: userSession['step'] | null = null;
            
            switch(session){
                case "MENU_PRINCIPAL":
                    if(indice >= 1 && indice <= 5){
                        proximoPasso = this.nav.NavigationMenu(indice);
                    }
                    break;
                case 'HABILIDADES':
                    if(indice >= 0 && indice <=3 ){
                        proximoPasso = this.nav.navigationSkills(indice);
                    } 
                    break;
                case 'CONTATOS':
                case 'FILOSOFIA':
                case 'PROJETOS':
                case 'QUEM_SOU':
                    if(indice === 0){
                        proximoPasso = 'MENU_PRINCIPAL';
                    }
                    break;
                
                case 'HABILIDADES_ENGENHARIA':
                case 'HABILIDADES_SOFT_SKILLS':
                case 'HABILIDADES_TECNOLOGIAS':
                    if(indice === 0){
                        proximoPasso = 'MENU_PRINCIPAL';
                    }else if(indice === 1){
                        proximoPasso = 'HABILIDADES';
                    }
                    break;
        }

        if(proximoPasso){

            const novaSessao: userSession = {step: proximoPasso};
            await this.session.saveSession(usr_phone, novaSessao);
            const response = this.createResponse(novaSessao);

            return response;
        }else{
            return "Opção inválida. Por favor verifique se a opção selecionada é válida."
        }

        }

    returnMenuPrincipal(){

        return " *Olá! Seja bem vindo* 😁"+
                "\nEste é meu portfólio pessoal e interativo."+
                "\n~...................................................................~" +
                "\nAqui você encontrará dados sobre o desenvolvedor _Pedro Higor._"+
                "\n*O que deseja saber* "+
                "\n\n```Menu Principal```"+
                "\n1. *Projetos*"+
                "\n2. *Habilidades*"+
                "\n3. *Contatos*"+
                "\n4. *Quem sou*"+
                "\n5. *Filosofia*";
    }
}