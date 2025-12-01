import { Injectable } from "@nestjs/common";
import { userSession } from "../bot.interface";
import { NavigationService } from "../navigation/navigation.service";
import { SessionService } from "../session/session.service";

@Injectable()
export class ResponseService{
    constructor(
        private readonly nav: NavigationService,
        private readonly session: SessionService){}

      //Criar respostas para navegação do MENU
      createResponse(session: userSession): string {
        
        let response: string;

        //1. *Projetos* \n2. *Habilidades* \n3. *Contatos* \n4. *Quem sou* \n5. *Filosofia* \n6. *Tecnologias utilizadas* 
        switch(session.step){
            case 'MENU_PRINCIPAL':
                response = this.returnMenuPrincipal();
            break;
            case 'PROJETOS':
                response = "```*PROJETOS:*```"+
                "\nAqui você encontrará todos projetos que já criei"+
                "\n- *API de Tarefas (CRUD)*: API RESTful completa para um sistema 'To-Do', com autenticação JWT e tratamento de erros. (Tech: NestJS, Prisma, JWT) - $*" +
                "\n- *Bot de Atendimento (WhatsApp)*: Bot de menu interativo conectado à API Oficial da Meta, usando Redis para gerenciamento de sessão e timeout de ociosidade. (Tech: NestJS, Redis, Meta API)*"+
                "\n0. *Retornar para o _menu_ principal*"+
                "\n Você pode conferir todos estes projetos no meu github:"+
                "\n https://github.com/PedroHigorr"
                break;
            case 'HABILIDADES':
                response = "```*HABILIDADES*```"+
                "\nAqui você encontrará minhas principais habilidades."+
                "\n1. *Tecnologias & Ferramentas*"+
                "\n2. *Conceitos de Engenharia*"+
                "\n3. *Metodologia & Soft Skills*"+
                "\n0. *Retornar para o _menu_ principal*"
                break;
            case 'CONTATOS': 
                response = "```*CONTATOS*```"+
                "\nAqui você encontrará todos meus contatos."+
                "\n- _Instagram:_ " + "https://www.instagram.com/ph_kallyst/"+
                "\n- _Contato e Whatsapp:_ "+ "12996545316"+
                "\n- _Github:_ " + "https://github.com/PedroHigorr"+
                "\n- _Gmail:_" + "pedro.higor92@gmail.com"+
                "\n0. *Retornar para o _menu_ principal*"
                break;
            case 'QUEM_SOU':
                response = "```*QUEM SOU*```"+
                "\n\nMe chamo Pedro Higor,"+
                "\nSou um Desenvolvedor Back-end recém-formado em Análise de Sistemas, com foco em construir soluções robustas e eficientes com o ecossistema Node.js."+
                "\nUm pensador analítico que está canalizando uma obsessão por sistemas complexos para uma carreira como Desenvolvedor Back-end."+
                "\nMinha jornada até a programação não foi linear. Passei um tempo em trabalhos operacionais (como almoxarifado), o que me deu uma visão clara do mundo real e"+
                " um profundo senso de urgência para construir soluções que realmente funcionem, e não apenas que sejam bonitas no papel." +
                "\nSou o tipo de pessoa que aprende inglês jogando PS1 com um dicionário do lado e que estuda latim para entender a engenharia da língua. Sou movido pela curiosidade de entender 'como as coisas funcionam' no nível mais fundamental."+
                "\n 0. *Retornar para o _menu_ principal*"
                break;
            case 'FILOSOFIA':
                response = "```*FILOSOFIA*```"+
                "Eu acredito que você não entende algo de verdade até que possa desmontá-lo em seus 'primeiros princípios'."+
                "\nMeu método é a *engenharia reversa*:"+
                "\n- *Investigar:* Eu não aceito uma solução 'caixa-preta'. Eu leio a documentação oficial, analiso os 'porquês' por trás de um framework"+
                "\n- *Testar:* Eu quebro o sistema de forma controlada para entender seus limites e pontos de falha. "+
                "\n- *Construir:* Eu só construo quando entendo os 'tijolos'."+
                "\nNo trabalho, isso significa que sou o desenvolvedor que resolve o bug complexo,"+
                "porque minha motivação é entender o core do problema, não apenas aplicar um remendo. Meu aprendizado é minha principal ferramenta."+
                "\n0. *Retornar para o _menu_ principal*"
                break;
            case 'HABILIDADES_TECNOLOGIAS':
            response =  "```*TECNOLOGIAS & FERRAMENTAS*```\n\n" +
                            "Minha stack é focada em soluções para o ecossistema Node.js:\n\n" +
                            "🔹 *Core & Linguagem:*\n" +
                            "- TypeScript (Tipagem Estrita)\n" +
                            "- Node.js / JavaScript (ES6+)\n\n" +
                            "🔹 *Framework & Arquitetura:*\n" +
                            "- **NestJS** (Módulos, Injeção de Dependência, Guards)\n" +
                            "- RxJS (Observables)\n\n" +
                            "🔹 *Dados & Cache:*\n" +
                            "- **Prisma ORM** (Modelagem de dados)\n" +
                            "- **Redis** (Gerenciamento de Sessão e TTL)\n\n" +
                            "🔹 *APIs & Integrações:*\n" +
                            "- RESTful APIs (Swagger/OpenAPI)\n" +
                            "- Webhooks (Integração Meta/WhatsApp)\n" +
                            "- JWT (Autenticação Segura)\n\n" +
                            "🔹 *DevOps & Ferramentas:*\n" +
                            "- Docker (Containerização de serviços)\n" +
                            "- Git / GitHub\n\n" +
                            "0. *Voltar ao menu principal*\n"+
                            "1. *Voltar ao menu de Habilidades";
                break;
            case 'HABILIDADES_ENGENHARIA':
                response =  "```*CONCEITOS DE ENGENHARIA*```\n\n" +
                            "Minha abordagem é focada em clareza do sistema:\n\n" +
                            "🔹 *Separação de Responsabilidades (SoC)*\n" +
                            "Mantenho Controllers 'magros' e movo toda a regra de negócio para Services. O código deve ser óbvio sobre o que faz e onde faz.\n\n" +
                            "🔹 *Máquinas de Estado (State Machines)*\n" +
                            "Neste bot, implementei uma máquina de estados finita usando Redis, garantindo que o usuário nunca fique 'preso' em um fluxo lógico quebrado.\n\n" +
                            "🔹 *Tipagem Estrita (Type Safety)*\n" +
                            "Uso TypeScript não apenas como sugestão, mas como documentação. DTOs e Interfaces definem contratos claros para evitar erros em tempo de execução.\n\n" +
                            "🔹 *Princípios DRY e YAGNI*\n" +
                            "Evito repetição de código e engenharia excessiva. Construo o necessário para resolver o problema atual com excelência, preparando o terreno para o futuro.\n\n" +
                            "0. *Voltar ao menu principal*\n"+
                            "1. *Voltar ao menu de Habilidades";
                break;
            case 'HABILIDADES_SOFT_SKILLS':
                response =  "*METODOLOGIA & SOFT SKILLS*\n\n" +
                            "Meu valor não está apenas no que sei, mas em como aprendo o que não sei:\n\n" +
                            "📚 *Autodidatismo Agressivo*\n" +
                            "Tenho o hábito de ir direto à fonte (Documentação Oficial) em vez de depender de tutoriais superficiais. Aprendo fazendo e quebrando.\n\n" +
                            "🔍 *Engenharia Reversa*\n" +
                            "Diante de um bug ou tecnologia nova, minha abordagem é desmontar o problema até encontrar a causa raiz, em vez de aplicar correções aleatórias.\n\n" +
                            "🛡️ *Resiliência Técnica*\n" +
                            "Não me paraliso com erros. Encaro logs de erro e falhas de configuração (como neste bot) como pistas para a solução, não como obstáculos finais.\n\n" +
                            "0. *Voltar ao menu principal*\n"+
                            "1. *Voltar ao menu de Habilidades";
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

        return " *Olá! Seja bem vindo* "+
                "\nEste é meu portfólio pessoal e interativo."+
                "\n~..................................................................................~" +
                "\nAqui você encontrará dados sobre o desenvolvedor _Pedro Higor._"+
                "\n*O que deseja saber* "+
                "\n\n```*Menu Principal*```"+
                "\n1. *Projetos*"+
                "\n2. *Habilidades*"+
                "\n3. *Contatos*"+
                "\n4. *Quem sou*"+
                "\n5. *Filosofia*";
    }
}