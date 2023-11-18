import { Decoder, Encoder, createDecoder, createEncoder } from "@waku/sdk";

export interface EncoderDecoder {
    encoder: Encoder;
    decoder: Decoder;
}

export const getEncoderAndDecoder = (topicName: string): EncoderDecoder => {
    const decoder = createDecoder(topicName);
    const encoder = createEncoder({ contentTopic: topicName });

    return {
        decoder,
        encoder,
    };
};
