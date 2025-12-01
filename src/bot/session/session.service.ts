import { Inject, Injectable } from "@nestjs/common";
import { userSession } from "../bot.interface";
import { CACHE_MANAGER, Cache} from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SessionService{
    constructor(@Inject(CACHE_MANAGER) private cacheManeger: Cache,
                private readonly configService: ConfigService){}

    async retrieveSession(key: string): Promise< userSession | null > {
    
        const session = await this.cacheManeger.get<userSession>(key);

        return session || null;
    }
    
    // Salvar uma sessão, Criar.
    async  saveSession(key: string, session: userSession){

        const ttl = this.configService.getOrThrow<number>('CACHE_TTL');

        await this.cacheManeger.set(key, session, ttl);

        console.log('Sessão criada.\n\n');
    }
}