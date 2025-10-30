interface BaseMessagePayload {
    from: string;
    id: string;
    timestamp: string;
    type: string;
}


interface TextMessagePayload extends BaseMessagePayload {
    type: 'text';
    text: {
        body: string;
    }
}

interface ImageMessagePayload extends BaseMessagePayload {
    type: 'image';
    image: {
        mime_type: string;
        id: string;
    }
}

interface AudioMessagePayload extends BaseMessagePayload {
    type: "audio";
    audio: {
        mime_type: string;
        id: string;
    }
}


interface ReactionMessagePayload extends BaseMessagePayload {
    type: 'reaction';
    reaction:{
        message_id: string;
        emoji: string;
    }
}

interface StatusPayload {
    id: string;
    status: 'enqueued' | 'sent' | 'delivered' | 'read' | 'failed' | 'mismatch';
    timestamp: string;
    recipient_id: string;
}

export type WhatsAppMessage = 
    | TextMessagePayload
    | ImageMessagePayload
    | AudioMessagePayload
    | ReactionMessagePayload;

    export type WhatsappValue ={ 
        messaging_product: string;
        metadata: {
            display_phone_number: string;
            phone_number_id: string;
        };
        messages?: WhatsAppMessage[];
        statuses?: StatusPayload[];
    }

    export type WhatsappWebhookPayload ={
         object: string;
         entry: {
            id: string;
         
         chenges: {
            value: WhatsappValue;
            field: string;
            }[];
         }[];
    }
// export default interface ParsedWhatsapp{
//     senderId: string | null;
//     messageText: string | null;
//     messageType: string | null;
//     isTextMessage: boolean;
// }
