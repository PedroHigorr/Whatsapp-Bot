import { Type } from "class-transformer";
import { 
    IsArray,
    IsEnum,
    IsObject,
    IsOptional, 
    IsString, 
    ValidateNested,
    } from "class-validator";


//  CLASSES de Type //

class TextObject {
    @IsString()
    body: string;
}

class ImageObject {
    @IsString()
    mime_type: string;

    @IsString()
    id: string;
}

class AudioObject {
    @IsString()
    mime_type: string;

    @IsString()
    id: string;
}

class ReactionObject {
    @IsString()
    message_id: string;

    @IsString()
    emoji: string;
}

// Definindo dados que serão recebidos de messages[] //

class WhatsAppMessage {
    @IsString()
    from: string;

    @IsString()
    id: string;

    @IsString()
    timestamp: string;

    @IsString()
    type: string;

    @IsOptional()
    @ValidateNested() // <<< Chamada recursiva que verifica se recebeu o tipo de "object" e retorna true/false
    @Type(() => TextObject)
    text?: TextObject;

    @IsOptional()
    @ValidateNested() // <<< Chamada recursiva que verifica se recebeu o tipo de "object" e retorna true/false
    @Type(() => ImageObject)
    image?: ImageObject;

    @IsOptional()
    @ValidateNested() // <<< Chamada recursiva que verifica se recebeu o tipo de "object" e retorna true/false
    @Type(() => AudioObject)
    audio?: AudioObject;

    @IsOptional()
    @ValidateNested() // <<< Chamada recursiva que verifica se recebeu o tipo de "object" e retorna true/false
    @Type(() => ReactionObject)
    reaction: ReactionObject;
}

// Definindo um payload para status (evitar erros de console, quando o status for alterado) // 

class StatusPayload {
    @IsString()
    id: string;

    @IsEnum(['enqueued', 'sent', 'delivered', 'read', 'failed', 'mismatch'])
    status: 'enqueued'| 'sent' | 'delivered' | 'read' | 'failed' | 'mismatch'

    @IsString()
    timestamp: string;

    @IsString()
    recipient_id: string;
}   

class Metadata {
    @IsString()
    display_phone_number: string;

    @IsString()
    phone_number_id: string;
}

// Validação do tipo de requisição foi recebida //


class WhatsappValue {
    @IsString()
    messaging_product: string;

    @IsObject()
    @ValidateNested()
    @Type(() => Metadata)
    metadata: Metadata;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => WhatsAppMessage)
    @IsOptional()
    messages?: WhatsAppMessage;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StatusPayload)
    @IsOptional()
    statuses?: StatusPayload[];
}

// Define se o tipo de mensagem recebida é atualização de status ou mensagem do usuário //

class WhatsAppChange {
    @IsObject()
    @ValidateNested()
    @Type(() => WhatsappValue)
    value: WhatsappValue;

    @IsString()
    field: string;
}

// Montando o corpo da requisição //

class Entry {
    @IsString()
    id: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => WhatsAppChange)
    changes: WhatsAppChange[]; 
}

export class WhatsappWebhookPayload {
    @IsString()
    object: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Entry)
    entry: Entry[];
}



// interface BaseMessagePayload {
//     from: string;
//     id: string;
//     timestamp: string;
//     type: string;
// }


// interface TextMessagePayload extends BaseMessagePayload {
//     type: 'text';
//     text: {
//         body: string;
//     }
// }

// interface ImageMessagePayload extends BaseMessagePayload {
//     type: 'image';
//     image: {
//         mime_type: string;
//         id: string;
//     }
// }

// interface AudioMessagePayload extends BaseMessagePayload {
//     type: "audio";
//     audio: {
//         mime_type: string;
//         id: string;
//     }
// }


// interface ReactionMessagePayload extends BaseMessagePayload {
//     type: 'reaction';
//     reaction:{
//         message_id: string;
//         emoji: string;
//     }
// }

// interface StatusPayload {
//     id: string;
//     status: 'enqueued' | 'sent' | 'delivered' | 'read' | 'failed' | 'mismatch';
//     timestamp: string;
//     recipient_id: string;
// }

// export type WhatsappMessage = 
//     | TextMessagePayload
//     | ImageMessagePayload
//     | AudioMessagePayload
//     | ReactionMessagePayload;

//     export type Whatsappvalue ={ 
//         messaging_product: string;
//         metadata: {
//             display_phone_number: string;
//             phone_number_id: string;
//         };
//         messages?: WhatsAppMessage[];
//         statuses?: StatusPayload[];
//     }

//     export type WhatsappWebhookpayload ={
//          object: string;
//          entry: {
//             id: string;
         
//          changes: {
//             value: WhatsappValue;
//             field: string;
//             }[];
//          }[];
//     }
